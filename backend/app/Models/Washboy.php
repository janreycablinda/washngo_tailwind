<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Washboy extends Model
{
    use HasFactory, SoftDeletes;

    public function personel_cat()
    {
        return $this->hasOne(\App\Models\Personel_category::class, 'id', 'personel_id');
    }

    public function attendance()
    {
        return $this->hasMany(\App\Models\Attendance::class, 'washboy_id', 'id');
    }

    public function shift()
    {
        return $this->hasOne(\App\Models\Shift::class, 'id', 'shift_id');
    }
    
}
