import React, { useState, useCallback } from "react";

function useFormValidations(intialValues) {
    const { inputValues, errorValues, errorStates } = intialValues;
    const [values, setValues] = useState(inputValues);
    const [errorMessages, setErrorMessages] = useState(errorValues);
    const [isErrors, setIsErrors] = useState(errorStates);

    const handleValueChange = (e) => {
        const {
            target:
            { value, validationMessage, id, validity: { valid }, }, } = e;
        setValues({ ...values, [id]: value });
        setIsErrors({ ...isErrors, [id]: !valid });
        if (!valid) {
            setErrorMessages({ ...errorMessages, [id]: validationMessage });
        } else {
            setErrorMessages({ ...errorMessages, [id]: '' });
        }
    };

    function resetErrors() {
        setIsErrors(errorStates);
        setErrorMessages(errorValues);
    };

    return { values, isErrors, errorMessages, handleValueChange, setValues, resetErrors };

}

export default useFormValidations;