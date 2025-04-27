<?php

use App\Http\Controllers\Api\EmployeeController;
use Illuminate\Support\Facades\Route;

// why get instead get . we don't like get for json
Route::middleware('api')->group(function () {
    Route::post('/employee/add', [EmployeeController::class, 'add']);
    Route::post('/employee/read', [EmployeeController::class, 'read']);
});
