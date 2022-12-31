<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ItemVariation extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    public function unit()
    {
        return $this->hasOne(\App\Models\Unit::class, 'id', 'unit_id');
    }
}
