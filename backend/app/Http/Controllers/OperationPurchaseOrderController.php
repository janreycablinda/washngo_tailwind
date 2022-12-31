<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PurchaseOrder;
use App\Models\PurchaseOrderItem;
use App\Models\DeliveryReceipt;
use App\Models\DeliveryReceiptItem;

class OperationPurchaseOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $get = PurchaseOrder::with('items.variation.unit', 'items.item', 'user', 'branch')->where('branch_id', auth()->user()->branch_id)->where('inventory_type', 'Operation')->get();

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
        $add->status = 'Pending';
        $add->inventory_type = 'Franchise';
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

        return response()->json($add->load('items.variation.unit', 'items.item', 'user', 'branch'));
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
        
        $items_ids = array_column($request->items, 'id');
        $result = array_filter($items_ids);
        $update_var = PurchaseOrderItem::whereNotIn('id', $result)->where('po_id', $id)->delete();
        
        foreach($request->items as $item){

            if($item['id'] != ''){
                $update = PurchaseOrderItem::find($item['id'])->update([
                    'qty' => $item['qty'],
                ]);
            }else{
                $add_item = new PurchaseOrderItem;
                $add_item->po_id = $id;
                $add_item->item_id = $item['item_id'];
                $add_item->variation_id = $item['unit_id'];
                $add_item->qty = $item['qty'];
                $add_item->price = $item['unit_price'];
                $add_item->save();
            }
            
        }

        return response()->json(PurchaseOrder::with('items.variation.unit', 'items.item', 'user', 'branch')->find($id));
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

    public function po_no()
    {
        $get = PurchaseOrder::latest()->where('branch_id', auth()->user()->branch_id)->first();

        if($get != null){
            $po_no = $get->po_no_inc + 1;
        }else{
            $po_no = 1;
        }

        return response()->json($po_no);
    }

    public function operation_purchase_order_status(Request $request, $id)
    {
        $update = PurchaseOrder::find($id)->update([
            'status' => $request->status
        ]);

        return response()->json('success');
    }

    public function operation_purchase_order_convert_status(Request $request, $id)
    {
        $update = PurchaseOrder::find($id)->update([
            'status' => $request->status
        ]);

        $copy = PurchaseOrder::find($id);
        
        $newPost = new DeliveryReceipt;
        $newPost->po_id = $copy->id;
        $newPost->branch_id = $copy->branch_id;
        $newPost->user_id = $copy->user_id;
        $newPost->status = 'Pending';
        $newPost->save();
        
        $copy_items = PurchaseOrderItem::query()
        ->where('po_id', $id)
        ->each(function ($oldPost2) use (&$newPost) {
            $newPost2 = new DeliveryReceiptItem;
            $newPost2->dr_id = $newPost->id;
            $newPost2->item_id = $oldPost2->item_id;
            $newPost2->variation_id = $oldPost2->variation_id;
            $newPost2->qty = $oldPost2->qty;
            $newPost2->price = $oldPost2->price;
            $newPost2->save();
        });

        return response()->json('success');
    }
}
