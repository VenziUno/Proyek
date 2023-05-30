<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\BuildingController;
use App\Http\Controllers\RoleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodoController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

// Route::middleware(['auth:api'])->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::get('user', [AuthController::class, 'user']);
    Route::prefix('/building')->group(function () {
        Route::get('/', [BuildingController::class, 'index']);
        Route::get('/code', [BuildingController::class, 'getCode']);
        Route::get('/{id}', [BuildingController::class, 'show']);
        Route::post('/', [BuildingController::class, 'store']);
        Route::post('/{id}', [BuildingController::class, 'update']);
        Route::delete('/{id}', [BuildingController::class, 'destroy']);
    });

    Route::prefix('/role')->group(function () {
        Route::get('/', [RoleController::class, 'index']);
        Route::get('/code', [RoleController::class, 'getCode']);
        Route::get('/{id}', [RoleController::class, 'show']);
        Route::post('/', [RoleController::class, 'store']);
        Route::post('/{id}', [RoleController::class, 'update']);
        Route::delete('/{id}', [RoleController::class, 'destroy']);
    });

    Route::prefix('/room')->group(function () {
        Route::get('/', [RoomController::class, 'index']);
        Route::get('/code', [RoomController::class, 'getCode']);
        Route::get('/{id}', [RoomController::class, 'show']);
        Route::post('/', [RoomController::class, 'store']);
        Route::post('/{id}', [RoomController::class, 'update']);
        Route::delete('/{id}', [RoomController::class, 'destroy']);
    });

    Route::apiResource('todos', TodoController::class);
// });
