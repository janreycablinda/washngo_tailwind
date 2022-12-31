<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notification;
use App\Models\Read;

class NotificationController extends Controller
{
    public function get_notification($id){
        $get = Notification::with('reads')->where('branch_id', $id)->latest()->take(10)->get();

        return response()->json($get);
    }

    public function update_notification(Request $request){
        $update = Notification::where('branch_id', $request->branch_id)->update([
            'status' => 'read'
        ]);

        $get = Notification::with('reads')->where('branch_id', $request->branch_id)->latest()->take(10)->get();

        return response()->json($get);
    }

    public function read_notification(Request $request){
        $new = new Read;
        $new->user_id = $request->user_id;
        $new->notification_id = $request->notification_id;
        $new->save();

        return Notification::with('reads')->where('id', $request->notification_id)->first();
    }  
}
