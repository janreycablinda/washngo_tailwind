<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Unit;

class UnitController extends Controller
{
    public function get_unit($id)
    {
        $get = Unit::where('branch_id', $id)->where('is_deleted', false)->get();

        return $get;
    }

    public function add_unit(Request $request)
    {
        $add = new Unit;
        $add->name = $request->unit_name;
        $add->branch_id = $request->branch_id;
        $add->save();

        return response()->json($add);
    }

    public function delete_unit($id)
    {
        $delete = Unit::where('id', $id)->update([
            'is_deleted' => true
        ]);

        return response()->json($id);
    }
}
