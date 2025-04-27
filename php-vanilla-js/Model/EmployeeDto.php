<?php
namespace Model;
class EmployeeDto {
    private string $name;
    private string $gender;
    private string $marriage;
    private string $phone;
    private string $email;
    private string $address;
    private string $birthDate;
    private string $nationality;
    private string $hireDate;
    private string $department;

    public function __construct($name, $gender, $marriage, $phone, $email, $address, $dateOfBirth, $nationality, $hiredDate, $department) {
        // this problem upon some people in malaysia contain word Like Dato', since just api we cannot rely on js only, somebody may spam it   
        $this->name = $name;
        $this->gender = $gender;
        $this->marriage = $marriage;
        $this->phone = $phone;
        $this->email = $email;
        $this->address = $address;
        $this->birthDate = $dateOfBirth;
        $this->nationality = $nationality;
        $this->hireDate = $hiredDate;
        $this->department = $department;
    }
  public function toArray(): array {
    return [
      'name' => $this->name,
      'gender' => $this->gender,
      'marriage' => $this->marriage,
      'phone' => $this->phone,
      'email' => $this->email,
      'address' => $this->address,
      'dateOfBirth' => $this->birthDate,
      'nationality' => $this->nationality,
      'hiredDate' => $this->hireDate,
      'department' => $this->department
    ];
  }
}
