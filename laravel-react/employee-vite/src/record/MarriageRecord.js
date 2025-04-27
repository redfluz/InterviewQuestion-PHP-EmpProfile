export class MarriageRecord {
    /**
     * Marriage Key
     * @private
     * @type {string}
     */
    #_key = '';

    /**
     * Marriage Name
     * @private
     * @type {string}
     */
    #_name = '';

    /**
     * Set the value of the primary key.
     * @param {string} key - The primary key to set.
     * @returns {MarriageRecord} The instance of MarriageRecord.
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
     * Set the value of the marriage name.
     * @param {string} name - The marriage name to set.
     * @returns {MarriageRecord} The instance of MarriageRecord.
     */
    setName = (name) => {
        this.#_name = name;
        return this;
    }

    /**
     * Return the marriage name.
     * @returns {string} The marriage name.
     */
    getName = () => this.#_name;
}