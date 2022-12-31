<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Temp_tran extends Model
{
    use HasFactory;

    public function services()
    {
        return $this->hasOne(\App\Models\Service::class, 'id', 'services_id');
    }

    public function variation()
    {
        return $this->hasOne(\App\Models\Variation::class, 'id', 'variation_id');
    }

    public function transaction()
    {
        return $this->hasOne(\App\Models\Transaction::class, 'id', 'transaction_id');
    }
}
