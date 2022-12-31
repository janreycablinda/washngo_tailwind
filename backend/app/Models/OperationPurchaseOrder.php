<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OperationPurchaseOrder extends Model
{
    use HasFactory;

    protected $guarded = [];

    public static function boot()
    {
        parent::boot();

        static::creating(function($model) {
            $model->po_no_inc = OperationPurchaseOrder::where('branch_id', auth()->user()->branch_id)->max('po_no_inc') +1;
        });
    }

    public function items()
    {
        return $this->hasMany(\App\Models\OperationPurchaseOrderItem::class, 'po_id', 'id');
    }

    public function branch()
    {
        return $this->hasOne(\App\Models\Branch::class, 'id', 'branch_id');
    }

    public function user()
    {
        return $this->hasOne(\App\Models\User::class, 'id', 'user_id');
    }
}
