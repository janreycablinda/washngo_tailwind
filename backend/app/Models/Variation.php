<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Variation extends Model
{
    use HasFactory;

    protected $casts = [ 
        'price' => 'integer', 
    ];

    public function size()
    {
        return $this->hasOne(\App\Models\Size::class, 'id', 'size_id');
    }

    public function services()
    {
        return $this->hasOne(\App\Models\Service::class, 'id', 'services_id');
    }
}
