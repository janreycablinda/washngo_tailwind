<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PurchaseOrder extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    public static function boot()
    {
        parent::boot();

        static::creating(function($model) {
            $model->po_no_inc = PurchaseOrder::where('branch_id', auth()->user()->branch_id)->max('po_no_inc') +1;
        });
    }

    public function items()
    {
        return $this->hasMany(\App\Models\PurchaseOrderItem::class, 'po_id', 'id');
    }

    public function branch()
    {
        return $this->hasOne(\App\Models\Branch::class, 'id', 'branch_id');
    }

    public function user()
    {
        return $this->hasOne(\App\Models\User::class, 'id', 'user_id');
    }

    public function from()
    {
        return $this->hasOne(\App\Models\Company::class, 'id', 'company_id');
    }

    public function to()
    {
        return $this->hasOne(\App\Models\Branch::class, 'id', 'to_id');
    }
}
