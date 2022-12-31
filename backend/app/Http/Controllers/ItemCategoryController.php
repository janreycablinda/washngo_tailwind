<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item_Category;

class ItemCategoryController extends Controller
{
    public function get_item_category($id)
    {
        return response()->json(Item_Category::where('branch_id', $id)->where('is_deleted', false)->get());
    }

    public function add_category(Request $request){

        $add = new Item_Category;
        $add->name = $request->category_name;
        $add->branch_id = $request->branch_id;
        $add->save();

        return response()->json($add);
    }

    public function delete_category($id){

        $delete = Item_Category::where('id', $id)->update([
            'is_deleted' => true
        ]);

        return response()->json($id);
    }
}
