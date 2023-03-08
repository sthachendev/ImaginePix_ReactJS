import { useState } from "react";
import { firebase } from "../firebase/firebase";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleDobChange = (event) => {
    setDob(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      // Do something with the newly created user object
      alert('user created')
    } catch (error) {
      console.error(error);
      // Handle signup error
      alert('error')
    }
  };
  

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <br />
        <input type="email" value={email} onChange={handleEmailChange} />

        <br />
        <label>First Name:</label>
        <br />
        <input type="text" value={firstName} onChange={handleFirstNameChange} />

        <br />
        <label>Last Name:</label>
        <br />
        <input type="text" value={lastName} onChange={handleLastNameChange} />

        <br />
        <label>Date of Birth:</label>
        <br />
        <input type="date" value={dob} onChange={handleDobChange} />
        <br />

        <label>Password:</label>
        <br />
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />
        <label>Confirm Password:</label>
        <br />
        <input
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />

        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupForm;
