<?php
require_once("EmployeeClass.php");
// get list file from folder list and get file name and put the data to list array so can use in table data below
$employeeManager = new EmployeeClass(new SaveFile());
$employees = $employeeManager->read();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Test</title>
  <link rel="stylesheet" href="./dist/css/main.css">
  <link rel="stylesheet" href="./dist/css/output.css">
  <link rel="stylesheet" href="./dist/css/icons.min.css">
</head>
<body class="bg-gray-100">
<div id="container">
  <div id="content" style="display: flex; align-items: center; justify-content: center; height: 100vh;">
    <div class="content">
      <div class="mb-4 flex-between card">
        <h1 class="text-3xl font-bold header">
          <i class="bx bx-user"></i>
          <span>Employee</span>
        </h1>
        <div class="flex space-x-2">
          <Button type="button" name="formButton" id="formButton" class="btn btn-add" onclick="formRecord()">
            Add Employee
            <i class="bx bx-plus"></i>
          </Button>
        </div>
      </div>
      <table class="table" id="tableData">
        <thead>
        <tr>
          <?php
          foreach (array_keys($employees[0]) as $header) {
            echo "<th class='table-cell-center'>" . ucfirst(htmlspecialchars($header)) . "</th>";
          } ?>
        </tr>
        </thead>
        <tbody id="tableBody">
        <?php
        foreach ($employees as $row) {
          echo "<tr>";
          foreach ($row as $value) {
            echo "<td class='table-cell-center'>" . htmlspecialchars($value) . "</td>";
          }
          echo "</tr>";
        } ?>
        </tbody>
      </table>
    </div>
  </div>
</div>

</body>
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.9.0/axios.min.js"
        integrity="sha512-FPlUpimug7gt7Hn7swE8N2pHw/+oQMq/+R/hH/2hZ43VOQ+Kjh25rQzuLyPz7aUWKlRpI7wXbY6+U3oFPGjPOA=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="./dist/js/lib/API.js"></script>
<script src="./dist/js/lib/TailwindAlert.js"></script>
<script src="./dist/js/class/Employee.js"></script>

<script src="./dist/js/record/DepartmentRecord.js"></script>
<script src="./dist/js/record/EmployeeRecord.js"></script>
<script src="./dist/js/record/MarriageRecord.js"></script>
<script src="./dist/js/record/NationalityRecord.js"></script>
<script src="./dist/js/record/GenderRecord.js"></script>
<script src="./dist/js/i18n/en-US/translation.js"></script>
<script>
  function formRecord() {
    window.location.href = "index.php";
  }
</script>
</html>
