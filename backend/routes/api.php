<?php

use App\Http\Controllers\Api\ProductController;
use Illuminate\Support\Facades\Route;

Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'service' => 'LaReact API',
        'timestamp' => now()->toIso8601String(),
    ]);
});

Route::apiResource('products', ProductController::class)->only(['index', 'show', 'store']);
