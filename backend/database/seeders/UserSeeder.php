<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\User::factory()->create([
            'name' => 'Test User',
            'email' => 'pendicai3@example.com',
            'password' => bcrypt('pendichu#210'),
            'role_id' => 'RU001',
        ]);
    }
}
