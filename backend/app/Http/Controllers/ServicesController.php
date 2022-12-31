<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Service;
use App\Models\Variation;
use App\Models\Size;
use App\Models\ItemVariation;

class ServicesController extends Controller
{
    public function get_services()
    {
        $get = Service::with('variations', 'variations.size')->where('branch_id', auth()->user()->branch_id)->orderBy('id', 'DESC')->get();

        return response()->json($get);
    }

    public function add_services(Request $request)
    {

        $add = new Service;
        $add->services_name = $request->form['services_name'];
        $add->category_id = $request->form['category_id'];
        $add->status = "Active";
        $add->branch_id = auth()->user()->branch_id;
        $add->save();

        $sizes = Size::orderBy('id', 'ASC')->get();

        foreach($sizes as $size){
            $addvariation = new Variation;
            $addvariation->services_id = $add->id;
            $addvariation->size_id = $size->id;
            $addvariation->price = 0;
            $addvariation->save();
        }

        return response()->json($add->load('variations', 'variations.size'));
        
    }

    public function update_custom_services(Request $request){
        $update = Service::where('id', $request->form['id'])->update([
            'services_name' => $request->form['services_name'],
            'category_id' => $request->form['category_id']
        ]);
    }

    public function save_variant(Request $request)
    {
        $update = Variation::where('id', $request->id)->update([
            'price' => $request->price,
        ]);

        return 'success';
    }

    public function delete_services(Request $request)
    {
        $delete = Service::where('id', $request->id)->delete();

        return $request->id;
    }

    public function find_services(Request $request)
    {

        $find = Service::with(['variations' => function ($query) use ($request) {
            $query->where('size_id', $request->size_id);
        }])->where('category_id', $request->category_id)->where('branch_id', auth()->user()->branch_id)->where('id', '!=', 0)->get();

        return response()->json($find);
    }

    public function get_variant($id)
    {
        $get = ItemVariation::with('unit')->where('item_id', $id)->get();

        return response()->json($get);
    }

    public function get_main_services()
    {
        $get = Service::with('variations', 'variations.size')->where('branch_id', 1)->orderBy('id', 'DESC')->get();

        return response()->json($get);
    }

    public function sync_services(Request $request)
    {
        foreach($request->all() as $services){
            $add = new Service;
            $add->services_name = $services['services_name'];
            $add->category_id = $services['category_id'];
            $add->status = "Active";
            $add->branch_id = auth()->user()->branch_id;
            $add->save();

            $sizes = Size::orderBy('id', 'ASC')->get();

            foreach($sizes as $size){
                $addvariation = new Variation;
                $addvariation->services_id = $add->id;
                $addvariation->size_id = $size->id;
                $addvariation->price = 0;
                $addvariation->save();
            }
        }
        
        return response()->json(200);
    }
}
