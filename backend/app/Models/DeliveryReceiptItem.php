<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeliveryReceiptItem extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function variation()
    {
        return $this->hasOne(\App\Models\ItemVariation::class, 'id', 'variation_id');
    }

    public function item()
    {
        return $this->hasOne(\App\Models\Item::class, 'id', 'item_id');
    }
}
