<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\File\Exception\AccessDeniedException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Exception\MethodNotAllowedException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // this is important part ..  if not csrf error whatever
        $middleware->validateCsrfTokens(except: [
            'employee/*',
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function (NotFoundHttpException $e, Request $request) {
            Log::Error("HF:NOT FOUND 404: " . $e->getMessage());
        });
        $exceptions->render(function (AccessDeniedException $e, Request $request) {
            Log::Error("HF:ACCESS DENIED 403: " . $e->getMessage());
        });
        $exceptions->render(function (MethodNotAllowedException $e, Request $request) {
            Log::Error("HF:ACCESS DENIED 405: " . $e->getMessage());
        });

    })->create();
