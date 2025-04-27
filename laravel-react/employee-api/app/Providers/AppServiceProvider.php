<?php

namespace App\Providers;

use App\Repositories\Contracts\IEmployee;
use Illuminate\Support\ServiceProvider;
use App\Repositories\Employee;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(
            IEmployee::class,
            Employee::class
        );
    }

    public function boot(): void
    {
        //
    }
}
