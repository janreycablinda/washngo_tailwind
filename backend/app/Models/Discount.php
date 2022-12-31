<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Discount extends Model
{
    use HasFactory;

    public function services()
    {
        return $this->hasOne(\App\Models\Service::class, 'id', 'services_id');
    }
}
