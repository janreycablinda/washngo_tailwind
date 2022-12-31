<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Discount;

class DiscountController extends Controller
{
    public function get_discount($id){
        $get = Discount::with('services')->where('branch_id', auth()->user()->branch_id)->get();
        return response()->json($get);
    }

    public function add_discount(Request $request){
        
        $new = new Discount;
        $new->discount_type = $request->discount_type;
        $new->services_id = $request->services_id;
        $new->discount_percentage = $request->discount_percentage;
        $new->percentage_type = $request->percentage_type;
        $new->branch_id = auth()->user()->branch_id;
        $new->save();

        return $new->load('services');
    }

    public function update_discount(Request $request){
        $update = Discount::where('id', $request->id)->update([
            'discount_type' => $request->discount_type,
            'services_id' => $request->services_id,
            'discount_percentage' => $request->discount_percentage,
            'percentage_type' => $request->percentage_type,
        ]);
        $get = Discount::with('services')->where('id', $request->id)->first();

        return response()->json($get);
    }

    public function delete_discount($id)
    {

        $delete = Discount::where('id', $id)->delete();

        return response()->json($id);
    }

    public function get_main_discount()
    {
        $get = Discount::with('services')->where('branch_id', 1)->get();
        
        return response()->json($get);
    }

    public function sync_discount(Request $request)
    {
        
        foreach($request->all() as $discount){
            $new = new Discount;
            $new->discount_type = $discount['discount_type'];
            $new->services_id = $discount['services_id'];
            $new->discount_percentage = $discount['discount_percentage'];
            $new->percentage_type = $discount['percentage_type'];
            $new->branch_id = auth()->user()->branch_id;
            $new->save();
        }
        
        return response()->json(200);
    }
}
