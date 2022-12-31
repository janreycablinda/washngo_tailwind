<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Branch;

class BranchController extends Controller
{
    public function get_branch()
    {
        $get = Branch::with('owner')->get();

        return $get;
    }

    public function add_branch(Request $request)
    {
        $add = new Branch;
        $add->branch_address = $request->form['branch_address'];
        $add->contact_no = $request->form['contact_no'];
        $add->owners_id = $request->form['owners_id']['value'];
        $add->settings_id = 1;
        $add->status = "Active";
        $add->save();

        $get = Branch::with('owner')->find($add->id);
        return  $get;
    }

    public function delete_branch(Request $request)
    {
        $delete = Branch::where('id', $request->id)->delete();

        return $request->id;
    }

    public function update_branch(Request $request)
    {
        $update = Branch::where('id', $request->form['id'])->update([
            'branch_address' => $request->form['branch_address'],
            'contact_no' => $request->form['contact_no'],
            'owners_id' => $request->form['owners_id']
        ]);
    }
}
