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
                'name' => 'Role',
                'menu_id' => 2,
                'route_name' => 'role'
            ],
            [
                'name' => 'Admin',
                'menu_id' => 2,
                'route_name' => 'admin'
            ],
            [
                'name' => 'Authorizatiom',
                'menu_id' => 2,
                'route_name' => 'authorization'
            ],
        ]);
    }
}
