
import { EmployeeRecord } from '../record/EmployeeRecord';
import API from '../lib/API';

export class EmployeeClass {
  #_signal;
  #_uri;
  error = false;
  constructor(signal) {
    this.#_signal = signal;
    this.#_uri = "http://localhost:8000/employee";
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
  /**
   *
   * @param {EmployeeRecord?} record
   * @returns {Promise<void>}
   */
  add = async (record) => {

    try {
      const headers = API.createHeader();
      const data = this.jsonBody(record);
      const response = await API.fetch(this.#_signal, this.#_uri +"/add", headers, data);
      console.log("response", response);
      if (response && response.success) {
        API.addSuccess();
      } else {
        this.error = true;
        API.addFailure();
      }
    } catch (error) {
      this.error = true;
      console.error(error);
      API.failureMessage();
    }
  }
  read = async () => {
    try {
      const headers = API.createHeader();
      const response = await API.fetch(this.#_signal, this.#_uri+"/read", headers,null);
      console.log("response", response);
      if (response && response.success) {
          return response.data;
      } else {
        API.addFailure();
      }
    } catch (error) {
      console.error(error);
      API.failureMessage();
    }
  }
}
