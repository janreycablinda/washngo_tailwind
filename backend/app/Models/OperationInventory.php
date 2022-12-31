<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OperationInventory extends Model
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
}
