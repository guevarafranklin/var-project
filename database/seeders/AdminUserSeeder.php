<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'tecguevara@gmail.com'],
            [
                'name' => 'Super Admin',
                'full_name' => 'Super Admin',
                'position' => 'Administrator',
                'country' => null,
                'phone' => null,
                'password' => 'Guevara1602',
                'email_verified_at' => now(),
                'is_admin' => true,
            ]
        );
    }
}
