<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;
use App\Models\Incentive;

class IncentivesController extends Controller
{
    public function find_incentives(Request $request)
    {
        $split_start = explode('/', $request->start);
        $start = $split_start[2] . '/' . $split_start[0] . '/' . $split_start[1];

        $split_end = explode('/', $request->end);
        $end = $split_end[2] . '/' . $split_end[0] . '/' . $split_end[1];

        $get = Transaction::with(['payment' => function ($query) use ($request) {
            $query->where('payment_status', 'paid');
        },'labors','labors.washboy', 'vehicle', 'labors.washboy.shift', 'labors.washboy.shift.incentives', 'property.vehicle', 'services', 'services.variation', 'services.variation.services'])->whereBetween('transaction_date', [$start, $end])->orderBy('transaction_date', 'ASC')->get();

        return $get;
    }

    public function get_incentives($id){
        $get = Incentive::with('services')->where('shift_id', $id)->get();

        return response()->json($get);
    }

    public function add_incentives(Request $request){
        $new = new Incentive;
        $new->shift_id = $request->shift_id;
        $new->services_id = $request->services_id;
        $new->percentage = $request->percentage;
        $new->save();

        return response()->json($new->load('services'));
    }

    public function delete_incentives($id){
        $delete = Incentive::where('id', $id)->delete();

        return response()->json($id);
    }
}
