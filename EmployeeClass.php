<?php use JetBrains\PhpStorm\NoReturn;

require_once("SaveFile.php");

class EmployeeClass
{
  private ISaveFile $saver;

  public function __construct(ISaveFile $saver)
  {
    $this->saver = $saver;
  }

  /**
   * Summary of addEmployee
   * @param $method
   * @param \EmployeeDto $employee
   * @return void
   */
  #[NoReturn] public function addEmployee($method, EmployeeDto $employee): void
  {
    $method = SaveMethod::from($method);
    switch ($method->value) {
      case SaveMethod::JSON->value:
        $this->saver->saveJson($employee->toArray());
        break;
      case SaveMethod::CSV->value:
        $this->saver->saveCsv($employee->toArray());
        break;
      default:
        echo json_encode(array("success" => false, "message" => "Method not supported"));
        exit();
    }
    echo json_encode(["success" => true, "message" => "record added successfully"]);
    exit();
  }

  function read(string $folder = 'storage'): array
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
