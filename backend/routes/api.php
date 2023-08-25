<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AuthorizationController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\RoleController;
use Illuminate\Support\Facades\Route;

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

    // Route::middleware(['Authorizations'])->group(function () {
        Route::prefix('/role')->group(function () {
            Route::get('/', [RoleController::class, 'getRole'])->name('setting_role_view_index');
            Route::get('/code', [RoleController::class, 'getRoleCode'])->name('setting_role_view_code');
            Route::get('/{id}', [RoleController::class, 'getSingleRole'])->name('setting_role_view_show');
            Route::post('/', [RoleController::class, 'addRole'])->name('setting_role_add_store');
            Route::post('/{id}', [RoleController::class, 'editRole'])->name('setting_role_update_update');
            Route::delete('/{id}', [RoleController::class, 'deleteRole'])->name('setting_role_delete_destory');
        });

        Route::prefix('/admin')->group(function () {
            Route::get('/', [AuthController::class, 'index'])->name('setting_admin_view_index');
            Route::get('/{id}', [AuthController::class, 'show'])->name('setting_admin_view_show');
            Route::post('/', [AuthController::class, 'store'])->name('setting_admin_add_store');
            Route::post('/{id}', [AuthController::class, 'update'])->name('setting_admin_update_update');
            Route::delete('/{id}', [AuthController::class, 'destory'])->name('setting_admin_delete_destory');
        });

        Route::prefix('/banner')->group(function () {
            Route::get('/', [BannerController::class, 'getBanner'])->name('banner_view_index');
            Route::get('/code', [BannerController::class, 'getBannerCode'])->name('banner_view_code');
            Route::get('/{id}', [BannerController::class, 'getSingleBanner'])->name('banner_view_show');
            Route::post('/', [BannerController::class, 'addBanner'])->name('banner_add_store');
            Route::post('/uploadImage', [BannerController::class, 'uploadImage'])->name('banner_add_storeImage');
            Route::post('/{id}', [BannerController::class, 'editBanner'])->name('banner_edit_storeImage');
            Route::delete('/{id}', [BannerController::class, 'deleteBanner'])->name('banner_delete_destory');
        });

        Route::prefix('/authorization')->group(function () {
            Route::get('/', [AuthorizationController::class, 'index'])->name('setting_authorization_view_index');
        });
    // });
});
