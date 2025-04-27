<?php
namespace Class;
use Exception;
use JetBrains\PhpStorm\NoReturn;
use \Model\EmployeeDto;
use \Enum\ESave;

class Employee
{
    /***
     * @param $method
     * @param EmployeeDto $employee
     * @return void
     * @throws Exception
     */
    #[NoReturn] public function addEmployee($method, EmployeeDto $employee): void
    {
        $method = ESave::from($method);
        $saver = new SaveFile();
        switch ($method->value) {
            case ESave::JSON->value:
                $saver->saveJson($employee->toArray());
                break;
            case ESave::CSV->value:
                $saver->saveCsv($employee->toArray());
                break;
            default:
                echo json_encode(array("success" => false, "message" => "Method not supported"));
        }
        echo json_encode(["success" => true, "message" => "record added successfully"]);
        exit();
    }

    function read(string $folder = './../storage'): array
    {
        $path = __DIR__ . '/' . $folder;
        $data = [];
        if (!is_dir($path)) {
            echo "Folder does not exist.";
            return $data;
        }

        $files = scandir($path);
        foreach ($files as $file) {
            if (in_array($file, ['.', '..'])) continue;

            $fullPath = $path . '/' . $file;
            $ext = pathinfo($file, PATHINFO_EXTENSION);
            $basename = pathinfo($file, PATHINFO_FILENAME);

            if ($ext === 'json') {
                //echo "filename \"" . $path . "/" . $file . "\"<br>";

                $json = file_get_contents($fullPath);
                $decodedData = json_decode($json, true);  // Ensure it is decoded as an associative array
                $data[] = $decodedData;
            }
        }
        return $data; // [ 'employees' => [...], 'customers' => [...], etc ]
    }


}
