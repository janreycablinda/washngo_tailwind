<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Washboy;
use App\Models\Attendance;
use Carbon\Carbon;
use App\Models\Labor;

class WashboyController extends Controller
{
    public function get_washboy($id)
    {
        $get = Washboy::with('personel_cat', 'attendance')->where('branch_id', $id)->where('status', 'Active')->orderBy('id', 'DESC')->get();

        return $get;
    }

    public function get_attendance($id)
    {
        $get = Washboy::with(['attendance' => function ($query) {
            $query->where('date', Carbon::now()->toDateString());
        }, 'shift'])->where('branch_id', $id)->where('status', 'Active')->orderBy('id', 'DESC')->get();

        return $get;
    }

    public function seconds_from_time($time) {
        list($h, $m, $s) = explode(':', $time);
        return ($h * 3600) + ($m * 60) + $s;
    }
    public function time_from_seconds($seconds) {
        $h = floor($seconds / 3600);
        $m = floor(($seconds % 3600) / 60);
        $s = $seconds - ($h * 3600) - ($m * 60);
        return sprintf('%02d:%02d:%02d', $h, $m, $s);
    }

    public function save_attendance(Request $request)
    {
        $shift = Washboy::with('shift')->where('id', $request->id)->first();
        $start_worktime = $this->seconds_from_time($shift->shift->start_worktime);
        $late_allowance = $shift->shift->late_allowance * 60;
        $time_with_allowance = $start_worktime + $late_allowance;
        $validtime_with_allowance = $this->time_from_seconds($time_with_allowance);

        if($request->action == 'add'){
            if($request->time <= $validtime_with_allowance){
                $time_status = 'Good';
            }else{
                $time_status = 'Late';
            }

            $add = new Attendance;
            $add->washboy_id = $request->id;
            $add->timein = $request->time;
            $add->timein_status = $time_status;
            $add->date = Carbon::now();
            $add->save();
        }else{
            if($request->time_type == 'timein'){
                if($request->time <= $validtime_with_allowance){
                    $time_status = 'Good';
                }else{
                    $time_status = 'Late';
                }

                $update = Attendance::where('id', $request->attendance_id)->update([
                    'timein' => $request->time,
                    'timein_status' => $time_status,
                ]);
            }else{
                if($request->time >= $shift->shift->end_worktime){
                    $time_status = 'Good';
                }else{
                    $time_status = 'Undertime';
                }
                $update = Attendance::where('id', $request->attendance_id)->update([
                    'timeout' => $request->time,
                    'timeout_status' => $time_status,
                ]);
            }
        }

        $get = Washboy::with(['attendance' => function ($query) {
            $query->where('date', Carbon::now()->toDateString());
        }, 'shift'])->where('branch_id', $shift->branch_id)->where('status', 'Active')->orderBy('id', 'DESC')->get();
        
        return $get;
    }

    public function find_attendance(Request $request, $id)
    {
        $split_start = explode('/', $request->start);
        $start = $split_start[2] . '/' . $split_start[0] . '/' . $split_start[1];

        $split_end = explode('/', $request->end);
        $end = $split_end[2] . '/' . $split_end[0] . '/' . $split_end[1];

        $get = Attendance::with('washboy')->where('washboy_id', $id)->whereBetween('date', [$start, $end])->get();

        return $get;
    }

    public function add_washboy(Request $request)
    {
        $add = new Washboy;
        $add->name = $request->form['name'];
        $add->address = $request->form['address'];
        $add->contact_no = $request->form['contact_no'];
        $add->personel_id = $request->form['personel'];
        $add->salary = $request->form['salary'];
        $add->status = 'Active';
        $add->shift_id = $request->form['shift'];
        $add->branch_id = $request->branch_id;
        $add->incentives = $request->form['incentives'];
        $add->save();

        return 'success';
    }

    public function update_washboy(Request $request)
    {
        $update = Washboy::where('id', $request->form['id'])->update([
            'name' => $request->form['name'],
            'address' => $request->form['address'],
            'contact_no' => $request->form['contact_no'],
            'personel_id' => $request->form['personel_id'],
            'salary' => $request->form['salary'],
            'shift_id' => $request->form['shift'],
            'branch_id' => $request->branch_id,
            'incentives' => $request->form['incentives']
        ]);

        return $request->all();
    }

    public function delete_washboy(Request $request)
    {
        $delete = Washboy::where('id', $request->id)->delete();

        return $request->id;
    }

    public function search_washboy($branch, $id)
    {
        $get = Washboy::with('personel_cat')->where('id', $id)->where('branch_id', $branch)->first();

        return response()->json($get);
    }

    public function wash_history($branch, $id)
    {
        $get = Labor::with('transaction', 'transaction.property', 'transaction.user', 'transaction.vehicle', 'transaction.property.vehicle', 'transaction.member', 'transaction.payment', 'transaction.temp_trans', 'transaction.temp_trans.services', 'transaction.temp_trans.variation', 'transaction.temp_trans.variation.services', 'transaction.labors', 'transaction.labors.washboy')->whereHas('transaction')->where('washboy_id', $id)->get();

        return $get;
    }
}
