<?php

use App\Http\Controllers\AmbienteController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Historico_reservaController;
use App\Http\Controllers\ReservaController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('login', [LoginController::class, 'login']);
Route::post('logout', [LoginController::class, 'logout']);

Route::post('register', [RegisterController::class, 'create']);

Route::prefix('user')->group(function () {
    Route::get('/', [UserController::class, 'index']);
    Route::put('{id}', [UserController::class, 'update']);
    Route::delete('{id}', [UserController::class, 'destroy']);
});


Route::prefix('ambiente')->group(function () {
    Route::get('/', [AmbienteController::class, 'index'])->name('ambiente.index');
    Route::get('create', [AmbienteController::class, 'create'])->name('ambiente.create');
    Route::get('{id}', [AmbienteController::class, 'show'])->name('ambiente.show');
    Route::get('{id}/edit', [AmbienteController::class, 'edit'])->name('ambiente.edit');
    Route::post('/', [AmbienteController::class, 'store'])->name('ambiente.store');
    Route::put('{id}', [AmbienteController::class, 'update'])->name('ambiente.update');
    Route::delete('{id}', [AmbienteController::class, 'destroy'])->name('ambiente.destroy');
});

Route::prefix('reserva')->group(function () {
    Route::get('/', [ReservaController::class, 'index'])->name('reserva.index');
    Route::get('create', [ReservaController::class, 'create'])->name('reserva.create');
    Route::get('{id}', [ReservaController::class, 'show'])->name('reserva.show');
    Route::get('{id}/edit', [ReservaController::class, 'edit'])->name('reserva.edit');
    Route::post('/', [ReservaController::class, 'store'])->name('reserva.store');
    Route::put('{id}', [ReservaController::class, 'update'])->name('reserva.update');
    Route::delete('{id}', [ReservaController::class, 'destroy'])->name('reserva.destroy');
});

Route::prefix('historico_reserva')->group(function () {
    Route::get('/', [Historico_reservaController::class, 'index'])->name('historico_reserva.index');
    Route::get('create', [Historico_reservaController::class, 'create'])->name('historico_reserva.create');
    Route::get('{id}', [Historico_reservaController::class, 'show'])->name('historico_reserva.show');
    Route::get('{id}/edit', [Historico_reservaController::class, 'edit'])->name('historico_reserva.edit');
    Route::post('/', [Historico_reservaController::class, 'store'])->name('historico_reserva.store');
    Route::put('{id}', [Historico_reservaController::class, 'update'])->name('historico_reserva.update');
    Route::delete('{id}', [Historico_reservaController::class, 'destroy'])->name('historico_reserva.destroy');
});
