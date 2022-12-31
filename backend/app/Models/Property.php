<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Property extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    public function vehicle()
    {
        return $this->hasOne(\App\Models\Vehicle::class, 'id', 'vehicle_id');
    }

    public function transactions()
    {
        return $this->hasMany(\App\Models\Transaction::class, 'property_id', 'id');
    }
    
}
