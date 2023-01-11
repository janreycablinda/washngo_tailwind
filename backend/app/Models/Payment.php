<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Payment extends Model
{
    use HasFactory, SoftDeletes;

    protected $casts = [ 
        'discounted' => 'integer',
        'changed' => 'integer',
        'sub_total' => 'integer',
        'total' => 'integer',
        'amount' => 'integer',
    ];
}
