<?php
require_once("Validator.php");
require_once("EmployeeDto.php");
require_once("EmployeeClass.php");
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  try {

    // since the FILTER_INPUT_STRING has depreciated ??? erk .. so create new one validator .
    // laravel have their own way
    $name = Validator::ValidateString("name", 0, 100, true);
    // normally we used integer .But our own system using string because encoded
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
    $employeeManager = new EmployeeClass(new SaveFile());
    $employeeManager->addEmployee($method, $employeeDto);

  } catch (Exception $e) {
    echo json_encode(array("success" => false, "message" => $e->getMessage()));

  }
} else {
  echo json_encode(["success" => false, "message" => "error"]);
  exit();
}









