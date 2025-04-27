<?php

class EmployeeDto {
    private string $name;
    private string $gender;
    private string $marriage;
    private string $phone;
    private string $email;
    private $address;
    private $dateOfBirth;
    /**
     * Summary of nationality , our own code we use country 
     * @var 
     */
    private string $nationality;
    private $hiredDate;
    private string $department;

    public function __construct($name, $gender, $marriage, $phone, $email, $address, $dateOfBirth, $nationality, $hiredDate, $department) {
        // this problem upon some people in malaysia contain word Like Dato', since just api we cannot rely on js only, somebody may spam it   
        $this->name = $name;
        $this->gender = $gender;
        $this->marriage = $marriage;
        $this->phone = $phone;
        $this->email = $email;
        $this->address = $address;
        $this->dateOfBirth = $dateOfBirth;
        $this->nationality = $nationality;
        $this->hiredDate = $hiredDate;
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
      'dateOfBirth' => $this->dateOfBirth,
      'nationality' => $this->nationality,
      'hiredDate' => $this->hiredDate,
      'department' => $this->department
    ];
  }
}
