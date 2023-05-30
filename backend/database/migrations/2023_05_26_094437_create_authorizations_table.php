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
        Schema::create('authorizations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('role_id');
            $table->unsignedBigInteger('menu_id');
            $table->unsignedBigInteger('sub_menu_id');
            $table->unsignedBigInteger('authorization_type_id');
            $table->timestamps();
            $table->softDeletes();
            $table->foreign('role_id')->references('id')->on('roles');
            $table->foreign('menu_id')->references('id')->on('menus');
            $table->foreign('sub_menu_id')->references('id')->on('sub_menus');
            $table->foreign('authorization_type_id')->references('id')->on('authorization_types');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('authorizations');
    }
};
