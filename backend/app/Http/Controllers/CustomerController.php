<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;


class CustomerController extends Controller
{
    public function get_customers(Request $request)
    {
        $start_split = explode('/', $request->start);
        $end_split = explode('/', $request->end);
        $start = $start_split[2] . '-' . $start_split[0] . '-' . $start_split[1];
        $end = $end_split[2] . '-' . $end_split[0] . '-' . $end_split[1];
        
        $get = Transaction::with('property', 'user', 'property.vehicle', 'vehicle', 'member', 'payment', 'temp_trans', 'temp_trans.services', 'temp_trans.variation', 'temp_trans.variation.services', 'labors', 'labors.washboy')->whereBetween('transaction_date', [$start, $end])->where('branch_id', $request->branch)->where('status', 'completed')->orderBy('id', 'DESC')->get();

        return response()->json($get);
    }
}
