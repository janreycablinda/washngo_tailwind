<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DeliveryReceipt;
use App\Models\DeliveryReceiptItem;
use App\Models\OperationInventory;
use App\Models\Inventory;
use Carbon\Carbon;

class OperationDeliveryReceiptController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $get = DeliveryReceipt::with('purchase_order', 'items.variation.unit', 'items.item', 'user', 'branch')->where('branch_id', auth()->user()->branch_id)->get();

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
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $delete = DeliveryReceipt::find($id)->delete();

        return response()->json($id);
    }

    public function operation_purchase_order_status(Request $request, $id)
    {
        $update = DeliveryReceipt::find($id)->update([
            'status' => $request->status
        ]);

        return response()->json('success');
    }

    public function operation_delivery_receipt_completed(Request $request, $id)
    {
        $update = DeliveryReceipt::find($id)->update([
            'status' => $request->status,
            'date_delivered' => Carbon::now()
        ]);

        $item_list = OperationInventory::where('branch_id', auth()->user()->branch_id)->get();
        
        $items_ids = array_column((array)$item_list->toArray(), 'item_id');
        $result = array_filter($items_ids);

        $items = DeliveryReceiptItem::with('variation')->where('dr_id', $id)->get();

        foreach($items as $item){
            $find = array_search($item['item_id'], $result);
            $mult = $item['qty'] * $item['variation']['qty'];
            if(is_numeric($find)){
                $update_item = OperationInventory::where('branch_id', auth()->user()->branch_id)
                ->where('item_id', $item['item_id'])
                ->increment('available_qty', $mult);
                $decrement_item = Inventory::where('item_id', $item['item_id'])
                ->decrement('available_qty', $mult);
            }else{
                $decrement_item = Inventory::where('item_id', $item['item_id'])
                ->decrement('available_qty', $mult);
                
                $new = new OperationInventory;
                $new->branch_id = auth()->user()->branch_id;
                $new->item_id = $item['item_id'];
                $new->available_qty = $mult;
                $new->notifier = 0;
                $new->save();
            }
        }

        return response()->json($items);
        
    }
}
