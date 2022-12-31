<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ItemCategory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Item extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    public function item_variations()
    {
        return $this->hasMany(\App\Models\ItemVariation::class, 'item_id', 'id');
    }

    public function inventory()
    {
        return $this->hasOne(\App\Models\Inventory::class, 'item_id', 'id');
    }

    public function category()
    {
        return $this->hasOne(\App\Models\Item_Category::class, 'id', 'category_id');
    }

    public function user()
    {
        return $this->hasOne(\App\Models\User::class, 'id', 'user_id');
    }

    public function stockin_temp()
    {
        return $this->hasMany(\App\Models\Stockin_temp::class, 'item_id', 'id');
    }

    public function stockout_temp()
    {
        return $this->hasMany(\App\Models\Stockout_temp::class, 'item_id', 'id');
    }
}
