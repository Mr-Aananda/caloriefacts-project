<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Food extends Model
{
    protected $fillable = [
        'slug',
        'name',
        'category',
        'preparation',
        'serving_size_g',
        'calories',
        'protein_g',
        'carbs_g',
        'fat_g',
        'fiber_g',
        'sugar_g',
        'sodium_mg',
        'tags',
    ];

    protected $casts = [
        'tags' => 'array',
    ];
}
