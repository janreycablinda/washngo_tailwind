<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Stockin;
use App\Models\Item;
use Carbon\Carbon;
use App\Models\Stockin_temp;

class StockinController extends Controller
{
    public function get_stockin($id)
    {
        $get = Stockin::with('user', 'stockin_temps.item.unit', 'stockin_temps.item.category')->where('branch_id', $id)->where('is_deleted', false)->orderBy('id', 'DESC')->get();

        return response()->json($get);
    }

    public function add_stockin(Request $request)
    {
        
        if($request->image){
            $imageName = 'RCPT-'.time().'.'. $request->image->getClientOriginalExtension();
            $request->image->move(public_path('img/upload'), $imageName);
        }else{
            $imageName = null;
        }
        
        $addstock = new Stockin();
        $addstock->total_cost = $request->total_cost;
        $addstock->branch_id = $request->branch_id;
        $addstock->date = Carbon::parse($request->date)->format('Y-m-d H:m:s');
        $addstock->receipt = $imageName;
        $addstock->user_id = $request->user_id;
        $addstock->save();

        $stockin_temp = json_decode($request->stockin_temp, true);
        
        $items = [];
        foreach($stockin_temp as $temp){
            $new = new Stockin_temp;
            $new->stockin_id = $addstock->id;
            $new->item_id = $temp['item_id'];
            $new->qty = $temp['qty'];
            $new->save();

            $increment = Item::where('id', $temp['item_id'])->increment('qty', $temp['qty']);
            $item = Item::with('unit', 'category', 'user')->where('id', $temp['item_id'])->first();

            array_push($items, $item);
        }
        

        return response()->json(['stockin' => $addstock->load('user', 'stockin_temps'), 'item' => $items]);



    }

    public function update_stockin(Request $request)
    {
        if($request->image){
            $imageName = 'RCPT-'.time().'.'. $request->image->getClientOriginalExtension();
            $request->image->move(public_path('img/upload'), $imageName);
        }else{
            $imageName = null;
        }

        $update = Stockin::where('id', $request->id)->update([
            'total_cost' => $request->total_cost,
            'date' => Carbon::parse($request->date)->format('Y-m-d H:m:s'),
            'receipt' => $imageName,
            'user_id' => $request->user_id,
        ]);

        $stockin_temp = json_decode($request->stockin_temp, true);
        
        $items = [];
        foreach($stockin_temp as $temp){
            $new = new Stockin_temp;
            $new->stockin_id = $addstock->id;
            $new->item_id = $temp['item_id'];
            $new->qty = $temp['qty'];
            $new->save();

            $increment = Item::where('id', $temp['item_id'])->increment('qty', $temp['qty']);
            $item = Item::with('unit', 'category', 'user')->where('id', $temp['item_id'])->first();

            array_push($items, $item);
        }
        

        return response()->json(['stockin' => $addstock->load('user', 'stockin_temps'), 'item' => $items]);
    }

    public function delete_stockin($id)
    {

        $findtemp = Stockin_temp::where('stockin_id', $id)->get();

        $items = [];
        foreach($findtemp as $temp){
            $decrement = Item::where('id', $temp['item_id'])->decrement('qty', $temp['qty']);

            $item = Item::with('unit')->where('id', $temp['item_id'])->first();
            array_push($items, $item);
        }

        $delete = Stockin::where('id', $id)->update(['is_deleted' => true]);

        return response()->json(['id' => $id, 'item' => $items]);
    }
}
