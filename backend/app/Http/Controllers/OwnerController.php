<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Owner;

class OwnerController extends Controller
{
    public function get_owners()
    {
        $get = Owner::all();

        return $get;
    }

    public function add_owner(Request $request)
    {
        $add = new Owner;
        $add->name = $request->form['name'];
        $add->address = $request->form['address'];
        $add->contact_no = $request->form['contact_no'];
        $add->company_name = $request->form['company_name'];
        $add->status = 'Active';
        $add->save();

        return $add;
    }

    public function delete_owner(Request $request)
    {
        $delete = Owner::where('id', $request->id)->delete();

        return $request->id;
    }

    public function update_owner(Request $request)
    {
        $update = Owner::where('id', $request->form['id'])->update([
            'name' => $request->form['name'],
            'address' => $request->form['address'],
            'company_name' => $request->form['company_name'],
            'contact_no' => $request->form['contact_no'],
        ]);

        return $request->all();
    }
}
