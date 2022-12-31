<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Permission_Child extends Model
{
    use HasFactory;

    public function permissions_item()
    {
        return $this->hasMany(\App\Models\Permission_Item::class, 'child_id', 'id');
    }
}
