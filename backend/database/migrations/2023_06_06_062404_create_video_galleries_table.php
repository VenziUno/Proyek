<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('video_galleries', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('file');
            $table->string('title');
            $table->text('desc');
            $table->string('category_galleries_id');
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('category_galleries_id')->references('id')->on('category_galleries')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('video_galleries');
    }
};
