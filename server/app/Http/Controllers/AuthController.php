<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\Response;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;


class AuthController extends Controller
{
    function getUserDetails()
    {
        $user = request()->user();

        return Response::json([
            'user' => $user
        ], "Success", 200);

    }


    function register()
    {
        /* 

            fullname *
            username *
            email *
            password *
            password Verification *

        */

        $data = request()->only('fullname', 'username', 'email', 'password', 'password_confirmation');

        $check = Validator::make($data, [
            'fullname' => ['required', 'max:255'],
            'username' => ['required', 'max:255', 'unique:users,username', 'regex:/^\S*$/u'],
            'email' => ['email', 'required', 'max:255', 'unique:users,email'],
            'password' => ['min:8', 'max:16', 'required', 'confirmed']
        ]);


        if ($check->fails()) {

            return Response::json([
                'errors' => $check->errors()
            ], "Invalid Register Data", 400);
        }


        User::create([
            'fullname' => $data['fullname'],
            'username' => $data['username'],
            'email' => $data['email'],
            'password' => Hash::make($data['password'])
        ]);

        return Response::json([], 'User registered successfully', 201);
    }


    public function login()
    {

        $data = request()->only('email', 'password');

        $check = Validator::make($data, [
            'email' => ['email', 'required', 'max:255', 'exists:users,email'],
            'password' => ['min:8', 'max:16', 'required']
        ]);


        if ($check->fails()) {

            return Response::json([
                'errors' => $check->errors(),
                'dd' => $data
            ], "Invalid Data Data", 400);
        }


        $userByEmail = User::whereEmail($data['email'])->first();

        $passwordCheck = Hash::check($data['password'], $userByEmail->password);

        if (!$passwordCheck) {
            return Response::json([
                'errors' => [
                    'login' => "Invalid Login Data"
                ]
            ], "Invalid Data Data", 400);
        }

        $token = $userByEmail->createToken('USER_AUTH_TOKEN', [], Carbon::now()->addDays(30))->plainTextToken;


        return Response::json([
            'token' => $token
        ], "User Login Successfully", 200);
    }


    public function logoutUser()
    {
        request()->user()->currentAccessToken()->delete();

        return Response::json([], 'User Logout Successfully', 200);
    }

    public function editProfile()
    {
        $user = request()->user();

        $dataToEdit = ['fullname', 'username', 'location', 'bio', 'website', 'github', 'twitter'];

        $files = ['avatar'];

        if (!request()->hasAny(array_merge($dataToEdit, $files))) {

            return Response::json([
            ], "Nothing to Edit", 200);

        }


        $check = Validator::make(request()->only(array_merge(
            $dataToEdit,
            $files
        )), [
            'fullname' => ['string', 'max:255', 'min:3'],
            'username' => ['string', 'max:255', 'min:3', 'unique:users,username', 'regex:/^\S*$/u'],
            'location' => ['nullable', 'string', 'max:255'],
            'avatar' => ['max:20480', 'image', 'mimes:jpg,png,jpeg,gif,svg,webp'],
            'bio' => ['max:160'],
            'website' => ['max:255', 'url:http,https'],
            'github' => ['max:39', 'url:http,https'],
            'tiwtter' => ['max:50', 'url:http,https'],

        ]);


        if ($check->fails()) {

            return Response::json([
                'errors' => $check->errors()
            ], "Invalid Profile Data", 400);

        }


        $data = [];

        foreach ($dataToEdit as $key) {
            if (request()->has($key)) {
                $data[$key] = request()->input($key);
            }
        }

        foreach ($files as $key) {
            if (request()->hasFile($key)) {
                $path = request()->file($key)->store('users', 'public');
                $data[$key] = $path;
            }
        }


        $user->update($data);

        return Response::json([
            'user' => $user->fresh()
        ], "User Updated Successfully", 200);

    }

}
