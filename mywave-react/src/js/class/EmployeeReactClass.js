class EmployeeReactClass {
  #_key;
  #_signal;
  #_uri;
  error = false;
  constructor(key, signal) {
    this.#_key = key;
    this.#_signal = signal;
    this.#_uri = "submit.php";
  }

  /**
   * Return fetch API request form data into data
   * @param {EmployeeRecord?} record
   * @returns string
   */
  jsonBody = (record) => {
    if (record) {
      const jsonData = {};

      let nationalityKey = record.getNationality().getKey();
      jsonData.nationality = nationalityKey ? nationalityKey : null;

      let departmentKey = record.getDepartment().getKey();
      jsonData.department = departmentKey ? departmentKey : null;

      let marriageKey = record.getMarriage().getKey();
      jsonData.marriage = marriageKey ? marriageKey : null;

      let genderKey = record.getGender().getKey();
      jsonData.gender = genderKey ? genderKey : null;

      jsonData.name = record.getName();
      jsonData.birthDate = record.getBirthDate();
      jsonData.hireDate = record.getHireDate();
      jsonData.address = record.getAddress();
      jsonData.email = record.getEmail();
      jsonData.phone = record.getPhone();
      jsonData.method = "json";

      return JSON.stringify(jsonData); // Return the JSON string
    }
  }


  reset = async () => {
    const {
      nationality,
      department,
      marriage,
      gender,

      name,
      birthDate,
      hireDate,
      address,


      email,
      phone

    } = this.getForms();

    nationality.selectedIndex = 0;
    department.selectedIndex = 0;
    marriage.selectedIndex = 0;
    gender.selectedIndex = 0;

    name.value = '';
    birthDate.value = new Date().toISOString().split('T')[0];
    hireDate.value = new Date().toISOString().split('T')[0];
    address.value = '';

    email.value = '';
    phone.value = '';

  }
  getForms = () => {
    return {
      nationality: document.getElementById("nationality"),
      department: document.getElementById("department"),
      marriage: document.getElementById("marriage"),
      gender: document.getElementById("gender"),

      name: document.getElementById("name"),
      lastName: document.getElementById("lastName"),
      birthDate: document.getElementById("birthDate"),
      hireDate: document.getElementById("hireDate"),

      address: document.getElementById("address"),
      email: document.getElementById("email"),
      phone: document.getElementById("phone"),
      addButton: document.getElementById("addButton")
    };
  }
  add = async () => {

    const {
      nationality,
      department,
      marriage,
      gender,

      name,
      birthDate,
      hireDate,
      address,

      email,
      phone,
      addButton

    } = this.getForms();

    addButton.setAttribute("disabled", "disabled");

    let nameClassList = name.classList;
    let phoneClassList = phone.classList;
    let emailClassList = email.classList;

    if (name.value.length === 0) {
      API.errorEmptyField();
      nameClassList.add("is-invalid");
      name.focus();
      addButton.removeAttribute("disabled");
      this.error = true;
      //throw new Error("name invalid");
    } else if (phone.value.length > 0 && !API.validatePhone(phone.value)) {
      // only check valid phone if exist
      console.log("phone failure ")
      API.errorEmptyField();
      phoneClassList.add("is-invalid");
      phone.focus();
      addButton.removeAttribute("disabled");
      this.error = true;
      //throw new Error("phone failure ")
    } else if (email.value.length > 0 && !API.validateEmail(email.value)) {
      // only check valid email if exist
      console.log("email failure ")
      API.errorEmptyField();
      emailClassList.add("is-invalid");
      email.focus();
      addButton.removeAttribute("disabled");
      this.error = true;
      //throw new Error("email invalid");
    } else {
      console.log(" ada")
      nameClassList.remove("is-invalid");
      phoneClassList.remove("is-invalid");
      emailClassList.remove("is-invalid");

      let record = new EmployeeRecord()
        .setNationality(new NationalityRecord().setKey(nationality.value))
        .setDepartment(new DepartmentRecord().setKey(department.value))
        .setMarriage(new MarriageRecord().setKey(marriage.value))
        .setGender(new GenderRecord().setKey(gender.value))
        .setName(name.value)
        .setBirthDate(new Date(birthDate.value))
        .setHireDate(new Date(hireDate.value))
        .setAddress(address.value)
        .setEmail(email.value)
        .setPhone(phone.value);

      try {
        const headers = API.createHeader();
        const data = this.jsonBody(record);
        const response = await API.fetch(this.#_signal, this.#_uri, headers, data);
        console.log("response", response);
        if (response && response.success) {
          API.addSuccess();
        } else {
          API.addFailure();
        }
      } catch (error) {
        console.error(error);
        API.failureMessage();
      } finally {
        //await this.reset();
        addButton.removeAttribute("disabled");
      }
    }
  }
}
