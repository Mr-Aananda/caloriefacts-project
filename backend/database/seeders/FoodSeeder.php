<?php

namespace Database\Seeders;

use App\Models\Food;
use Illuminate\Database\Seeder;

class FoodSeeder extends Seeder
{
    /**
     * Seeds the foods table from database/data/foods.json.
     * This is the SAME dataset used to build the Nuxt frontend's static
     * app/data/foods.json, so both stay in sync. Re-run with `--force` to
     * refresh values if you edit the JSON file later.
     */
    public function run(): void
    {
        $path = database_path('data/foods.json');
        $items = json_decode(file_get_contents($path), true);

        foreach ($items as $item) {
            Food::updateOrCreate(
                ['slug' => $item['slug']],
                [
                    'name' => $item['name'],
                    'category' => $item['category'],
                    'preparation' => $item['preparation'] ?? null,
                    'serving_size_g' => $item['servingSizeG'] ?? 100,
                    'calories' => $item['calories'],
                    'protein_g' => $item['protein_g'],
                    'carbs_g' => $item['carbs_g'],
                    'fat_g' => $item['fat_g'],
                    'fiber_g' => $item['fiber_g'] ?? 0,
                    'sugar_g' => $item['sugar_g'] ?? 0,
                    'sodium_mg' => $item['sodium_mg'] ?? 0,
                    'tags' => $item['tags'] ?? [],
                ]
            );
        }

        $this->command?->info(count($items) . ' foods seeded.');
    }
}
