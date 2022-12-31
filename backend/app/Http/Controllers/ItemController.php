<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;
use App\Models\ItemVariation;
use App\Models\Inventory;

class ItemController extends Controller
{
    public function get_item()
    {
        return response()->json(Item::with('category', 'user', 'inventory', 'item_variations.unit')->where('branch_id', auth()->user()->branch_id)->get());
    }

    public function add_item(Request $request)
    {
        $add = new Item;
        $add->brand = $request->brand;
        $add->particular = $request->particular;
        $add->category_id = $request->category_id;
        $add->branch_id = auth()->user()->branch_id;
        $add->user_id = auth()->user()->id;
        $add->save();

        $variation = new ItemVariation;
        $variation->item_id = $add->id;
        $variation->unit_id = $request->unit_id;
        $variation->wg_cost = $request->wg_cost;
        $variation->franchise_cost = $request->franchise_cost;
        $variation->type = 'main';
        $variation->qty = 1;
        $variation->save();

        $inv = new Inventory;
        $inv->branch_id = auth()->user()->branch_id;
        $inv->item_id = $add->id;
        $inv->available_qty = $request->qty;
        $inv->notifier = $request->notifier;
        $inv->save();

        if(count($request->variations) > 0){
            foreach($request->variations as $variation){
                $variant = new ItemVariation;
                $variant->item_id = $add->id;
                $variant->unit_id = $variation['unit_id'];
                $variant->wg_cost = $variation['wg_cost'];
                $variant->qty = $variation['qty'];
                $variant->franchise_cost = $variation['franchise_cost'];
                $variant->type = 'variant';
                $variant->save();
            }
        }

        return response()->json($add->load('category', 'user', 'inventory', 'item_variations.unit'));
    }

    function myFilter($var){
        return ($var !== NULL && $var !== FALSE && $var !== "");
    }

    public function update_item(Request $request)
    {

        $update_item = Item::find($request->id)->update([
            'brand' => $request->brand,
            'particular' => $request->particular,
            'category_id' => $request->category_id,
        ]);

        $update_inv = Inventory::where('item_id', $request->id)->update([
            'available_qty' => $request->qty,
            'notifier' => $request->notifier
        ]);

        $update_var_main = ItemVariation::where('item_id', $request->id)->where('type', 'main')->update([
            'unit_id' => $request->unit_id,
            'wg_cost' => $request->wg_cost,
            'franchise_cost' => $request->franchise_cost
        ]);

        $variation_ids = array_column($request->variations, 'id');
        $result = array_filter($variation_ids);
        $update_var = ItemVariation::whereNotIn('id', $result)->where('item_id', $request->id)->where('type', '!=', 'main')->delete();

        if(count($request->variations) > 0){
            foreach($request->variations as $variation){

                if($variation['id'] != ''){
                    $update_var = ItemVariation::find($variation['id'])->update([
                        'unit_id' => $variation['unit_id'],
                        'wg_cost' => $variation['wg_cost'],
                        'qty' => $variation['qty'],
                        'franchise_cost' => $variation['franchise_cost'],
                    ]);
                }else{
                    $variant = new ItemVariation;
                    $variant->item_id = $request->id;
                    $variant->unit_id = $variation['unit_id'];
                    $variant->wg_cost = $variation['wg_cost'];
                    $variant->qty = $variation['qty'];
                    $variant->franchise_cost = $variation['franchise_cost'];
                    $variant->type = 'variant';
                    $variant->save();
                }
            }
        }

        return response()->json(Item::with('category', 'user', 'inventory', 'item_variations.unit')->find($request->id));
    }

    public function delete_item($id)
    {
        $delete = Item::find($id)->delete();

        return response()->json($id);
    }
}
