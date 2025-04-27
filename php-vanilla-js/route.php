<?php
require_once(__DIR__ . '/autoload.php');
use \Class\Validator;
use \Class\Employee;
use \Model\EmployeeDto;

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  try {
    $name = Validator::ValidateString("name", 0, 100, true);
    $gender = Validator::ValidateString("gender", 0, 100);
    $marriage = Validator::ValidateString("marriage", 0, 100);
    $phone = Validator::ValidatePhone("phone", 0, 20);
    $email = Validator::ValidateEmail("email", 0, 255);
    $address = Validator::ValidateString("address", 0, 999);
    $birthDate = Validator::ValidateDate("birthDate");
    $nationality = Validator::ValidateString("nationality", 0, 100);
    $hireDate = Validator::ValidateDate("hireDate");
    $department = Validator::ValidateString("department", 0, 100);
    $method = Validator::ValidateString("method", 0, 100,true);
    $employeeDto = new EmployeeDto($name, $gender, $marriage, $phone, $email, $address, $birthDate, $nationality, $hireDate, $department);
    $employeeManager = new Employee();
    $employeeManager->addEmployee($method, $employeeDto);

  } catch (Exception $e) {
      echo $e->getTraceAsString();
    echo json_encode(array("success" => false, "message" => $e->getMessage()));

  }
} else {
    //$employeeDto = new EmployeeDto("1", "1", "1", "1","1", "1", "1", "1", "1", "1");
    echo json_encode(["success" => false, "message" => "error"]);
  exit();
}









