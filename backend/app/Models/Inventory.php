<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function item()
    {
        return $this->hasOne(\App\Models\Item::class, 'id', 'item_id');
    }

    public function branch()
    {
        return $this->hasOne(\App\Models\Branch::class, 'id', 'branch_id');
    }

    public function variants()
    {
        return $this->hasMany(\App\Models\ItemVariation::class, 'item_id', 'item_id');
    }
}
