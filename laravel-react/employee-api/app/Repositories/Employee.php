<?php

namespace App\Repositories;

use App\Models\EmployeeDto;
use App\Repositories\Contracts\IEmployee;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
class Employee implements IEmployee
{
    protected string $folder = 'public';

    /**
     * @throws \Exception
     */
    public function add(EmployeeDto $dto): IEmployee
    {
        $data = $dto->toArray();
        $filename =  uniqid('employee_', true) . '.json';
        try {
            // Save the employee data as JSON
            Storage::disk($this->folder)->put($filename, json_encode($data, JSON_PRETTY_PRINT));
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            throw new \Exception("File upload failed");
        }
        return $this;
    }

    public function getAll(): Collection
    {

// Log the public disk path
        $files = Storage::disk($this->folder)->files();
        Log::info('Files in public storage: ', $files);
        $employees = collect();

        foreach ($files as $file) {
            if (strtolower(pathinfo($file, PATHINFO_EXTENSION)) === 'json') {
                $content = Storage::disk($this->folder)->get($file);
                $decoded = json_decode($content, true);

                if (is_array($decoded)) {
                    $employees->push($decoded);
                }
            }
        }

        return $employees;
    }
}
