<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function permissions_child()
    {
        return $this->hasMany(\App\Models\Permission_Child::class, 'parent_id', 'id');
    }
}
