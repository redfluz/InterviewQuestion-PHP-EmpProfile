class NationalityRecord {
    /**
     * Nationality Key
     * @private
     * @type {string}
     */
    #_key = '';

    /**
     * Nationality Name
     * @private
     * @type {string}
     */
    #_name = '';

    /**
     * Set the value of the primary key.
     * @param {string} key - The primary key to set.
     * @returns {NationalityRecord} The instance of NationalityRecord.
     */
    setKey = (key) => {
        this.#_key = key;
        return this;
    }

    /**
     * Return the value of the primary key.
     * @returns {string} The primary key.
     */
    getKey = () => this.#_key;

    /**
     * Set the value of the Nationality name.
     * @param {string} name - The Nationality name to set.
     * @returns {NationalityRecord} The instance of NationalityRecord.
     */
    setName = (name) => {
        this.#_name = name;
        return this;
    }

    /**
     * Return the Nationality name.
     * @returns {string} The Nationality name.
     */
    getName = () => this.#_name;
}