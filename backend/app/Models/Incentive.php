<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Incentive extends Model
{
    use HasFactory;

    public function shift()
    {
        return $this->hasOne(\App\Models\Shift::class, 'id', 'shift_id');
    }

    public function services()
    {
        return $this->hasOne(\App\Models\Service::class, 'id', 'services_id');
    }
}
