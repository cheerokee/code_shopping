<?php

use CodeShopping\Models\User;
use CodeShopping\Models\UserProfile;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        File::deleteDirectory(UserProfile::photoPath(),true);

        factory(User::class, 1)
            ->create([
                'email' => 'admin@user.com',
            ])->each(function($user){
                Model::reguard();
                $user->updateWithProfile([
                    'phone_number' => '+16505551234',
                    'photo' => $this->getAdminPhoto()
                ]);
                Model::unguard();
            });

        factory(User::class, 1)->create([
            'email' => 'customer@user.com',
            'role' => User::ROLE_CUSTOMER
        ])->each(function($user) {
            $user->updateWithProfile([
                'phone_number' => '+16505551234'
            ]);
        });

        factory(User::class, 50)->create([
            'role' => User::ROLE_CUSTOMER
        ]);
    }

    public function getAdminPhoto(){
        return new UploadedFile(
            storage_path('app/faker/users/jonas.jpg'),
            str_random(16) . '.jpg'
        );
    }
}
