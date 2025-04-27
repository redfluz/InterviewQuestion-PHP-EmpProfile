import { MessageConstant } from '../i18n/en-US/translation';
import TailwindAlert from './TailwindAlert';
import axios from "axios";
export default class API {
    static version = "v1";

    /**
     * Makes a POST request using Axios with support for aborting the request via the provided signal.
     *
     * @param {AbortSignal} signal - The signal to abort the request if needed.
     * @param {string} url - The URL to send the POST request to.
     * @param {Object} headers - The headers to be sent with the request.
     * @param {Object|null|undefined} [data] - The data to be sent in the data of the request, can be null or undefined.
     * @param method
     * @returns {Promise<Object>} - The response data from the server if the request is successful.
     * @throws {Error} - Throws an error if the request fails, including network errors or specific HTTP errors.
     *
     * @example
     * fetch(signal, 'https://example.com/api/data', { Authorization: 'Bearer token' }, { name: 'John Doe' })
     *   .then(responseData => {
     *     console.log(responseData);
     *   })
     *   .catch(error => {
     *     console.error(error);
     *   });
     */
    static fetch(signal, url, headers, data = null, method = "post") {

        return axios({
            method: method,
            headers: headers,
            url: url,
            ...(method.toLowerCase() === "get" ? {params: data} : {data: data}),
            signal: signal,
        })
            .then(response => {
                // If the response is successful (status 2xx), return the response data
                return response.data;
            })
            .catch(error => {
                // Handle errors appropriately
                if (error.response) {
                    // Server responded with a status other than 2xx
                    const status = error.response.status;

                    // Handle specific status codes like 401
                    if (status === 401 || status === 403) {
                        // Handle Unauthorized: Redirect to login page
                        window.location.href = './login';
                    } else if (status === 400) {
                        // Handle Bad Request
                        TailwindAlert.show({
                            title: "System Error",
                            message: "An unexpected error has occurred. Please try again later.",
                            type: "error",
                            onConfirm: () => console.log("System error acknowledged")
                        });

                    } else {
                        // Handle other HTTP errors (e.g., 404, 500, etc.)
                        console.error(`Error: ${error.response.status}`);
                        throw new Error(`HTTP Error: ${error.response.status}`);
                    }
                } else if (error.request) {
                    // No response was received (likely a network error)
                    console.error('Network error:', error.request);
                    throw new Error('Network Error');
                } else {
                    // Something else happened in setting up the request
                    console.error('Error', error.message);
                    throw new Error('Unknown Error');
                }
            });
    }

    static createHeader() {
        return {
            'Content-Type': 'application/json'
        };
    }
    /**
     * Generic warning message for empty field
     */
    static errorEmptyField() {
        TailwindAlert.show({
            title: MessageConstant.TitleError,
            message: MessageConstant.CheckErrorField,
            type: "error"
        });
    }

    static errorInvalidNumber() {
        TailwindAlert.show({
            title: MessageConstant.TitleError,
            message: MessageConstant.InvalidNumber,
            type: "error"
        });
    }

    static errorInvalidEmail() {
        TailwindAlert.show({
            title: MessageConstant.TitleError,
            message: MessageConstant.InvalidEmail,
            type: "error"
        });
    }

    static errorInvalidPostcode() {
        TailwindAlert.show({
            title: MessageConstant.TitleError,
            message: MessageConstant.InvalidPostcode,
            type: "error"
        });
    }

    static errorInvalidPhone() {
        TailwindAlert.show({
            title: MessageConstant.TitleError,
            message: MessageConstant.InvalidPhone,
            type: "error"
        });
    }

    static errorInvalidSelection() {
        TailwindAlert.show({
            title: MessageConstant.TitleError,
            message: MessageConstant.InvalidSelection,
            type: "error"
        });
    }

    static errorInvalidDecimal() {
        TailwindAlert.show({
            title: MessageConstant.TitleError,
            message: MessageConstant.InvalidDecimal,
            type: "error"
        });
    }


    static addSuccess() {
        TailwindAlert.show({
            title: MessageConstant.RecordCreatedTitle,
            message: MessageConstant.RecordCreatedDescription,
            type: "success",
            onConfirm: () => console.log("Record created successfully")
        });
    }



    /**
     * Handle the response error .Static generic error message owasp recommendation
     */
    static failureMessage() {
        TailwindAlert.show({
            title: MessageConstant.TitleError,
            message: MessageConstant.ErrorDescription,
            type: "error"
        });
    }


    static addFailure() {
        TailwindAlert.show({
            title: MessageConstant.RecordFailureCreateTitle,
            message: MessageConstant.RecordFailureCreateDescription,
            type: "error"
        });
    }


    static validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static validatePhone(phone) {
        const phonePattern = /^[0-9\s\-()]+$/;
        return phonePattern.test(phone);
    }







}
