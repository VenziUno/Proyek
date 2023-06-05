<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AuthorizationController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\BuildingController;
use App\Http\Controllers\MenuController;
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

Route::post('login', [AuthController::class, 'login']);

Route::middleware(['auth:api'])->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::get('menu', [MenuController::class, 'index']);

    Route::middleware(['Authorizations'])->group(function () {
        Route::prefix('/role')->group(function () {
            Route::get('/', [RoleController::class, 'index'])->name('setting_role_view_index');
            Route::get('/code', [RoleController::class, 'getCode'])->name('settings_view_code');
            Route::get('/{id}', [RoleController::class, 'show'])->name('role_view_show');
            Route::post('/', [RoleController::class, 'store'])->name('role_add_store');
            Route::post('/{id}', [RoleController::class, 'update'])->name('role_update_update');
            Route::delete('/{id}', [RoleController::class, 'destroy'])->name('role_delete_destory');
        });

        Route::prefix('/admin')->group(function () {
            Route::get('/', [AuthController::class, 'index'])->name('setting_admin_view_index');
            Route::get('/{id}', [AuthController::class, 'show'])->name('setting_admin_view_show');
            Route::post('/', [AuthController::class, 'store'])->name('setting_admin_add_store');
            Route::post('/{id}', [AuthController::class, 'update'])->name('setting_admin_update_update');
            Route::delete('/{id}', [AuthController::class, 'destory'])->name('setting_admin_delete_destory');
        });

        Route::prefix('/authorization')->group(function () {
            Route::get('/', [AuthorizationController::class, 'index'])->name('setting_authorization_view_index');
        });
    });
});
