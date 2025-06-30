<?php

namespace App\Repositories;

use App\Models\User;

class UserRepo{

    //all users
    public function getAll(){
        return User::all();    
    }
}