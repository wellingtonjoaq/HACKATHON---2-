<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\NotificacaoController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//Buscar no banco usuario autenticado
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('login', [LoginController::class, 'login']);
Route::post('logout', [LoginController::class, 'logout']);

//registrar um usuario no banco
Route::post('register', [RegisterController::class, 'create']);

Route::prefix('user')->group(function () {
    Route::get('/', [UserController::class, 'index']);
    Route::get('{id}', [UserController::class, 'show']);
    Route::put('{id}', [UserController::class, 'update']);
    Route::delete('{id}', [UserController::class, 'destroy']);
});

Route::prefix('notificacao')->group(function () {
    Route::get('/', [NotificacaoController::class, 'index']);
    Route::post('/', [NotificacaoController::class, 'store']);
    Route::put('{id}', [NotificacaoController::class, 'update']);
    Route::delete('{id}', [NotificacaoController::class, 'destroy']);
});
