<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Personel_category;

class PersonelCategoryController extends Controller
{
    public function get_personelcategory()
    {
        $get = Personel_category::orderBy('name', 'ASC')->get();

        return $get;
    }
}
