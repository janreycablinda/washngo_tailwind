<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Permission;
use App\Models\Permission_Child;
use App\Models\Permission_Item;

class PermissionController extends Controller
{
    public function get_permission(Request $request)
    {
        $get = Permission::all();

        return response()->json($get);
    }

    public function update_permission(Request $request)
    {
        if($request->parent == 'parent'){
            $update = Permission::where('id', $request->id)->update([
                $request->location => $request->data
            ]);
        }else if($request->parent == 'child'){
            $update = Permission_Child::where('id', $request->id)->update([
                $request->location => $request->data
            ]);
        }else{
            $update = Permission_Item::where('id', $request->id)->update([
                $request->location => $request->data
            ]);
        }
        
        return 'success';
    }

    public function get_permission_details($key)
    {
        $find = Permission::where('permission_key', $key)->first();

        return response()->json($find);
    }

    public function submit_element_permission(Request $request){

        if(!$request->id){
            $create = new Permission;
            $create->title = $request->name;
            $create->permission_key = $request->permission_key;
            $create->page = $request->page_name;
            $create->action = $request->action;
            $create->save();
        }else{
            $update = Permission::find($request->id)->update([
                'title' => $request->name,
                'action' => $request->action,
                'permission_key' => $request->permission_key,
                'page' => $request->page_name
            ]);
        }

        return response()->json('success');

    }
}
