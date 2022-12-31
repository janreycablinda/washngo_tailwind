<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Stockout;

class Stockout extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    public static function boot()
    {
        parent::boot();

        static::creating(function($model) {
            $count = Stockout::where('branch_id', auth()->user()->branch_id)->max('so_no_inc') + 1;
            $model->so_no_inc = $count;
            $model->so_no = "SO-00" . $count;
        });
    }

    public function user()
    {
        return $this->hasOne(\App\Models\User::class, 'id', 'user_id');
    }

    public function branch()
    {
        return $this->hasOne(\App\Models\Branch::class, 'id', 'branch_id');
    }

    public function personnel()
    {
        return $this->hasOne(\App\Models\Washboy::class, 'id', 'washboy_id');
    }

    public function items()
    {
        return $this->hasMany(\App\Models\StockoutItem::class, 'stockout_id', 'id');
    }
}
