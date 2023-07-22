import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Header from './Header'
import 'react-toastify/dist/ReactToastify.css';
import '../styles/form.css';

const RandomForm = () => {
  // Document Title
  document.title = "Sign Up!"

  /* Form functions */
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false)
 
  function validationForm(e) {
    e.preventDefault();
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#%^&*?])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    // Validate First Name
    if (firstName.length === 0) {
      toast.error("Please enter your first name", {
        position: toast.POSITION.BOTTOM_CENTER
      });
      return;
    }

    // Validate Last Name
    else if (lastName.length === 0) {
      toast.error("Please enter your last name", {
        position: toast.POSITION.BOTTOM_CENTER
      });
      return;
    }

    // Validate Email
    else if(email.length === 0){
      toast.error("Invalid form, Email Address can not be empty", {
        position: toast.POSITION.BOTTOM_CENTER
      });
      return;
    }
    else if(!emailRegex.test(email)){
      toast.error("Invalid form, wrong email format. Must contain '@'", {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }

    // Validate Password
    else if(password.length < 8){
      toast.error("Invalid form, password must be greater than 8 characters", {
        position: toast.POSITION.BOTTOM_CENTER
      });
      return;
    }
    else if(!passwordRegex.test(password)){
      toast.error("Password must be contain 1 uppercase letter, 1 lowercase letter and 1 symbol.", {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
    else {
      setSubmitted(true)
      document.title = 'Thanks!'
      toast.success("Submitted!")
    }
  }
  
  return (
    <div className="form-container">
      { !submitted && <Header/>}
      {!submitted ? 
      (
      <form method="submit" onSubmit={validationForm}>
        <input
          className=""
          type="text"
          name="firstName"
          value={firstName}
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          className=""
          type="text"
          name="lastName"
          value={lastName}
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          className=""
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className=""
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="submit">
          <button
            type="submit"
            onClick={() => {
              validationForm();
            }}
          >
            Sign up!
          </button>
          <ToastContainer autoClose={4500} theme="colored" limit={3} />
        </div>
      </form>) : (
        <section className="thanks">
          <h1>Thank you!</h1>
          <h2>Thanks for subscribing! Newsletters will be emailed to you fortnightly every Tuesday!</h2>
        </section>
      )}
    </div>
  );
};

export default RandomForm;
