<?php

namespace Database\Seeders;

use App\Models\SubMenu;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubMenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SubMenu::truncate();
        SubMenu::insert([
            [
                'name' => 'Building',
                'menu_id' => 2,
            ],
            [
                'name' => 'Room',
                'menu_id' => 2,
            ],
        ]);
    }
}
