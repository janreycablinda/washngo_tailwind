<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vehicle;

class VehicleController extends Controller
{
    public function get_vehicle()
    {
        $get = Vehicle::with('size')->where('branch_id', auth()->user()->branch_id)->get();

        return response()->json($get);
    }

    public function add_vehicle(Request $request)
    {
        $add = new Vehicle;
        $add->vehicle_name = $request->form['vehicle_name'];
        $add->size_id = $request->form['size_id'];
        $add->branch_id = auth()->user()->branch_id;
        $add->save();

        return response()->json($add->load('size'));
    }

    public function delete_vehicle(Request $request)
    {
        $delete = Vehicle::where('id', $request->id)->delete();

        return $request->id;
    }

    public function update_vehicle(Request $request)
    {
        $update = Vehicle::where('id', $request->form['id'])->update([
            'vehicle_name' => $request->form['vehicle_name'],
            'size_id' => $request->form['size_id']
        ]);

        return $request->all();
    }

    public function get_main_vehicle()
    {
        $get = Vehicle::with('size')->where('branch_id', 1)->get();

        return response()->json($get);
    }

    public function sync_vehicle(Request $request)
    {

        foreach ($request->all() as $vehicle){ 
            $add = new Vehicle;
            $add->vehicle_name = $vehicle['vehicle_name'];
            $add->size_id = $vehicle['size_id'];
            $add->branch_id = auth()->user()->branch_id;
            $add->save();
        }

        return response()->json(200);

    }
}
