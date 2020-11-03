<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Validator;
use Hash;
use Auth;

class UsersController extends Controller
{
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => 'unique:users'
        ]);

        if(!$validator->fails()){
            $user = User::create([
                'name' => $request->username,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);
            if($user){
                return response()->json(['status' => 200, 'message' => 'Registered Successfully!']);
            }
        } else {
            $error = $validator->errors()->first();
            return response()->json(['status' => 422, 'error' => $error]);
        }
    }

    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if($user){
            if(Hash::check($request->password, $user->password)){
                $remember_me  = ($request->remember == 'on') ? true : false;
                if (Auth::attempt(['email' => $request->email, 'password' => $request->password], $remember_me)) {
                    Auth::login($user, $remember_me);
                    return response()->json(['status' => 200, 'message' => 'Logged In Successfully!', "username" => $user->name]);
                } else {
                    return response()->json(['status' => 404, 'message' => 'Something went wrong']);
                }
            } else {
                return response()->json(['status' => 422, 'error' => 'Incorrect Password for the given email']);
            }
        } else {
            return response()->json(['status' => 422, 'error' => 'Incorrect Email Address']);
        }
    }

    public function isLoggedIn()
    {
        if(!Auth::guest()) {
            return response()->json(['username' => auth()->user()->name]);
        } else {
            return response()->json(false);
        }
    }

    public function logout()
    {
        Auth::logout();
        return response()->json(["message" => "Logged Out Successfully!"]);
    }
}
