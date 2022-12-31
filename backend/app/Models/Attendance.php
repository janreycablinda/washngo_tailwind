<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasFactory;

    public function washboy()
    {
        return $this->hasOne(\App\Models\Washboy::class, 'id', 'washboy_id');
    }
}
