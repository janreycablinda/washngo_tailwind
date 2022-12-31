<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeliveryReceipt extends Model
{
    use HasFactory;

    protected $guarded = [];

    public static function boot()
    {
        parent::boot();

        static::creating(function($model) {
            $model->dr_no_inc = DeliveryReceipt::where('branch_id', auth()->user()->branch_id)->max('dr_no_inc') +1;
            $added = DeliveryReceipt::where('branch_id', auth()->user()->branch_id)->max('dr_no_inc') +1;
            $model->dr_no = 'DR-000' . $added;
        });
    }

    public function items()
    {
        return $this->hasMany(\App\Models\DeliveryReceiptItem::class, 'dr_id', 'id');
    }

    public function branch()
    {
        return $this->hasOne(\App\Models\Branch::class, 'id', 'branch_id');
    }

    public function purchase_order()
    {
        return $this->hasOne(\App\Models\PurchaseOrder::class, 'id', 'po_id');
    }

    public function payments()
    {
        return $this->hasMany(\App\Models\PurchasePayment::class, 'dr_id', 'id');
    }

    public function user()
    {
        return $this->hasOne(\App\Models\User::class, 'id', 'user_id');
    }
}
