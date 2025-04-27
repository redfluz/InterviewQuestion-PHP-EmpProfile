class EmployeeRecord {
    //region Geo Region
    /** @type {NationalityRecord} */
    #_nationality = new NationalityRecord();
    /** @type {DepartmentRecord} */
    #_department = new DepartmentRecord();
    ///endregion

    //region Setting
    /** @type {MarriageRecord} */
    #_marriage = new MarriageRecord();
    /** @type {GenderRecord} */
    #_gender = new GenderRecord();
    //region Setting
    
    /** @type {string} */
    #_name = '';
    /** @type {Date} */
    #_birthDate = new Date();
    /** @type {Date} */
    #_hireDate = new Date();
    /** @type {string} */
    #_address = '';
    /** @type {string} */
    #_email = '';
    /** @type {string} */
    #_phone = '';

    fromObject = (obj) => {
        if (!obj) return;

        if (obj) {
            if ('Nationality' in obj && obj.Nationality && 'key' in obj.Nationality && 'name' in obj.Nationality) {
                this.setNationality(new NationalityRecord().setKey(obj.Nationality.key).setName(obj.Nationality.name));
            }
            if ('department' in obj && obj.department && 'key' in obj.department && 'name' in obj.department) {
                this.setDepartment(new DepartmentRecord().setKey(obj.department.key).setName(obj.department.name));
            }
            if ('marriage' in obj && obj.marriage && 'key' in obj.marriage && 'name' in obj.marriage) {
                this.setMarriage(new MarriageRecord().setKey(obj.marriage.key).setName(obj.marriage.name));
            }
            if ('gender' in obj && obj.gender && 'key' in obj.gender && 'name' in obj.gender) {
                this.setGender(new GenderRecord().setKey(obj.gender.key).setName(obj.gender.name));
            }
            if ('name' in obj) this.setName(obj.name);
            if ('birthDate' in obj) this.setBirthDate(new Date(obj.birthDate));
            if ('hireDate' in obj) this.setHireDate(new Date(obj.hireDate));
            if ('address' in obj) this.setAddress(obj.address);
            if ('email' in obj) this.setEmail(obj.email);
            if ('phone' in obj) this.setPhone(obj.phone);
        }
    }
   
    /**
     * @returns {NationalityRecord}
     */
    getNationality = () => this.#_nationality;
    /**
     * @param {NationalityRecord} Nationality
     * @returns {EmployeeRecord}
     */
    setNationality = (Nationality) => {
        if (typeof Nationality !== 'object' || !(Nationality instanceof NationalityRecord)) {
            throw new TypeError('Expected type to be an instance of NationalityRecord');
        }
        this.#_nationality = Nationality;
        return this;
    }


    /**
     * Return department object
     * @returns {DepartmentRecord}
     */
    getDepartment = () => this.#_department;
    /**
     * @param {DepartmentRecord} department
     * @returns {EmployeeRecord}
     */
    setDepartment = (department) => {
        if (typeof department !== 'object' || !(department instanceof DepartmentRecord)) {
            throw new TypeError('Expected type to be an instance of DepartmentRecord');
        }
        this.#_department = department;
        return this;
    }
    // setting 
    /**
     * Return a marriage object
     * @returns {MarriageRecord}
     */
    getMarriage = () => this.#_marriage;
    /**
     * @param {MarriageRecord} marriage
     * @returns {EmployeeRecord}
     */
    setMarriage = (marriage) => {
        if (typeof marriage !== 'object' || !(marriage instanceof MarriageRecord)) {
            throw new TypeError('Expected type to be an instance of MarriageRecord');
        }
        this.#_marriage = marriage;
        return this;
    }

    /**
     * Return a gender object
     * @returns {GenderRecord}
     */
    getGender = () => this.#_gender;
    /**
     * @param {GenderRecord} gender
     * @returns {EmployeeRecord}
     */
    setGender = (gender) => {
        if (typeof gender !== 'object' || !(gender instanceof GenderRecord)) {
            throw new TypeError('Expected type to be an instance of GenderRecord');
        }
        this.#_gender = gender;
        return this;
    }
    // end setting 


    /**
     * return Name
     * @returns {string}
     */
    getName = () => this.#_name;
    /**
     * @param {string} firstName
     * @returns {EmployeeRecord}
     */
    setName = (firstName) => {
        this.#_name = firstName;
        return this;
    }
    /**
     * Gets the birthdate.
     * @returns {string} The birthdate format yyyy-mm-dd
     */
    getBirthDate = () => this.#_birthDate.toISOString().split('T')[0];

    /**
     * Sets the birthdate. If `value` is null or not a valid date, it defaults to the current date.
     * @param {Date | null} birthDate - The birthdate to set.
     * @returns {this} The instance for method chaining.
     */
    setBirthDate = (birthDate) => {
        if (birthDate == null) {
            return this;
        }
        if (typeof birthDate === "string") {
            birthDate = new Date(birthDate); // Convert string to Date
        }
        if (!(birthDate instanceof Date) || isNaN(birthDate.getTime())) {
            throw new Error("Invalid date provided. value provided :" + birthDate);
        }
        this.#_birthDate = birthDate;
        return this;
    }
    /**
     * Gets the hire date.
     * @returns {string} The hire date.
     */
    getHireDate = () => this.#_hireDate.toISOString().split('T')[0];

    /**
     * Sets the hire date. If `value` is null or not a valid date, it defaults to the current date.
     * @param {Date | null} hiredDate - The hire date to set.
     * @returns {EmployeeRecord} The instance for method chaining.
     */
    setHireDate = (hiredDate) => {
        if (hiredDate == null) {
            return this;
        }
        if (typeof hiredDate === "string") {
            hiredDate = new Date(hiredDate); // Convert string to Date
        }
        if (!(hiredDate instanceof Date) || isNaN(hiredDate.getTime())) {
            throw new Error("Invalid date provided. value provided :" + hiredDate);
        }
        this.#_hireDate = hiredDate;
        return this;
    }
    /**
     * return full address
     * @returns {string}
     */
    getAddress = () => this.#_address;
    /**
     * @param {string} address
     * @returns {EmployeeRecord}
     */
    setAddress = (address) => {
        this.#_address = address;
        return this;
    }

    getEmail = () => this.#_email;
    /**
     * Sets the email address for the employee.
     *
     * @param {string} email - The email address.
     * @returns {EmployeeRecord} The current instance for method chaining.
     * @throws {TypeError} If the email is not a valid string or does not match an email format.
     */
    setEmail = (email) => {
        if (!email || email.trim().length === 0) {
            return this;
        }
        if (typeof email !== "string" || !email.trim()) {
            throw new TypeError("Email must be a non-empty string.");
        }

        // Basic email format validation (not perfect but covers most cases)
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            throw new TypeError(`Invalid email format.(${email})`);
        }

        this.#_email = email.trim(); // Trim to remove leading/trailing spaces
        return this;
    }
    /**
     * return Phone Number / Mobile number / Cell Phone
     * @returns {string}
     */
    getPhone = () => this.#_phone;
    /**
     * Set Phone Number to Employee
     * @param {string|number} phone - The phone number, allowing digits, hyphens (-), and parentheses ().     * @param {string} phone
     * @returns {EmployeeRecord}
     */
    setPhone = (phone) => {
        if (!phone || phone.trim().length === 0) {
            return this;
        }
        if (phone === "-") {
            this.#_phone = phone;
            return this;
        }
        if (typeof phone === "number") {
            phone = phone.toString(); // Convert number to string
        }

        if (typeof phone !== "string" || !phone.trim()) {
            throw new TypeError("Phone number must be a non-empty string or number.");
        }

        // Allow only digits, spaces, hyphens (-), and parentheses ()
        const phonePattern = /^\+?\d{1,4}?[-.\s()]?\(?\d{1,4}\)?[-.\s()]?\d{1,4}[-.\s()]?\d{1,9}$/;
        if (!phonePattern.test(phone)) {
            console.log("phone", phone)
            throw new TypeError("Invalid phone number format. Only digits, spaces, hyphens (-), and parentheses () are allowed.");
        }

        this.#_phone = phone.trim(); // Trim spaces before storing
        return this;
    }
}