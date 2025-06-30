<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
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
        try {
            $users = $this->userRepo->getAll();
            return response()->json($users);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
