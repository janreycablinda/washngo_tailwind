<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Labor extends Model
{
    use HasFactory;

    public function washboy()
    {
        return $this->hasOne(\App\Models\Washboy::class, 'id', 'washboy_id');
    }

    public function transaction()
    {
        return $this->hasOne(\App\Models\Transaction::class, 'id', 'transaction_id');
    }
}
