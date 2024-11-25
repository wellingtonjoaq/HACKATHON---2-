<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\EspacoController;
use App\Http\Controllers\Historico_reservaController;
use App\Http\Controllers\ReservaController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use App\Http\Controllers\NotificacaoController;
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
Route::prefix('espacos')->group(function () {
    Route::get('/', [EspacoController::class, 'index']);
    Route::get('create', [EspacoController::class, 'create']);
    Route::get('{id}', [EspacoController::class, 'show']);
    Route::get('{id}/edit', [EspacoController::class, 'edit']);
    Route::post('/', [EspacoController::class, 'store']);
    Route::put('{id}', [EspacoController::class, 'update']);
    Route::delete('{id}', [EspacoController::class, 'destroy']);
});

Route::prefix('reservas')->group(function () {
    Route::get('/', [ReservaController::class, 'index']);
    Route::get('create', [ReservaController::class, 'create']);
    Route::get('{id}', [ReservaController::class, 'show']);
    Route::get('{id}/edit', [ReservaController::class, 'edit']);
    Route::post('/', [ReservaController::class, 'store']);
    Route::put('{id}', [ReservaController::class, 'update']);
    Route::delete('{id}', [ReservaController::class, 'destroy']);
});

Route::prefix('historico_reserva')->group(function () {
    Route::get('/', [Historico_reservaController::class, 'index']);
    Route::get('create', [Historico_reservaController::class, 'create']);
    Route::get('{id}', [Historico_reservaController::class, 'show']);
    Route::get('{id}/edit', [Historico_reservaController::class, 'edit']);
    Route::post('/', [Historico_reservaController::class, 'store']);
    Route::put('{id}', [Historico_reservaController::class, 'update']);
    Route::delete('{id}', [Historico_reservaController::class, 'destroy']);
});

Route::prefix('notificacao')->group(function () {
    Route::get('/', [NotificacaoController::class, 'index']);
    Route::post('/', [NotificacaoController::class, 'store']);
    Route::put('{id}', [NotificacaoController::class, 'update']);
    Route::delete('{id}', [NotificacaoController::class, 'destroy']);
});
