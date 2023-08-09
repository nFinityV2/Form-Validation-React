import { useState } from "react";

const useValidation = (initialState, validate) => {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    function handleChange(e){
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    }

    const handleSubmit = (e) => {
        if(e){
            e.preventDefault();
        }
        setErrors(validate(values))
        setSubmitted(true);
    }

    return {values, errors, submitted, handleChange, handleSubmit}

}

export default useValidation;