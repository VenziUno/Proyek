<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AuthorizationController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\BuildingController;
use App\Http\Controllers\RoleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodoController;
use App\Models\Authorization;

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
Route::middleware(['auth:api'])->group(function () {
    Route::prefix('/authorization')->group(function () {
        Route::get('/', [AuthorizationController::class, 'index'])->name('authorization_view_index');
    });
});
Route::middleware(['auth:api', 'Authorizations'])->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::get('user', [AuthController::class, 'user']);

    Route::prefix('/role')->group(function () {
        Route::get('/', [RoleController::class, 'index'])->name('role_view_index');
        Route::get('/code', [RoleController::class, 'getCode'])->name('role_view_code');
        Route::get('/{id}', [RoleController::class, 'show'])->name('role_view_show');
        Route::post('/', [RoleController::class, 'store'])->name('role_add_store');
        Route::post('/{id}', [RoleController::class, 'update'])->name('role_edit_update');
        Route::delete('/{id}', [RoleController::class, 'destroy'])->name('role_delete_destory');
    });

    Route::prefix('/authorization')->group(function () {

        Route::get('/code', [BuildingController::class, 'getCode'])->name('authorization_view_code');
        Route::get('/{id}', [BuildingController::class, 'show'])->name('authorization_view_show');
        Route::post('/', [BuildingController::class, 'store'])->name('authorization_add_store');
        Route::post('/{id}', [BuildingController::class, 'update'])->name('authorization_edit_update');
        Route::delete('/{id}', [BuildingController::class, 'destroy'])->name('authorization_delete_destory');
    });

    Route::prefix('/building')->group(function () {
        Route::get('/', [BuildingController::class, 'index'])->name('master_building_view_index');
        Route::get('/code', [BuildingController::class, 'getCode'])->name('master_building_view_code');
        Route::get('/{id}', [BuildingController::class, 'show'])->name('master_building_view_show');
        Route::post('/', [BuildingController::class, 'store'])->name('master_building_add_store');
        Route::post('/{id}', [BuildingController::class, 'update'])->name('building_edit_update');
        Route::delete('/{id}', [BuildingController::class, 'destroy'])->name('building_delete_destory');
    });

    Route::prefix('/room')->group(function () {
        Route::get('/', [RoomController::class, 'index'])->name('master_room_view_index');
        Route::get('/code', [RoomController::class, 'getCode'])->name('master_room_view_code');
        Route::get('/{id}', [RoomController::class, 'show'])->name('master_room_view_show');
        Route::post('/', [RoomController::class, 'store'])->name('master_room_add_store');
        Route::post('/{id}', [RoomController::class, 'update'])->name('master_room_edit_update');
        Route::delete('/{id}', [RoomController::class, 'destroy'])->name('master_room_delete_destory');
    });

    Route::get('/todos', [TodoController::class,'index'])->name('dashboard_view_index');
});
