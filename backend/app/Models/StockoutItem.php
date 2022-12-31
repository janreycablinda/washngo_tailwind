<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StockoutItem extends Model
{
    use HasFactory;

    public function stockout()
    {
        return $this->hasOne(\App\Models\Stockout::class, 'id', 'stockout_id');
    }

    public function item_variations()
    {
        return $this->hasOne(\App\Models\ItemVariation::class, 'id', 'variation_id');
    }

    public function items()
    {
        return $this->hasOne(\App\Models\Item::class, 'id', 'item_id');
    }
}
