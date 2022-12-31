<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Stockout;
use App\Models\StockoutItem;
use App\Models\OperationInventory;
use App\Models\ItemVariation;
use Carbon\Carbon;

class StockoutController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $get = Stockout::with('user', 'branch', 'personnel', 'items.item_variations.unit', 'items.items')->where('branch_id', auth()->user()->branch_id)->get();

        return response()->json($get);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $add = new Stockout;
        $add->washboy_id = $request->personnel_id;
        $add->user_id = auth()->user()->id;
        $add->branch_id = auth()->user()->branch_id;
        $add->remarks = $request->remarks;
        $add->date = Carbon::now();
        $add->save();

        foreach($request->items as $item){
            $add_item = new StockoutItem;
            $add_item->stockout_id = $add->id;
            $add_item->item_id = $item['id'];
            $add_item->variation_id = $item['unit_id'];
            $add_item->qty = $item['qty'];
            $add_item->save();

            $variation = ItemVariation::where('id', $item['unit_id'])->first();

            $calculate = $item['qty'] * $variation->qty;
            
            $decrement = OperationInventory::where('item_id', $item['id'])->where('branch_id', auth()->user()->branch_id)->decrement('available_qty', $calculate);
        }

        return response()->json($add->load('user', 'branch', 'personnel', 'items.item_variations.unit', 'items.items'));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $update = Stockout::find($id)->update([
            'washboy_id' => $request->personnel_id,
            'remarks' => $request->remarks
        ]);

        $find_items = StockoutItem::where('stockout_id', $id)->get();

        foreach($find_items as $items){

            $variation = ItemVariation::where('id', $items['variation_id'])->first();

            $calculate = $items['qty'] * $variation->qty;
            $increment = OperationInventory::where('item_id', $items['item_id'])->where('branch_id', auth()->user()->branch_id)->increment('available_qty', $calculate);
        }

        $delete = StockoutItem::where('stockout_id', $id)->delete();

        foreach($request->items as $item){
            $add_item = new StockoutItem;
            $add_item->stockout_id = $id;
            $add_item->item_id = $item['id'];
            $add_item->variation_id = $item['unit_id'];
            $add_item->qty = $item['qty'];
            $add_item->save();

            $variation = ItemVariation::where('id', $item['unit_id'])->first();

            $calculate = $item['qty'] * $variation->qty;
            
            $decrement = OperationInventory::where('item_id', $item['id'])->where('branch_id', auth()->user()->branch_id)->decrement('available_qty', $calculate);
        }

        return response()->json(Stockout::with('user', 'branch', 'personnel', 'items.item_variations.unit', 'items.items')->find($id));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $find_items = StockoutItem::where('stockout_id', $id)->get();

        foreach($find_items as $items){
            $variation = ItemVariation::where('id', $items['variation_id'])->first();

            $calculate = $items['qty'] * $variation->qty;
            $increment = OperationInventory::where('item_id', $items['item_id'])->where('branch_id', auth()->user()->branch_id)->increment('available_qty', $calculate);
        }

        $delete = Stockout::find($id)->delete();

        return response()->json($id);
    }
}
