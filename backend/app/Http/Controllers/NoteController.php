<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Note;
use Carbon\Carbon;

class NoteController extends Controller
{

    public function find_note($id)
    {
        $get = Note::where('member_id', $id)->get();

        return $get;
    }

    public function get_note($id){
        $get = Note::where('user_id', $id)->where('location', 'dashboard')->orderBy('datetime', 'ASC')->get();

        return $get;
    }

    public function add_note(Request $request)
    {
        if($request->location){
            $add = new Note;
            $add->member_id = null;
            $add->user_id = $request->id;
            $add->message = $request->message;
            $add->location = 'dashboard';
            $add->datetime = $request->date;
            $add->save();

            return $request->id;
        }else{
            $add = new Note;
            $add->member_id = $request->member_id;
            $add->user_id = $request->id;
            $add->message = $request->message;
            $add->location = 'transaction';
            $add->datetime = Carbon::now();
            $add->save();

            return $request->member_id;
        }
        
    }

    public function delete_note(Request $request)
    {
        if($request->member_id){
            $delete = Note::where('id', $request->id)->delete();

            return $request->member_id;
        }else{
            $delete = Note::where('id', $request->id)->delete();

            return $request->user_id;
        }
        
    }
}
