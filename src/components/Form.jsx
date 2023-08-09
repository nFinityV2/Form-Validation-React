import { ToastContainer, toast } from "react-toastify";
import Header from './Header'
import useValidation from "./useValidation";
import 'react-toastify/dist/ReactToastify.css';
import '../styles/form.css';
import Thanks from "./Thanks";

const validationForm = (values) => {
  const errors = {}
  const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#%^&*?])[a-zA-Z0-9!@#$%^&*]{8,}$/;
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  // Validate First Name and Last Name
  if (!values.firstName) {
    errors.firstName = 'Please enter your first name.'
  }
  else if(values.firstName.length < 3){
    errors.firstName = 'First name must 3 or more characters';
  }

  else if (!values.lastName) {
    errors.lastName = 'Please enter your last name.'
  }

  else if(values.lastName.length < 3){
    errors.lastName = 'Last name must be 3 or moe characters';
  }

  // Validate Email
  else if(!values.email){
    errors.email = "Invalid form, Email Address can not be empty";
  }
  else if(!emailRegex.test(values.email)){
    errors.email = "Wrong email format. Must contain '@'";
  }

  // Validate Password
  else if(!values.password){
    errors.password = "Password cannot be empty";
  }
  else if(values.password.length < 8){
    errors.password = "Invalid form, password must be greater than 8 characters";
  }
  else if(!passwordRegex.test(values.password)){
    errors.password =  "Password must be contain 1 uppercase letter, 1 lowercase letter and 1 symbol.";
  }

  return errors;
}

const handleFormSubmission = (values, handleSubmit) => {
  const validationErrors = validationForm(values);

  if(Object.keys(validationErrors).length === 0){
    handleSubmit();
    document.title = 'Thanks'
    toast.success('Submitted!')
  } else {
    Object.keys(validationErrors).forEach((field) => {
      const errorMessage = validationErrors[field];
      toast.error(errorMessage,{
        position: toast.POSITION.BOTTOM_CENTER
    })
    })
    
  }
}


const RandomForm = () => {
  // Document Title
  document.title = "Sign Up!"

  // Initialising the useValidation hook
  const {
    values,
    errors, 
    submitted, 
    handleChange,
    handleSubmit 
  } = useValidation({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }, validationForm);
  
  return (
    <div className="form-container">
      {!submitted && <Header/>}
      {!submitted ? 
      (
      <form onSubmit={(e) => {
        e.preventDefault();
        handleFormSubmission(values, handleSubmit)
        }}>
        <input
          className=""
          type="text"
          name="firstName"
          value={values.firstName}
          placeholder="First Name"
          onChange={handleChange}
        />
        {errors.firstName && 
        toast.error(errors.firstName)}
        <input
          className=""
          type="text"
          name="lastName"
          value={values.lastName}
          placeholder="Last Name"
          onChange={handleChange}
        />
        {errors.lastName && toast.error(errors.lastName)}
        <input
          className=""
          type="email"
          name="email"
          value={values.email}
          placeholder="Email"
          onChange={handleChange}
        />
        {errors.email && toast.error(errors.email)}
        <input
          className=""
          type="password"
          name="password"
          value={values.password}
          placeholder="Password"
          onChange={handleChange}
        />
        {errors.password && toast.error(errors.password)}
        <div className="submit">
          <button
            type="submit"
          >
            Sign up!
          </button>
          <ToastContainer autoClose={4500} theme="colored" limit={3} />
        </div>
      </form>) : <Thanks/>}
    </div>
  );
};

export default RandomForm;
