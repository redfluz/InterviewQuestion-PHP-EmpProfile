<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\EmployeeDto;
use App\Repositories\Contracts\IEmployee;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    protected IEmployee $employee;

    public function __construct(IEmployee $employee)
    {
        $this->employee = $employee;
    }

    public function add(Request $request): JsonResponse
    {
        // Laravel Validation
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'gender' => ['nullable', 'string', 'max:100'],
            'marriage' => ['nullable', 'string', 'max:100'],
            'phone' => ['nullable', 'string', 'max:20'],
            'email' => ['nullable', 'email', 'max:255'],
            'address' => ['nullable', 'string', 'max:999'],
            'birthDate' => ['nullable', 'date'],
            'nationality' => ['nullable', 'string', 'max:100'],
            'hireDate' => ['nullable', 'date'],
            'department' => ['nullable', 'string', 'max:100'],
            'method' => ['required', 'string', 'max:100'],
        ]);

        $employeeDto = new EmployeeDto(
            name: $validated['name'],
            gender: $validated['gender'] ?? null,
            marriage: $validated['marriage'] ?? null,
            phone: $validated['phone'] ?? null,
            email: $validated['email'] ?? null,
            address: $validated['address'] ?? null,
            birthDate: $validated['birthDate'] ?? null,
            nationality: $validated['nationality'] ?? null,
            hireDate: $validated['hireDate'] ?? null,
            department: $validated['department'] ?? null,
        );

        $this->employee->add($employeeDto);

        return response()->json([
            'success' => true,
            'message' => 'Employee added successfully.'
        ]);
    }

    public function read(): JsonResponse
    {
        $employees = $this->employee->getAll();
        return response()->json([
            'success' => true,
            'data' => $employees
        ]);
    }
}
