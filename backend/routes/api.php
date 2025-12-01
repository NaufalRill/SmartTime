<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

// --------------------------
// Public API Routes
// --------------------------

// Cek apakah API berjalan
Route::get('/check', function () {
    return response()->json(['message' => 'API is running']);
});

// Auth Routes (Login & Register)
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);


// --------------------------
// Protected Routes (butuh token Sanctum)
// --------------------------
Route::middleware('auth:sanctum')->group(function () {

    // Contoh route yang butuh login
    Route::get('/profile', function (Request $request) {
        return response()->json([
            'user' => $request->user()
        ]);
    });

    // Logout
    Route::post('/logout', [AuthController::class, 'logout']);
});
