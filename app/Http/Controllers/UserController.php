<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\user;
use App\Repositories\UserRepo;

class UserController extends Controller
{
    // public function index(){
    //     //Returning all users as json
    //     return response()->json(user::all());
    // }

    protected $userRepo;

    public function __construct(UserRepo $userRepo){
        $this->userRepo = $userRepo;
    }

    public function index(){
        return response()->json($this->userRepo->getAll());
    }
}
