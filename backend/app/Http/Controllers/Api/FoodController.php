<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Food;
use Illuminate\Http\Request;

class FoodController extends Controller
{
    // GET /api/foods?search=banana&category=Fruits
    public function index(Request $request)
    {
        $query = Food::query();

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->string('search') . '%');
        }

        if ($request->filled('category')) {
            $query->where('category', $request->string('category'));
        }

        return $query->orderBy('name')->paginate(30);
    }

    // GET /api/foods/{slug}
    public function show(string $slug)
    {
        $food = Food::where('slug', $slug)->firstOrFail();

        return response()->json($food);
    }

    // GET /api/categories
    public function categories()
    {
        return Food::select('category')
            ->distinct()
            ->orderBy('category')
            ->pluck('category');
    }
}
