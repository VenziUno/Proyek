<?php

namespace Database\Seeders;

use App\Models\Menu;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Menu::truncate();
        Menu::insert([
            [
                'name' => 'Dashboard',
                'route_name' => 'dashboard',
            ],
            [
                'name' => 'Settings',
                'route_name' => 'setting',
            ],
        ]);
    }
}
