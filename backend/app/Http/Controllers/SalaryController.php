<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Attendance;

class SalaryController extends Controller
{
    public function find_salary(Request $request, $id)
    {
        $split_start = explode('/', $request->start);
        $start = $split_start[2] . '/' . $split_start[0] . '/' . $split_start[1];

        $split_end = explode('/', $request->end);
        $end = $split_end[2] . '/' . $split_end[0] . '/' . $split_end[1];

        $get = Attendance::with('washboy', 'washboy.shift', 'washboy.shift.benefits')->where('washboy_id', $id)->whereBetween('date', [$start, $end])->get();

        return $get;
    }
}
