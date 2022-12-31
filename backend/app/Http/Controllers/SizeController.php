<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Size;
use App\Models\Vehicle;

class SizeController extends Controller
{
    public function get_size()
    {
        $get = Size::orderBy('id', 'ASC')->get();

        return $get;
    }

    public function get_size_id($id)
    {
        $get = Vehicle::where('id', $id)->first();
        
        return $get->size_id;
    }
}
