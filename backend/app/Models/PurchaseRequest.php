<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseRequest extends Model
{
    public static function boot()
    {
        parent::boot();

        static::creating(function($model) {
            $model->pr_no_inc = PurchaseRequest::where('branch_id', auth()->user()->id)->max('pr_no_inc') +1;
        });
    }

    use HasFactory;
}
