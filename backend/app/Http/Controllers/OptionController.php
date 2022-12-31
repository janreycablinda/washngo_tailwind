<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;
use App\Models\Category;
use App\Models\Permission;
use App\Models\Permission_Child;
use App\Models\Permission_Item;
use App\Models\PermissionRole;

class OptionController extends Controller
{
    public function get_roles()
    {
        $get = Role::with('permissions.permission')->get();

        return response()->json($get);
    }

    public function add_roles(Request $request)
    {
        $add = new Role;
        $add->role_name = $request->role_name;
        $add->save();

        if($request->permissions){
            foreach($request->permissions as $per){
                $new = new PermissionRole;
                $new->role_id = $add->id;
                $new->permission_id = $per;
                $new->save();
            }
        }

        return response()->json($add->load('permissions'));
    }

    public function get_category()
    {
        $get = Category::all();

        return $get;
    }

    public function edit_roles(Request $request)
    {

        $update = Role::where('id', $request->id)->update([
            'role_name' => $request->role_name
        ]);

        $delete = PermissionRole::where('role_id', $request->id)->delete();

        foreach($request->permissions as $perm){
            $new_permission = new PermissionRole;
            $new_permission->role_id = $request->id;
            $new_permission->permission_id = $perm;
            $new_permission->save();
        }

        return response()->json(Role::with('permissions.permission')->where('id', $request->id)->first());
    }

    public function delete_roles(Request $request)
    {
        $delete = Role::where('id', $request->id)->delete();

        return 'success';
    }
}
