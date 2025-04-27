<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Test</title>
  <link rel="stylesheet" href="dist/css/main.css">
  <link rel="stylesheet" href="dist/css/output.css">
  <link rel="stylesheet" href="dist/css/icons.min.css">
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
          <Button type="button" name="addButton" id="addButton" class="btn btn-add" onclick="addRecord()">
            Add Employee
            <i class="bx bx-plus"></i>
          </Button>

          <Button type="button" name="listButton" id="addButton" class="btn btn-add" onclick="listRecord()">
            List Employee
            <i class="bx bx-list-ol"></i>
          </Button>

          <button type="button" name="clearButton" id="clearButton" class="btn btn-reset">
            <i class="bx bx-refresh"></i>
          </button>
        </div>
      </div>
      <div id="tab-content">
        <div id="content-general" class="card tab-pane">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label for="name"><i class="bx bx-user"></i> Employee Name</label>
              <input type="text" id="name" maxlength="64" placeholder="e.g., John" required/>
            </div>
            <div>
              <label for="gender"><i class="bx bx-male-female"></i>Gender</label>
              <select id="gender">
                <option value="Unknown">Unknown</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label for="marriage"><i class="bx bx-heart"></i> Martial Status</label>
              <select id="marriage">
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
                <option value="Seperated">Seperated</option>
              </select>
            </div>
            <div>
              <label for="phone"><i class="bx bx-phone"></i> Phone No.</label>
              <input type="tel" id="phone" maxlength="24" placeholder="6012-1234-567890"/>
            </div>
            <div>
              <label for="email" style="vertical-align: middle"><i class="bx bx-envelope"></i> Email</label>
              <input type="text" id="email" maxlength="30" placeholder="e.g., naruto@gmail.com"/>
            </div>
            <div>
              <label for="address"><i class="bx bx-home"></i> Address</label>
              <textarea id="address"></textarea>
            </div>
            <div>
              <label for="birthDate"><i class="bx bx-calendar"></i> Date of birth</label>
              <input type="date" id="birthDate" value="<?php echo date("Y-m-d"); ?>"/>
            </div>
            <div>
              <label for="nationality"><i class="bx bx-world"></i> Nationality</label>
              <select id="nationality">
                <option value="Malaysia">Malaysia</option>
                <option value="Singapore">Singapore</option>
                <option value="Vietnam">Vietnam</option>
              </select>
            </div>
            <div>
              <label for="hireDate"><i class="bx bx-calendar"></i> Hired Date</label>
              <input type="date" id="hireDate" value="<?php echo date("Y-m-d"); ?>"/>
            </div>
            <div>
              <label for="department"><i class="bx bx-building"></i> Department</label>
              <select name="department" id="department">
                <option value="Information Tech">Information Tech</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Sales">Sales</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

</body>
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.9.0/axios.min.js"
        integrity="sha512-FPlUpimug7gt7Hn7swE8N2pHw/+oQMq/+R/hH/2hZ43VOQ+Kjh25rQzuLyPz7aUWKlRpI7wXbY6+U3oFPGjPOA=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="dist/js/lib/API.js"></script>
<script src="dist/js/lib/TailwindAlert.js"></script>
<script src="dist/js/class/Employee.js"></script>

<script src="dist/js/record/DepartmentRecord.js"></script>
<script src="dist/js/record/EmployeeRecord.js"></script>
<script src="dist/js/record/MarriageRecord.js"></script>
<script src="dist/js/record/NationalityRecord.js"></script>
<script src="dist/js/record/GenderRecord.js"></script>
<script src="dist/js/i18n/en-US/translation.js"></script>

<script>
  // we don't like this anymore  only for here.We do more on event delegate
  function addRecord() {
    let controller = new AbortController();
    let key = "nothing here";
    let obj = new EmployeeClass(key, controller.signal);


      obj.add();
      if(obj.error === false  || obj.error === null) {
        setTimeout(() => {
         window.location.href = "list.php"; // Redirect to list.php
        }, 1000); // 1000ms = 1 second
      }

  }
  function listRecord() {
    window.location.href = "List.php";
  }
</script>
</html>
