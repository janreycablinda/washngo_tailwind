<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Shift;
use App\Models\Benefit;

class ShiftController extends Controller
{
    public function get_shift($id)
    {
        $get = Shift::with('benefits')->where('branch_id', $id)->get();

        return $get;
    }

    public function add_shift(Request $request)
    {
        if($request->benefit == true){
            $new = new Shift;
            $new->name = $request->name;
            $new->working_calculated = $request->working_calculated;
            $new->late_allowance = $request->late_allowance;
            $new->start_worktime = $request->start_worktime;
            $new->end_worktime = $request->end_worktime;
            $new->valid_checkin_from = $request->valid_checkin_from;
            $new->valid_checkin_to = $request->valid_checkin_to;
            $new->valid_checkout_from = $request->valid_checkout_from;
            $new->valid_checkout_to = $request->valid_checkout_to;
            $new->default_incentives = $request->default_incentives;
            $new->branch_id = $request->branch_id;
            $new->save();
            
            foreach($request->benefits as $ben){
                $new_benefit = new Benefit;
                $new_benefit->shift_id = $new->id;
                $new_benefit->agency = $ben['agency'];
                $new_benefit->amount = $ben['amount'];
                $new_benefit->save();
            }
        }else{
            $new = new Shift;
            $new->name = $request->name;
            $new->working_calculated = $request->working_calculated;
            $new->late_allowance = $request->late_allowance;
            $new->start_worktime = $request->start_worktime;
            $new->end_worktime = $request->end_worktime;
            $new->valid_checkin_from = $request->valid_checkin_from;
            $new->valid_checkin_to = $request->valid_checkin_to;
            $new->valid_checkout_from = $request->valid_checkout_from;
            $new->valid_checkout_to = $request->valid_checkout_to;
            $new->default_incentives = $request->default_incentives;
            $new->branch_id = $request->branch_id;
            $new->save();
        }

        return response()->json($new->load('benefits'));
    }

    public function update_shift(Request $request)
    {
        $update = Shift::where('id', $request->id)->update([
            'name' => $request->name,
            'working_calculated' => $request->working_calculated,
            'late_allowance' => $request->late_allowance,
            'start_worktime' => $request->start_worktime,
            'end_worktime' => $request->end_worktime,
            'valid_checkin_from' => $request->valid_checkin_from,
            'valid_checkin_to' => $request->valid_checkin_to,
            'valid_checkout_from' => $request->valid_checkout_from,
            'valid_checkout_to' => $request->valid_checkout_to,
            'default_incentives' => $request->default_incentives,
            'branch_id' => $request->branch_id,
        ]);
        if($request->benefit){
            $delete = Benefit::where('shift_id', $request->id)->delete();

            foreach($request->benefits as $ben){
                $new_benefit = new Benefit;
                $new_benefit->shift_id = $request->id;
                $new_benefit->agency = $ben['agency'];
                $new_benefit->amount = $ben['amount'];
                $new_benefit->save();
            }
        }

        return response()->json(Shift::with('benefits')->where('id', $request->id)->first());
    }

    public function delete_shift($id) {
        $delete = Shift::where('id', $id)->delete();

        return $id;
    }
}
