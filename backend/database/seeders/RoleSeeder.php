<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::truncate();
        Role::insert([
            [
                'id' => 'RU001',
                'name' => 'Master Administrator',
                'status' => 1,
            ],
            [
                'id' => 'RU002',
                'name' => 'Administrator',
                'status' => 1,
            ],
        ]);
    }
}
