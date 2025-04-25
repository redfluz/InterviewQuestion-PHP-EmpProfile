class DepartmentRecord {
    /** @type {string} */
    #_key = "";
    /*** @type {string} */
    #_name = "";
    getKey = () => this.#_key;
    setKey = (key) => {
        this.#_key = key;
        return this;
    }
    /**
     * @returns {string}
     */
    getName = () => this.#_name;
    /**
     * @param {string} name
     * @returns {DepartmentRecord}
     */
    setName = (name) => {
        this.#_name = name;
        return this;
    }
}