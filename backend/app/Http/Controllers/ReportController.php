<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;

class ReportController extends Controller
{
    public function find_report(Request $request)
    {

        $split_start = explode('/', $request->start);
        $start = $split_start[2] . '/' . $split_start[0] . '/' . $split_start[1];

        $split_end = explode('/', $request->end);
        $end = $split_end[2] . '/' . $split_end[0] . '/' . $split_end[1];

        $get = Transaction::with(['payment' => function ($query) use ($request) {
            $query->where('payment_status', 'paid');
        },'property', 'vehicle', 'member', 'property.vehicle', 'user', 'services', 'services.variation', 'services.variation.services'])->whereBetween('transaction_date', [$start, $end])->where('branch_id', $request['branch_id']['value'])->orderBy('transaction_date', 'ASC')->get();

        return $get;
    }
    
}
