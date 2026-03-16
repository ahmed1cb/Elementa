<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;



Route::prefix('/auth')->controller(AuthController::class)->group(function () {

    Route::middleware('auth.elementa')->group(function () {
        Route::get('/user', 'getUserDetails');
        Route::post('/logout', 'logoutUser');
        Route::post('/edit', 'editProfile');

    });
    Route::post('/register', 'register');
    Route::post('/login', 'login');




});