import validator from "validator"
import isEmpty from 'utils/is-empty'

export default function validateRegisterInput(data) {
    let errors = {};

    data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
    data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : "";

    // if (!validator.isLength(data.firstName, { min: 2, max: 30 })) {
    //     errors.firstName = "First name must be between 2 and 30 characters";
    // }
    // if (!validator.isLength(data.lastName, { min: 2, max: 30 })) {
    //     errors.lastName = "Last name must be between 2 and 30 characters";
    // }
    if (!validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    // if (!validator.isLength(data.password, { min: 6 })) {
    //     errors.password = "Password must be atleast 6 characters";
    // }

    if (!validator.equals(data.password, data.confirmPassword)) {
        errors.confirmPassword = "Passwords must match";
    }

    if (validator.isEmpty(data.firstName)) {
        errors.firstName = "First name field is required";
    }
    if (validator.isEmpty(data.lastName)) {
        errors.lastName = "Last name field is required";
    }
    if (validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }
    if (validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    if (validator.isEmpty(data.confirmPassword)) {
        errors.confirmPassword = "Confirm password field is required";
    }
    if (validator.isEmpty(data.businessPhone)) {
        errors.businessPhone = "Phone number field is required";
    }
    if (validator.isEmpty(data.businessName)) {
        errors.businessName = "Company field is required";
    }
    if (validator.isEmpty(data.businessJob)) {
        errors.businessJob = "Job field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};