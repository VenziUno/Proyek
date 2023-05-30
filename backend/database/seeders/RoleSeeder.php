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
                'name' => 'Master',
            ],
            [
                'id' => 'RU002',
                'name' => 'Admin',
            ],
        ]);
    }
}
