<?php

use App\Http\Controllers\Api\FoodController;
use Illuminate\Support\Facades\Route;

Route::get('/foods', [FoodController::class, 'index']);
Route::get('/foods/{slug}', [FoodController::class, 'show']);
Route::get('/categories', [FoodController::class, 'categories']);
