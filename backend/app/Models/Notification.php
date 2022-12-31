<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    public function reads()
    {
        return $this->hasMany(\App\Models\Read::class, 'notification_id', 'id');
    }
}
