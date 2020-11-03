<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::resource('/contact', 'ContactController');

Route::get('/migrate', 'ContactController@migrate');

Route::post('/register', 'UsersController@register');
Route::post('/login', 'UsersController@login');
Route::get('/isLoggedIn', 'UsersController@isLoggedIn');
Route::post("/logout", "UsersController@logout");



Route::get('/{path?}', function () {
    return view('app');
})->where('path', '.*');


