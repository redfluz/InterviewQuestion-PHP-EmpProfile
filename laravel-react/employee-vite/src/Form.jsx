import React, { useRef, useState } from 'react';
import 'boxicons/css/boxicons.min.css';
import { useNavigate } from 'react-router-dom';
import { EmployeeClass } from './class/EmployeeClass';
import { EmployeeRecord } from './record/EmployeeRecord';
import { NationalityRecord } from './record/NationalityRecord';
import { DepartmentRecord } from './record/DepartmentRecord';
import { MarriageRecord } from './record/MarriageRecord';
import { GenderRecord } from './record/GenderRecord';
import API from './lib/API';

const Form = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    gender: 'Unknown',
    marriage: 'Single',
    phone: '',
    email: '',
    address: '',
    birthDate: new Date().toISOString().split('T')[0],
    nationality: 'Malaysia',
    hireDate: new Date().toISOString().split('T')[0],
    department: 'Information Tech',
    addButtonDisabled: false
  });
  const name = useRef(null);
  const phone = useRef(null);
  const email = useRef(null);
  const addButton = useRef(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const addRecord = async () => {
    let nameClassList = name.current.classList;
    let phoneClassList = phone.current.classList;
    let emailClassList = email.current.classList;

    // Reset classes
    nameClassList.remove("is-invalid");
    phoneClassList.remove("is-invalid");
    emailClassList.remove("is-invalid");

    if (formData.name.length === 0) {
      API.errorEmptyField();
      nameClassList.add("is-invalid");
      name.current.focus();
      setFormData(prevData => Object.assign({}, prevData, { addButtonDisabled: false }));
    } else if (formData.phone.length > 0 && !API.validatePhone(formData.phone)) {
      API.errorEmptyField();
      phoneClassList.add("is-invalid");
      phone.current.focus();
      setFormData(prevData => Object.assign({}, prevData, { addButtonDisabled: false }));
    } else if (formData.email.length > 0 && !API.validateEmail(formData.email)) {
      API.errorEmptyField();
      emailClassList.add("is-invalid");
      email.current.focus();
      setFormData(prevData => Object.assign({}, prevData, { addButtonDisabled: false }));
    } else {
      nameClassList.remove("is-invalid");
      phoneClassList.remove("is-invalid");
      emailClassList.remove("is-invalid");

      const controller = new AbortController();
      const obj = new EmployeeClass(controller.signal);

      let record = new EmployeeRecord()
          .setNationality(new NationalityRecord().setKey(formData.nationality))
          .setDepartment(new DepartmentRecord().setKey(formData.department))
          .setMarriage(new MarriageRecord().setKey(formData.marriage))
          .setGender(new GenderRecord().setKey(formData.gender))
          .setName(formData.name)
          .setBirthDate(new Date(formData.birthDate))
          .setHireDate(new Date(formData.hireDate))
          .setAddress(formData.address)
          .setEmail(formData.email)
          .setPhone(formData.phone);

      try {
        await obj.add(record);

        if (!obj.error) {
          setTimeout(() => {
            navigate('/list');
          }, 1000);
        }
      } catch (error) {
        console.error('Failed to add record:', error);
      }
    }
  };

  const listRecord = () => {
    navigate('/list');
  };
  return (
      <div id="container">
        <div id="content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
          <div className="content">
            <div className="mb-4 flex-between card">
              <h1 className="text-3xl font-bold header">
                <i className="bx bx-user"></i>
                <span>Employee</span>
              </h1>
              <div className="flex space-x-2">
                <button
                    type="button"
                    name="addButton"
                    id="addButton"
                    ref={addButton}
                    className="btn btn-add"
                    onClick={addRecord}
                    disabled={formData.addButtonDisabled}>
                  Add Employee
                  <i className="bx bx-plus"></i>
                </button>

                <button
                    type="button"
                    name="listButton"
                    id="listButton"
                    className="btn btn-add"
                    onClick={listRecord}>
                  List Employee
                  <i className="bx bx-list-ol"></i>
                </button>
              </div>
            </div>
            <div id="tab-content">
              <div id="content-general" className="card tab-pane">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="name"><i className="bx bx-user"></i> Employee Name</label>
                    <input
                        type="text"
                        id="name"
                        ref={name}
                        maxLength="64"
                        placeholder="e.g., John"
                        required
                        value={formData.name}
                        onChange={handleInputChange} />
                  </div>
                  <div>
                    <label htmlFor="gender"><i className="bx bx-male-female"></i>Gender</label>
                    <select
                        id="gender"
                        value={formData.gender}
                        onChange={handleInputChange}>
                      <option value="Unknown">Unknown</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="marriage"><i className="bx bx-heart"></i> Marital Status</label>
                    <select
                        id="marriage"
                        value={formData.marriage}
                        onChange={handleInputChange}>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                      <option value="Separated">Separated</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="phone"><i className="bx bx-phone"></i> Phone No.</label>
                    <input
                        type="tel"
                        id="phone"
                        ref={phone}
                        maxLength="24"
                        placeholder="6012-1234-567890"
                        value={formData.phone}
                        onChange={handleInputChange}/>
                  </div>
                  <div>
                    <label htmlFor="email"><i className="bx bx-envelope"></i> Email</label>
                    <input
                        type="text"
                        id="email"
                        ref={email}
                        maxLength="30"
                        placeholder="e.g., naruto@gmail.com"
                        value={formData.email}
                        onChange={handleInputChange} />
                  </div>
                  <div>
                    <label htmlFor="address"><i className="bx bx-home"></i> Address</label>
                    <textarea
                        id="address"
                        value={formData.address}
                        onChange={handleInputChange}></textarea>
                  </div>
                  <div>
                    <label htmlFor="birthDate"><i className="bx bx-calendar"></i> Date of Birth</label>
                    <input
                        type="date"
                        id="birthDate"
                        value={formData.birthDate}
                        onChange={handleInputChange} />
                  </div>
                  <div>
                    <label htmlFor="nationality"><i className="bx bx-world"></i> Nationality</label>
                    <select
                        id="nationality"
                        value={formData.nationality}
                        onChange={handleInputChange}>
                      <option value="Malaysia">Malaysia</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Vietnam">Vietnam</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="hireDate"><i className="bx bx-calendar"></i> Hire Date</label>
                    <input
                        type="date"
                        id="hireDate"
                        value={formData.hireDate}
                        onChange={handleInputChange} />
                  </div>
                  <div>
                    <label htmlFor="department"><i className="bx bx-building"></i> Department</label>
                    <select
                        id="department"
                        value={formData.department}
                        onChange={handleInputChange}>
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
  );
};

export default Form;
