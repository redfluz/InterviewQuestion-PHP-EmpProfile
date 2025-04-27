export class GenderRecord {
    /**
     * Gender Key
     * @private
     * @type {string}
     */
    #_key = '';

    /**
     * Gender Name
     * @private
     * @type {string}
     */
    #_name = '';

    /**
     * Set the value of the primary key.
     * @param {string} key - The primary key to set.
     * @returns {GenderRecord} The instance of GenderRecord.
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
     * Set the value of the Gender name.
     * @param {string} name - The Gender name to set.
     * @returns {GenderRecord} The instance of GenderRecord.
     */
    setName = (name) => {
        this.#_name = name;
        return this;
    }

    /**
     * Return the Gender name.
     * @returns {string} The Gender name.
     */
    getName = () => this.#_name;
}