<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Branch extends Model
{
    use HasFactory;

    public function owner()
    {
        return $this->hasOne(\App\Models\Owner::class, 'id', 'owners_id');
    }
}
