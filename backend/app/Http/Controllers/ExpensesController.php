<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Expense;
use Carbon\Carbon;

class ExpensesController extends Controller
{
    public function get_expenses($id){
        $get = Expense::where('branch_id', $id)->get();

        return $get;
    }

    public function add_expenses(Request $request)
    {
        $split = explode('/', $request->date);
        $date = $split[2] . '-' . $split[0] . '-' . $split[1];
        
        $new = new Expense;
        $new->item = $request->item;
        $new->unit = $request->unit;
        $new->qty = $request->qty;
        $new->cost = $request->cost;
        $new->branch_id = $request->branch_id;
        $new->date = $date;
        $new->save();

        return 'success';
    }

    public function update_expenses(Request $request)
    {
        $split = explode('/', $request->date);
        $date = $split[2] . '-' . $split[0] . '-' . $split[1];

        $update = Expense::where('id', $request->id)->update([
            'item' => $request->item,
            'unit' => $request->unit,
            'qty' => $request->qty,
            'cost' => $request->cost,
            'date' => $date
        ]);

        return 'success';
    }

    public function delete_expenses($id){
        $delete = Expense::where('id', $id)->delete();

        return 'success';
    }

    public function get_expenses_count(Request $request) {
        if($request->data == "Today"){
            $from = Carbon::now()->startOfDay();
            $to = Carbon::now()->endOfDay();
            $get = Expense::where('branch_id', $request->branch_id)->whereBetween('created_at', [$from, $to])->get();
        }elseif($request->data == "Week"){
            $from = Carbon::now()->startOfWeek()->startOfDay();
            $to = Carbon::now()->endOfWeek()->endOfDay();
            $get = Expense::where('branch_id', $request->branch_id)->whereBetween('created_at', [$from, $to])->get();
        }elseif($request->data == "Month"){
            $from = Carbon::now()->startOfMonth()->startOfDay();
            $to = Carbon::now()->endOfMonth()->endOfDay();
            $get = Expense::where('branch_id', $request->branch_id)->whereBetween('created_at', [$from, $to])->get();
        }else{
            $get = Expense::where('branch_id', $request->branch_id)->get();
        }

        return $get;
    }
}
