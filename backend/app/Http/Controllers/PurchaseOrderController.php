<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PurchaseOrder;
use App\Models\PurchaseOrderItem;
use App\Models\Inventory;
use Carbon\Carbon;

class PurchaseOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $get = PurchaseOrder::with('items.variation.unit', 'items.item.inventory.variants.unit', 'user', 'branch', 'from', 'to')->get();

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
        $add = new PurchaseOrder;
        $add->po_no = 'PO-000' . $request->po_no;
        $add->user_id = auth()->user()->id;
        $add->branch_id = auth()->user()->branch_id;
        $add->to_id = $request->to_id;
        $add->company_id = $request->from_id;
        $add->status = 'Pending';
        $add->inventory_type = 'HQ';
        $add->save();

        foreach($request->items as $item){
            $add_item = new PurchaseOrderItem;
            $add_item->po_id = $add->id;
            $add_item->item_id = $item['id'];
            $add_item->variation_id = $item['unit_id'];
            $add_item->qty = $item['qty'];
            $add_item->price = $item['unit_price'];
            $add_item->save();
        }

        return response()->json($add->load('items.variation.unit', 'items.item.inventory', 'user', 'branch', 'from', 'to'));
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
        $delete = PurchaseOrder::find($id)->delete();

        return response()->json($id);
    }

    public function purchase_order_delivered(Request $request, $id){
        
        $update = PurchaseOrder::find($id)->update([
            'status' => 'Delivered',
            'delivery_date' => Carbon::now()
        ]);

        $item_list = Inventory::where('branch_id', $request->to_id)->get();
        
        $items_ids = array_column((array)$item_list->toArray(), 'item_id');
        $result = array_filter($items_ids);

        $items = PurchaseOrderItem::with('variation')->where('po_id', $id)->get();

        foreach($items as $item){
            $find = array_search($item['item_id'], $result);
            $mult = $item['qty'] * $item['variation']['qty'];
            if(is_numeric($find)){
                $update_item = Inventory::where('branch_id', $request->to_id)
                ->where('item_id', $item['item_id'])
                ->increment('available_qty', $mult);
                
            }else{
                
                $new = new Inventory;
                $new->branch_id = $request->to_id;
                $new->item_id = $item['item_id'];
                $new->available_qty = $mult;
                $new->notifier = 0;
                $new->save();
            }
        }

        return response()->json(PurchaseOrder::with('items.variation.unit', 'items.item.inventory', 'user', 'branch', 'from', 'to')->find($id));
    }
}
