<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mouvement extends Model
{
    use HasFactory;

    protected $fillable = [
        'n_serie',
        'date_mouvement',
        'service',
        'nature',
        'demande',
        'quantité',
    ];
}
