<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Target;
use Carbon\Carbon;

class TargetController extends Controller
{
    public function get_target($id)
    {

        $get = Target::where('branch_id', $id)->where('date', Carbon::now()->format('Y-m-d'))->first();
        if($get){
            return $get;
        }else{
            $add = new Target;
            $add->branch_id = $id;
            $add->date = Carbon::now();
            $add->save();

            return $add->id;
        }
        
    }

    public function update_target(Request $request)
    {
        $update = Target::where('branch_id', $request->id)->where('date', Carbon::now()->format('Y-m-d'))->update([
            'january' => $request->form['january'],
            'february' => $request->form['february'],
            'march' => $request->form['march'],
            'april' => $request->form['april'],
            'may' => $request->form['may'],
            'june' => $request->form['june'],
            'july' => $request->form['july'],
            'august' => $request->form['august'],
            'september' => $request->form['september'],
            'october' => $request->form['october'],
            'november' => $request->form['november'],
            'december' => $request->form['december'],
        ]);

        return $request->id;
    }
}
