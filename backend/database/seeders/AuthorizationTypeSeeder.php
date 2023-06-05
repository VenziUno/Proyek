<?php

namespace Database\Seeders;

use App\Models\AuthorizationTypes;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AuthorizationTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        AuthorizationTypes::truncate();
        AuthorizationTypes::insert([
            [
                'name' => 'view',
            ],
            [
                'name' => 'add',
            ],
            [
                'name' => 'update',
            ],
            [
                'name' => 'delete',
            ],
        ]);
    }
}
