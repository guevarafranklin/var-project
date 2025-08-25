<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Admin: SBUs, Teams, Users, Assignments
    Route::prefix('admin')->name('admin.')->group(function () {
        // SBUs
        Route::get('sbus', [\App\Http\Controllers\Admin\SbuController::class, 'index'])->name('sbus.index');
        Route::post('sbus', [\App\Http\Controllers\Admin\SbuController::class, 'store'])->name('sbus.store');
        Route::put('sbus/{sbu}', [\App\Http\Controllers\Admin\SbuController::class, 'update'])->name('sbus.update');
        Route::delete('sbus/{sbu}', [\App\Http\Controllers\Admin\SbuController::class, 'destroy'])->name('sbus.destroy');

        // Teams under SBU
    Route::get('sbus/{sbu}/teams', [\App\Http\Controllers\Admin\TeamController::class, 'index'])->name('teams.index');
    Route::post('sbus/{sbu}/teams', [\App\Http\Controllers\Admin\TeamController::class, 'store'])->name('teams.store');
    Route::get('sbus/{sbu}/teams/{team}', [\App\Http\Controllers\Admin\TeamController::class, 'show'])->name('teams.show');
        Route::put('teams/{team}', [\App\Http\Controllers\Admin\TeamController::class, 'update'])->name('teams.update');
        Route::delete('teams/{team}', [\App\Http\Controllers\Admin\TeamController::class, 'destroy'])->name('teams.destroy');

        // Users
        Route::get('users', [\App\Http\Controllers\Admin\UserController::class, 'index'])->name('users.index');
        Route::post('users', [\App\Http\Controllers\Admin\UserController::class, 'store'])->name('users.store');
        Route::put('users/{user}', [\App\Http\Controllers\Admin\UserController::class, 'update'])->name('users.update');
        Route::delete('users/{user}', [\App\Http\Controllers\Admin\UserController::class, 'destroy'])->name('users.destroy');

    // Team assignments (nested under SBU/team for clarity)
    Route::post('sbus/{sbu}/teams/{team}/assign', [\App\Http\Controllers\Admin\TeamAssignmentController::class, 'assign'])->name('teams.assign.store');
    Route::delete('sbus/{sbu}/teams/{team}/assign/{user}', [\App\Http\Controllers\Admin\TeamAssignmentController::class, 'unassign'])->name('teams.assign.destroy');
    Route::post('sbus/{sbu}/teams/{team}/transfer/{user}', [\App\Http\Controllers\Admin\TeamAssignmentController::class, 'transfer'])->name('teams.transfer');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
