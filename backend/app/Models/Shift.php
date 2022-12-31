<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shift extends Model
{
    use HasFactory;

    public function benefits()
    {
        return $this->hasMany(\App\Models\Benefit::class, 'shift_id', 'id');
    }

    public function incentives()
    {
        return $this->hasMany(\App\Models\Incentive::class, 'shift_id', 'id');
    }
}
