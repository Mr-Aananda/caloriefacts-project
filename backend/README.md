# CalorieFacts — Laravel API (optional backend)

The Nuxt frontend works fully on its own using the static `app/data/foods.json`
file — you do NOT need this backend to launch and get AdSense-approved.

Use this backend later if you want:
- An admin panel to add/edit foods without redeploying the frontend
- A database-backed API instead of a static JSON file
- To scale past a few hundred food entries

## Setup

This folder contains only the **custom application files** (migration, model,
seeder, controller, routes) — not a full Laravel installation, since Composer
isn't available in the environment that generated this project. To use it:

```bash
composer create-project laravel/laravel backend-app
cd backend-app
```

Then copy these files into the new project, overwriting where needed:

```
app/Models/Food.php                         -> app/Models/Food.php
app/Http/Controllers/Api/FoodController.php -> app/Http/Controllers/Api/FoodController.php
database/migrations/2026_01_01_000000_create_foods_table.php -> database/migrations/
database/seeders/FoodSeeder.php             -> database/seeders/FoodSeeder.php
database/seeders/DatabaseSeeder.php         -> database/seeders/DatabaseSeeder.php
database/data/foods.json                    -> database/data/foods.json
routes/api.php                              -> routes/api.php (merge/replace)
```

Then:

```bash
cp .env.example .env
php artisan key:generate
# set your DB_* credentials in .env, then:
php artisan migrate
php artisan db:seed
php artisan serve
```

## Endpoints

- `GET /api/foods` — paginated list, supports `?search=` and `?category=`
- `GET /api/foods/{slug}` — single food
- `GET /api/categories` — list of category names

## Keeping data in sync

`database/data/foods.json` is the same dataset used by the Nuxt frontend
(`frontend/app/data/foods.json`). If you add foods here, copy the file over to
the frontend too (or later refactor the frontend to fetch from this API
instead of the static JSON — swap the `useFoods()` composable's data source).
