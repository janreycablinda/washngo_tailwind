<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;
use App\Models\Property;
use App\Models\Member;
use Carbon\Carbon;
use App\Models\Payment;
use App\Models\Temp_tran;
use DB;
use App\Models\Labor;
use App\Models\Variation;

class TransactionController extends Controller
{
    public function get_waiting($id)
    {
        $get = Transaction::with('property','vehicle', 'property.vehicle', 'member', 'payment', 'temp_trans', 'temp_trans.services', 'temp_trans.variation', 'temp_trans.variation.services', 'labors', 'labors.washboy')->where('status', '!=', 'completed')->where('branch_id', auth()->user()->branch_id)->get();

        return response()->json($get);
    }

    public function get_completed()
    {
        $get = Payment::where('payment_status', 'paid')->get();

        return $get;
    }

    public function get_sales(Request $request)
    {
        if($request->data == "Today"){
            $from = Carbon::now()->startOfDay()->toDateString();
            $to = Carbon::now()->endOfDay()->toDateString();
        }elseif($request->data == "Week"){
            $from = Carbon::now()->startOfWeek()->startOfDay()->toDateString();
            $to = Carbon::now()->endOfWeek()->endOfDay()->toDateString();
        }else{
            $from = Carbon::now()->startOfMonth()->startOfDay()->toDateString();
            $to = Carbon::now()->endOfMonth()->endOfDay()->toDateString();
        }
        
        $get = Transaction::with(['payment' => function ($query) use ($request) {
            $query->where('payment_status', 'paid');
        }])->whereBetween('transaction_date', [$from, $to])->get();

        // $get = Payment::whereBetween('paid_date', [$from, $to])->get();

        return $get;
    }

    public function get_chart($year)
    {
        $get = DB::table("payments")->select(DB::raw('sum(total) as `data`'), DB::raw("DATE_FORMAT(created_at, '%m-%Y') new_date"),  DB::raw('YEAR(created_at) year, MONTH(created_at) month'))
        ->groupby('year','month')
        ->where('payment_status', 'paid')
        ->where('payment_status', 'paid')
        ->where('branch_id', auth()->user()->branch_id)
        ->whereYear('created_at', $year)
        ->get();

        return response()->json($get);
    }

    public function get_inprogress()
    {
        $get = Transaction::with('property', 'property.vehicle', 'member', 'payment', 'temp_trans', 'temp_trans.services', 'temp_trans.variation', 'temp_trans.variation.services')->where('status', 'inprogress')->get();

        return $get;
    }

    public function get_info(Request $request)
    {
        $get = Member::where('id', $request->id)->first();

        return $get;
    }

    public function get_new_member_no()
    {
        $get = Member::latest()->where('branch_id', auth()->user()->branch_id)->first();

        if($get != null){
            $split = explode('-', $get->card_no);
            $add = (int)$split[2]+1;
            $digit = strlen($add);

            if($digit == 1){
                $count = '000' . $add;
            }else if($digit == 2){
                $count = '00' . $add;
            }else if($digit == 3){
                $count = '0' . $add;
            }else{
                $count = $add;
            }

            $last_id = Carbon::now()->year . '-000-' . $count;
        }else{
            $last_id = Carbon::now()->year . '-000-000' . 1;
        }
        return response()->json($last_id);
    }

    public function get_property(Request $request)
    {
        $get = Property::with(['transactions' => function ($query) use ($request) {
            $query->where('points', 'added')->where('status', 'completed');
        }, 'vehicle'])->where('member_id', $request->id)->get();
        
        return $get;
    }

    public function add_transaction(Request $request)
    {
        $split = explode('/', $request->form['date']);
        $date = $split[2] . '-' . $split[0] . '-' . $split[1];

        if($request->form['member'] == false){
            if($request->form['add_as_member'] == true){
                $member = new Member;
                $member->card_no = $request->form['card_no'];
                $member->name = $request->form['name'];
                $member->contact_no = $request->form['contact_no'];
                $member->birthdate = $request->form['birthdate'];
                $member->beneficiary_name = $request->form['beneficiary_name'];
                $member->beneficiary_contact = $request->form['beneficiary_contact'];
                $member->expiration_date = $request->form['expiration_date'];
                $member->branch_id = auth()->user()->branch_id;
                $member->status = 'Pending';
                $member->user_id = auth()->user()->id;
                $member->save();

                $property = new Property;
                $property->member_id = $member->id;
                $property->vehicle_id = $request->form['vehicle_id']['value'];
                $property->plate_no = $request->form['plate_no'];
                $property->save();

                $add = new Transaction;
                $add->member_id = $member->id;
                $add->work_order = $request->form['work_order'];
                $add->user_id = auth()->user()->id;
                $add->branch_id = auth()->user()->branch_id;
                $add->vehicle_id = $request->form['vehicle_id']['value'];
                $add->property_id = $property->id;
                $add->name = $request->form['name'];
                $add->contact_no = $request->form['contact_no'];
                $add->plate_no = $request->form['plate_no'];
                $add->odo = $request->form['odo'];
                $add->transaction_type = 'member';
                $add->status = 'waiting';
                $add->transaction_date = $date;
                $add->save();

                $payment = new Payment;
                $payment->transaction_id = $add->id;
                $payment->discounted = $request->payment['discount'];
                $payment->sub_total = $request->payment['subtotal'];
                $payment->total = $request->payment['total'];
                $payment->payment_status = 'unpaid';
                $payment->branch_id = auth()->user()->branch_id;
                $payment->save();

                $count = count($request->temp_trans);
                for($i = 0; $i < $count ; $i++)
                {
                    $temp = new Temp_tran;
                    $temp->transaction_id = $add->id;
                    $temp->variation_id = $request->temp_trans[$i]['variation_id'];
                    $temp->save();
                }

                $temp = new Temp_tran;
                $temp->transaction_id = $add->id;
                $temp->variation_id = 0;
                $temp->save();

                return response()->json($add->load('property','vehicle', 'property.vehicle', 'member', 'payment', 'temp_trans', 'temp_trans.services', 'temp_trans.variation', 'temp_trans.variation.services', 'labors', 'labors.washboy'));

            }else{

                $add = new Transaction;
                $add->member_id = 0;
                $add->work_order = $request->form['work_order'];
                $add->user_id = $request->form['user_id'];
                $add->branch_id = auth()->user()->branch_id;
                $add->vehicle_id = $request->form['vehicle_id']['value'];
                $add->name = $request->form['name'];
                $add->contact_no = $request->form['contact_no'];
                $add->plate_no = $request->form['plate_no'];
                $add->odo = $request->form['odo'];
                $add->transaction_type = 'nonmember';
                $add->transaction_date = $date;
                $add->status = 'waiting';
                $add->save();

                $payment = new Payment;
                $payment->transaction_id = $add->id;
                $payment->discounted = $request->payment['discount'];
                $payment->sub_total = $request->payment['subtotal'];
                $payment->total = $request->payment['total'];
                $payment->payment_status = 'unpaid';
                $payment->branch_id = auth()->user()->branch_id;
                $payment->save();

                foreach ($request->temp_trans as $temp_tran) 
                {
                    $temp = new Temp_tran;
                    $temp->transaction_id = $add->id;
                    $temp->variation_id = $temp_tran['variation_id'];
                    $temp->save();
                }

                return response()->json($add->load('property','vehicle', 'property.vehicle', 'member', 'payment', 'temp_trans', 'temp_trans.services', 'temp_trans.variation', 'temp_trans.variation.services', 'labors', 'labors.washboy'));
            }
        }else{
            $add = new Transaction;
            $add->work_order = $request->form['work_order'];
            $add->member_id = $request->form['member_id']['value'];
            $add->user_id = $request->form['user_id'];
            $add->branch_id = auth()->user()->branch_id;
            $add->vehicle_id = $request->form['property_id']['value'];
            $add->property_id = $request->form['property_id']['property_id'];
            $add->name = $request->form['member_id']['label'];
            $add->contact_no = $request->form['member_id']['contact_no'];
            $add->temp_services_id = 0;
            $add->plate_no = $request->form['property_id']['plate_no'];
            $add->odo = $request->form['odo'];
            $add->transaction_type = 'member';
            $add->transaction_date = $date;
            $add->status = 'waiting';
            $add->save();

            $payment = new Payment;
            $payment->transaction_id = $add->id;
            $payment->discounted = $request->payment['discount'];
            $payment->sub_total = $request->payment['subtotal'];
            $payment->total = $request->payment['total'];
            $payment->payment_status = 'unpaid';
            $payment->branch_id = auth()->user()->branch_id;
            $payment->save();

            foreach ($request->temp_trans as $temp_tran){ 
                $temp = new Temp_tran;
                $temp->transaction_id = $add->id;
                $temp->variation_id = $temp_tran['variation_id'];
                $temp->save();
            }

            return response()->json($add->load('property','vehicle', 'property.vehicle', 'member', 'payment', 'temp_trans', 'temp_trans.services', 'temp_trans.variation', 'temp_trans.variation.services', 'labors', 'labors.washboy'));
        }
        
    }

    public function delete_transaction($id)
    {
        $delete_payment = Payment::where('transaction_id', $id)->delete();
        $delete = Transaction::where('id', $id)->delete();

        $deletetrans = Transaction::where('id', $id)->update([
            'deleted_user_id' => auth()->user()->id
        ]);

        $get = Transaction::with('property','vehicle', 'property.vehicle', 'member', 'payment', 'temp_trans', 'temp_trans.services', 'temp_trans.variation', 'temp_trans.variation.services', 'labors', 'labors.washboy', 'deleted_by')->withTrashed()->find($id);

        return response()->json($get);
    }

    public function delete_transaction_for_reg($id, $member_id){
        $delete_payment = Payment::where('transaction_id', $id)->delete();
        $delete = Transaction::find($id)->delete();
        $delete_member = Member::find($member_id)->delete();

        $deletetrans = Transaction::where('id', $id)->update([
            'deleted_user_id' => auth()->user()->id
        ]);

        $get = Transaction::with('property','vehicle', 'property.vehicle', 'member', 'payment', 'temp_trans', 'temp_trans.services', 'temp_trans.variation', 'temp_trans.variation.services', 'labors', 'labors.washboy', 'deleted_by')->withTrashed()->find($id);

        return response()->json($get);
    }

    public function submit_payment(Request $request)
    {
        $updatepayment = Payment::where('id', $request->id)->update([
            'amount' => $request->form['amount'],
            'changed' => $request->form['changed'],
            'payment_status' => 'paid'
        ]);

        $payment = Payment::where('id', $request->id)->first();
        $trans = Transaction::where('id', $payment->transaction_id)->update([
            'paid_date' => Carbon::now(),
            'points' => 'added'
        ]);

        $get = Transaction::with('property','vehicle', 'property.vehicle', 'member', 'payment', 'temp_trans', 'temp_trans.services', 'temp_trans.variation', 'temp_trans.variation.services', 'labors', 'labors.washboy')->where('id', $payment->transaction_id)->first();

        return response()->json($get);
    }

    public function start_wash(Request $request)
    {
        $start = Transaction::where('id', $request->form['id'])->update([
            'status' => 'inprogress',
            'start_wash' => Carbon::now()
        ]);

        foreach ($request->form['washboy_id'] as $washboy){ 
            $labor = new Labor;
            $labor->transaction_id = $request->form['id'];
            $labor->washboy_id = $washboy['value'];
            $labor->save();
        }

        $get = Transaction::with('property','vehicle', 'property.vehicle', 'member', 'payment', 'temp_trans', 'temp_trans.services', 'temp_trans.variation', 'temp_trans.variation.services', 'labors', 'labors.washboy')->where('id', $request->form['id'])->first();

        return response()->json($get);
    }

    public function edit_washboy(Request $request)
    {

        $delete = Labor::where('transaction_id', $request->form['id'])->delete();

        foreach ($request->form['washboy_id'] as $washboy){ 
            $labor = new Labor;
            $labor->transaction_id = $request->form['id'];
            $labor->washboy_id = $washboy['value'];
            $labor->save();
        }

        $get = Transaction::with('property','vehicle', 'property.vehicle', 'member', 'payment', 'temp_trans', 'temp_trans.services', 'temp_trans.variation', 'temp_trans.variation.services', 'labors', 'labors.washboy')->where('id', $request->form['id'])->first();

        return response()->json($get);
    }

    public function submit_completed(Request $request)
    {
        
        $start = Transaction::where('id', $request->id)->update([
            'status' => 'completed',
            'points' => 'added',
        ]);

        $trans = Transaction::find($request->id);
        $count = Transaction::where('member_id', $trans->member_id)->where('property_id', $request->property_id)->where('points', 'added')->count();
        if($count >= 10){
            $transpoints = Transaction::where('member_id', $trans->member_id)->where('property_id', $request->property_id)->update([
                'points' => 'claimed'
            ]);

            $transpoints = Transaction::where('id', $request->id)->update([
                'points' => 'claimed-availed'
            ]);
        }
        
        $update = Member::where('id', $trans->member_id)->update([
            'status' => 'Active'
        ]);

        return $request->id;
    }

    public function get_transaction_last()
    {
        $last = Transaction::where('work_order', '!=', null)->orderBy('id', 'DESC')->where('branch_id', auth()->user()->branch_id)->first();
        if($last){
            $split = explode('-', $last->work_order);
            $add = (int)$split[1]+1;
            $digit = strlen($add);

            if($digit == 1){
                $count = '000' . $add;
            }else if($digit == 2){
                $count = '00' . $add;
            }else if($digit == 3){
                $count = '0' . $add;
            }else{
                $count = $add;
            }

            $last_id = Carbon::now()->year . '-' . $count;
        }else{
            $last_id = Carbon::now()->year . '-000' . 1;
        }
        return $last_id;
    }

    public function add_edit_services(Request $request)
    {
        $new = new Temp_tran;
        $new->transaction_id = $request->transaction_id;
        $new->variation_id = $request->variation_id;
        $new->save();

        return 'success';
    }

    public function update_services(Request $request){

        if($request->form['data']['member']){
            $updatetrans = Transaction::where('id', $request->form['data']['id'])->update([
                'member_id' => $request->form['data']['member_id'],
                'transaction_type' => 'member',
                'odo' => $request->form['data']['odo'],
                'property_id' => $request->form['data']['property_id'],
                'transaction_date' => $request->form['data']['transaction_date'],
            ]);
            
        }else{
            $find = Transaction::find($request->form['data']['id']);
            if($request->form['data']['add_as_member']){
                $find_member = Member::where('id', '!=', 0)->find($find->member_id);
                    if($find_member){
                        $member = Member::where('id', $find->member_id)->update([
                            'name' => $request->form['data']['name'],
                            'contact_no' => $request->form['data']['contact_no'],
                            'birthdate' => $request->form['data']['birthdate'],
                            'beneficiary_name' => $request->form['data']['beneficiary_name'],
                            'beneficiary_contact' => $request->form['data']['beneficiary_contact'],
                        ]);
                    }else{
                        $member = new Member;
                        $member->card_no = $request->form['data']['card_no'];
                        $member->name = $request->form['data']['name'];
                        $member->contact_no = $request->form['data']['contact_no'];
                        $member->birthdate = $request->form['data']['birthdate'];
                        $member->beneficiary_name = $request->form['data']['beneficiary_name'];
                        $member->beneficiary_contact = $request->form['data']['beneficiary_contact'];
                        $member->expiration_date = Carbon::now()->addYear();
                        $member->branch_id = $request->form['data']['branch_id'];
                        $member->status = 'Pending';
                        $member->save();

                        $property = new Property;
                        $property->member_id = $find->member_id;
                        $property->vehicle_id =$request->form['data']['vehicle_id'];
                        $property->plate_no = $request->form['data']['plate_no'];
                        $property->save();

                        $updatetrans = Transaction::where('id', $request->form['data']['id'])->update([
                            'member_id' => $member->id,
                            'name' => $request->form['data']['name'],
                            'plate_no' => $request->form['data']['plate_no'],
                            'vehicle_id' => $request->form['data']['vehicle_id'],
                            'property_id' => $property->id,
                            'contact_no' => $request->form['data']['contact_no'],
                            'odo' => $request->form['data']['odo'],
                            'transaction_date' => $request->form['data']['transaction_date'],
                            'transaction_type' => 'member',
                        ]);
                    }
                
            }else{
                $delete_member = Member::findOrFail($find->member_id)->delete();
                $updatetrans = Transaction::where('id', $request->form['data']['id'])->update([
                    'member_id' => 0,
                    'name' => $request->form['data']['name'],
                    'plate_no' => $request->form['data']['plate_no'],
                    'vehicle_id' => $request->form['data']['vehicle_id'],
                    'contact_no' => $request->form['data']['contact_no'],
                    'odo' => $request->form['data']['odo'],
                    'transaction_date' => $request->form['data']['transaction_date'],
                    'transaction_type' => 'nonmember',
                ]);
            }

        }

        $payment = Payment::where('transaction_id', $request->form['data']['id'])->update([
            'payment_status' => 'unpaid',
            'total' => $request->form['payment']['total'],
            'sub_total' => $request->form['payment']['subtotal'],
            'discounted' => $request->form['payment']['discount'],
        ]);

        $delete = Temp_Tran::where('transaction_id', $request->form['data']['id'])->delete();

        foreach ($request->form['services'] as $services){ 
            $service = new Temp_Tran;
            $service->transaction_id = $request->form['data']['id'];
            $service->variation_id = $services['variation_id'];
            $service->save();
        }

        $updated = Transaction::with('property', 'user', 'vehicle', 'property.vehicle', 'member', 'payment', 'temp_trans', 'temp_trans.services', 'temp_trans.variation', 'temp_trans.variation.services', 'labors', 'labors.washboy')->where('id', $request->form['data']['id'])->first();
        return response()->json($updated);
       
    }

    public function check_if_first_trans(Request $request){

        $check = Transaction::with(['temp_trans' => function ($query) use ($request) {
            $query->where('variation_id', $request->services_id);
        }])->where('property_id', $request->property_id)->where('status', 'completed')->first();

         return $check;
    }

    public function get_completed_transaction(){
        $get = Transaction::with('property', 'user', 'property.vehicle', 'vehicle', 'member', 'payment', 'temp_trans', 'temp_trans.services', 'temp_trans.variation', 'temp_trans.variation.services', 'labors', 'labors.washboy')->where('status', 'completed')->orderBy('id', 'DESC')->get();

        return $get;
    }

    public function check_first_trans($id)
    {
        $find = Transaction::where('member_id', $id)->where('transaction_type', 'member')->where('status', 'completed')->first();

        return $find;
    }

    public function get_deleted_transaction(){

        $get = Transaction::with('property', 'user', 'property.vehicle', 'vehicle', 'member', 'payment', 'temp_trans', 'temp_trans.services', 'temp_trans.variation', 'temp_trans.variation.services', 'labors', 'labors.washboy', 'deleted_by')->onlyTrashed()->where('branch_id', auth()->user()->branch_id)->get();

        return response()->json($get);
    }

    public function restore_transaction($id){
        $delete_payment = Payment::withTrashed()->where('transaction_id', $id)->restore();
        $delete = Transaction::withTrashed()->find($id)->restore();

        $get = Transaction::with('property','vehicle', 'property.vehicle', 'member', 'payment', 'temp_trans', 'temp_trans.services', 'temp_trans.variation', 'temp_trans.variation.services', 'labors', 'labors.washboy', 'deleted_by')->find($id);

        return response()->json($get);
    }
}
