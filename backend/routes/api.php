<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AuthorizationController;
use App\Http\Controllers\CategoryGalleryController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\PictureGalleryController;
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

    Route::prefix('/categoryGallery')->group(function () {
        Route::get('/', [CategoryGalleryController::class, 'index'])->name('galeri_categorygallery_view_index');
        Route::get('/code', [CategoryGalleryController::class, 'getcode'])->name('galeri_categorygallery_view_code');
        Route::get('/{id}', [CategoryGalleryController::class, 'show'])->name('galeri_categorygallery_view_show');
        Route::post('/', [CategoryGalleryController::class, 'store'])->name('galeri_categorygallery_add_store');
        Route::post('/{id}', [CategoryGalleryController::class, 'update'])->name('galeri_categorygallery_update_update');
        Route::delete('/{id}', [CategoryGalleryController::class, 'destroy'])->name('galeri_categorygallery_delete_destroy');
    });

    Route::prefix('/pictureGallery')->group(function () {
        Route::get('/', [PictureGalleryController::class, 'index'])->name('galeri_picturegallery_view_index');
        Route::get('/code', [PictureGalleryController::class, 'getcode'])->name('galeri_picturegallery_view_code');
        Route::get('/{id}', [PictureGalleryController::class, 'show'])->name('galeri_picturegallery_view_show');
        Route::post('/', [PictureGalleryController::class, 'store'])->name('galeri_picturegallery_add_store');
        Route::post('/{id}', [PictureGalleryController::class, 'update'])->name('galeri_picturegallery_update_update');
        Route::delete('/{id}', [PictureGalleryController::class, 'destroy'])->name('galeri_picturegallery_delete_destroy');
    });

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
