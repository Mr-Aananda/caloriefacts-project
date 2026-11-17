<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('foods', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('category');
            $table->string('preparation')->nullable();
            $table->unsignedInteger('serving_size_g')->default(100);
            $table->float('calories');
            $table->float('protein_g');
            $table->float('carbs_g');
            $table->float('fat_g');
            $table->float('fiber_g')->default(0);
            $table->float('sugar_g')->default(0);
            $table->float('sodium_mg')->default(0);
            $table->json('tags')->nullable();
            $table->timestamps();

            $table->index('category');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('foods');
    }
};
