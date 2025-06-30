<?php

namespace App\Repositories;

use app\Models\user;

class UserRepo{

    //all users
    public function getAll(){
        return user::all();    
    }
}