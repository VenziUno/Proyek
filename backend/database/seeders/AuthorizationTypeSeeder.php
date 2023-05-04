<?php

namespace Database\Seeders;

use App\Models\AuthorizationType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AuthorizationTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        AuthorizationType::truncate();
        AuthorizationType::insert([
            [
                'name' => 'view',
            ],
            [
                'name' => 'add',
            ],
            [
                'name' => 'edit',
            ],
            [
                'name' => 'delete',
            ],
        ]);
    }
}
