<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Setting;

class SettingController extends Controller
{
    public function membership_fee(){
        $get = Setting::where('setting_name', 'membership_fee')->first();
        return response()->json($get->value);
    }

    public function renewal_fee(){
        $get = Setting::where('setting_name', 'renewal_fee')->first();
        return response()->json($get->value);
    }
}
