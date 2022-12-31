<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Transaction extends Model
{
    use HasFactory, SoftDeletes;

    public function property()
    {
        return $this->hasOne(\App\Models\Property::class, 'id', 'property_id');
    }

    public function member()
    {
        return $this->hasOne(\App\Models\Member::class, 'id', 'member_id');
    }

    public function payment()
    {
        return $this->hasOne(\App\Models\Payment::class, 'transaction_id', 'id');
    }

    public function vehicle()
    {
        return $this->hasOne(\App\Models\Vehicle::class, 'id', 'vehicle_id');
    }

    public function temp_trans()
    {
        return $this->hasMany(\App\Models\Temp_tran::class, 'transaction_id', 'id');
    }

    public function labors()
    {
        return $this->hasMany(\App\Models\Labor::class, 'transaction_id', 'id');
    }

    public function services()
    {
        return $this->hasMany(\App\Models\Temp_tran::class, 'transaction_id', 'id');
    }

    public function user()
    {
        return $this->hasOne(\App\Models\User::class, 'id', 'user_id');
    }

    public function deleted_by()
    {
        return $this->hasOne(\App\Models\User::class, 'id', 'deleted_user_id');
    }

}
