<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use URL;

class UserController extends Controller
{
    public function add_user(Request $request)
    {
        $add = new User;
        $add->name = $request->form['name'];
        $add->username = $request->form['username'];
        $add->email = $request->form['email'];
        $add->password = bcrypt($request->form['password']);
        $add->role_id = $request->form['role_id'];
        $add->branch_id = $request->form['branch_id'];
        $add->save();

        return response()->json($add->load('role', 'branch'));
    }

    public function get_users(Request $request)
    {
        $get = User::with('role', 'branch')->orderBy('id', 'DESC')->get();

        return $get;
    }

    public function get_user($id)
    {
        $get = User::with('role', 'branch')->where('id', $id)->first();

        return $get;
    }

    public function update_users(Request $request)
    {
        if($request->form['password'] != ''){
            $update = User::where('id', $request->form['id'])->update([
                'name' => $request->form['name'],
                'email' => $request->form['email'],
                'password' => bcrypt($request->form['password']),
                'username' => $request->form['username'],
                'role_id' => $request->form['role_id'],
                'branch_id' => $request->form['branch_id']
            ]);
        }else{
            $update = User::where('id', $request->form['id'])->update([
                'name' => $request->form['name'],
                'email' => $request->form['email'],
                'username' => $request->form['username'],
                'branch_id' => $request->form['branch_id'],
                'role_id' => $request->form['role_id'],
            ]);
        }

        return $request->all();
    }

    public function update_profile(Request $request)
    {
        $update = User::where('id', $request->id)->update([
            'name' => $request->name,
            'email' => $request->email,
            'username' => $request->username,
        ]);

        return $request->id;
    }

    public function update_password(Request $request)
    {
        $update = User::where('id', $request->id)->update([
            'password' => bcrypt($request->password)
        ]);

        return $request->id;
    }

    public function delete_users(Request $request)
    {
        $delete = User::where('id', $request->id)->delete();

        return $request->id;
    }
    
    public function update_picture(Request $request){

        $imageName = time().'.'.$request->image->getClientOriginalExtension();
        $request->image->move(public_path('img/upload'), $imageName);
        
        $update = User::where('id', $request->user_id)->update([
            'profile_pic' => $imageName
        ]);

    	return $request->user_id;

    }
}
