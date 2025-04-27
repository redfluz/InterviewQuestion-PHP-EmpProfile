<?php

namespace App\Repositories\Contracts;

use App\Models\EmployeeDto;
use Illuminate\Support\Collection;

interface IEmployee
{
    public function add(EmployeeDto $dto): IEmployee;
    // Change return type to Illuminate\Database\Eloquent\Collection
    public function getAll(): Collection;
}
