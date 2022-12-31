<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    public function variations()
    {
        return $this->hasMany(\App\Models\Variation::class, 'services_id', 'id');
    }
}
