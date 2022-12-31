<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Member;
use Carbon\Carbon;
use App\Models\Property;
use App\Models\Transaction;
use App\Models\Payment;
use App\Models\Washboy;
use App\Models\Temp_tran;

class MemberController extends Controller
{
    public function get_members()
    {
        $get = Member::with('property', 'property.vehicle', 'user')->where('id', '!=', 0)->where('branch_id', auth()->user()->branch_id)->orderBy('name', 'ASC')->get();

        return response()->json($get);
    }

    public function add_member(Request $request){
        $splitbirth = explode('/', $request->form['birthdate']);
        $birthdate = $splitbirth[2] . '-' . $splitbirth[0] . '-' . $splitbirth[1];

        $splitdate_added = explode('/', $request->form['date_added']);
        $date_added = $splitdate_added[2] . '-' . $splitdate_added[0] . '-' . $splitdate_added[1];

        $split_expiration = explode('/', $request->form['expiration_date']);
        $expiration_date = $split_expiration[2] . '-' . $split_expiration[0] . '-' . $split_expiration[1];

        $add = new Member();
        $add->card_no = $request->form['card_no'];
        $add->name = $request->form['name'];
        $add->birthdate = $birthdate;
        $add->beneficiary_name = $request->form['beneficiary_name'];
        $add->beneficiary_contact = $request->form['beneficiary_contact'];
        $add->contact_no = $request->form['contact_no'];
        $add->expiration_date = $expiration_date;
        $add->branch_id = $request->branch_id;
        $add->user_id = auth()->user()->id;
        $add->status = 'Active';
        $add->save();

        $push = [];
        foreach($request->form['vehicleData'] as $data){
            if($data['vehicle_id']){
                $property = new Property;
                $property->member_id = $add->id;
                $property->vehicle_id = $data['vehicle_id']['value'];
                $property->plate_no = $data['plate_no'];
                $property->save();
            }
        }

        $trans = new Transaction;
        $trans->member_id = $add->id;
        $trans->user_id = auth()->user()->id;
        $trans->branch_id = $request->branch_id;
        $trans->labor_id = null;
        $trans->temp_services_id = 0;
        $trans->vehicle_id = 0;
        $trans->property_id = 0;
        $trans->work_order = null;
        $trans->name = $request->form['name'];
        $trans->contact_no = $request->form['contact_no'];
        $trans->plate_no = '';
        $trans->odo = '';
        $trans->time_consumed = null;
        $trans->start_wash = Carbon::now();
        $trans->transaction_type = 'registration';
        $trans->transaction_date = $date_added;
        $trans->paid_date = null;
        $trans->status = 'completed';
        $trans->points = '';
        $trans->save();

        $payment = new Payment;
        $payment->transaction_id = $trans->id;
        $payment->discounted = 0;
        $payment->sub_total = 300;
        $payment->total = 300;
        $payment->changed = $request->form['amount'] - 300;
        $payment->amount = $request->form['amount'];
        $payment->payment_status = 'paid';
        $payment->save();
        
        return response()->json($add->load('property', 'property.vehicle', 'user'));
    }

    public function update_member(Request $request)
    {
        $update = Member::where('id', $request->form['id'])->update([
            'card_no' => $request->form['card_no'],
            'name' => $request->form['name'],
            'birthdate' => $request->form['birthdate'],
            'beneficiary_name' => $request->form['beneficiary_name'],
            'beneficiary_contact' => $request->form['beneficiary_contact'],
            'contact_no' => $request->form['contact_no'],
        ]);

        $property_ids = array_column($request->form['property'], 'id');
        $result = array_filter($property_ids);
        $update_var = Property::whereNotIn('id', $result)->where('member_id', $request->form['id'])->delete();

        foreach($request->form['property'] as $data){
            
            if($data['id'] != ''){
                $update = Property::find($data['id'])->update([
                    'plate_no' => $data['plate_no']
                ]);
            }else{
                $property = new Property;
                $property->member_id = $request->form['id'];
                $property->vehicle_id = $data['vehicle_id'];
                $property->plate_no = $data['plate_no'];
                $property->save();
            }
        }

        return 'success';
    }

    public function delete_members($id)
    {
        $delete = Member::where('id', $id)->delete();

        return response()->json($id);
    }

    public function find_property(Request $request){

        $get = Transaction::with('property', 'user', 'vehicle', 'property.vehicle', 'member', 'payment', 'temp_trans', 'temp_trans.services', 'temp_trans.variation', 'temp_trans.variation.services', 'labors', 'labors.washboy')->where('property_id', $request->id)->get();

        return $get;
    }

    public function get_members_count(Request $request){
        if($request->data == "Today"){
            $from = Carbon::now()->startOfDay();
            $to = Carbon::now()->endOfDay();
            $get = Member::where('branch_id', $request->branch_id)->whereBetween('created_at', [$from, $to])->where('id', '!=', 0)->get();
        }elseif($request->data == "Week"){
            $from = Carbon::now()->startOfWeek()->startOfDay();
            $to = Carbon::now()->endOfWeek()->endOfDay();
            $get = Member::where('branch_id', $request->branch_id)->whereBetween('created_at', [$from, $to])->where('id', '!=', 0)->get();
        }elseif($request->data == "Month"){
            $from = Carbon::now()->startOfMonth()->startOfDay();
            $to = Carbon::now()->endOfMonth()->endOfDay();
            $get = Member::where('branch_id', $request->branch_id)->whereBetween('created_at', [$from, $to])->where('id', '!=', 0)->get();
        }else{
            $get = Member::where('branch_id', $request->branch_id)->where('id', '!=', 0)->get();
        }

        return $get;
    }

    public function search_member($branch, $name)
    {
        $get = Member::where('name', 'like', '%' . $name . '%')->where('branch_id', $branch)->limit(10)->get();
        $personnel = Washboy::where('name', 'like', '%' . $name . '%')->where('branch_id', $branch)->limit(10)->get();

        return response()->json(["members" => $get, "personnel" => $personnel]);
    }

    public function member_profile($branch, $id)
    {
        $get = Member::with('property', 'property.vehicle')->where('id', $id)->where('branch_id', $branch)->first();

        return $get;
    }

    public function member_property($branch, $id, $vehicle_id)
    {
        if($vehicle_id != 'all'){
            $get = Transaction::with('property', 'user', 'vehicle', 'property.vehicle', 'member', 'payment', 'temp_trans', 'temp_trans.services', 'temp_trans.variation', 'temp_trans.variation.services', 'labors', 'labors.washboy')->where('property_id', $vehicle_id)->orderBy('id', 'DESC')->get();
        }else{
            $get = Transaction::with('property', 'user', 'vehicle', 'property.vehicle', 'member', 'payment', 'temp_trans', 'temp_trans.services', 'temp_trans.variation', 'temp_trans.variation.services', 'labors', 'labors.washboy')->where('member_id', $id)->orderBy('id', 'DESC')->get();
        }
       
        return $get;
    }

    public function renew_member(Request $request)
    {
        $renew = Member::find($request->id)->update([
            'expiration_date' => $request->expiration_date
        ]);

        $add = new Transaction;
        $add->member_id = $request->id;
        $add->user_id = auth()->user()->id;
        $add->branch_id = auth()->user()->branch_id;
        $add->temp_services_id = 0;
        $add->transaction_type = 'renewal';
        $add->status = 'completed';
        $add->transaction_date = Carbon::now();
        $add->save();

        $payment = new Payment;
        $payment->transaction_id = $add->id;
        $payment->discounted = 0;
        $payment->sub_total = 300;
        $payment->total = 300;
        $payment->payment_status = 'paid';
        $payment->branch_id = auth()->user()->branch_id;
        $payment->save();

        $temp = new Temp_tran;
        $temp->transaction_id = $add->id;
        $temp->variation_id = 1;
        $temp->save();

        return response()->json('success');
    }

    public function delete_property_member($id)
    {
        $delete = Property::find($id)->delete();

        return response()->json('success');
    }
}
