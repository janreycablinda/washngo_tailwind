<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PermissionRole extends Model
{
    use HasFactory;

    public function permission(){
        return $this->hasOne(\App\Models\Permission::class, 'id', 'permission_id');
    }
}
