import { useState } from "react";
import { firebase } from "../firebase/firebase";
import { Form, Button } from 'react-bootstrap';

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
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      // Set user profile properties
      await user.updateProfile({
        displayName: `${firstName} ${lastName}`,
        email: email,
        photoURL : 'https://firebasestorage.googleapis.com/v0/b/imaginepix-657fb.appspot.com/o/profile_pictures%2Fdeafult%20pic.png?alt=media&token=45095a8e-c1ea-42ad-a76c-ec408f7d1569',
        
      });
      // Do something with the newly created user object
      alert("user created");
    } catch (error) {
      console.error(error);
      // Handle signup error
      alert("error");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" value={email} onChange={handleEmailChange} />
        </Form.Group>

        <Form.Group controlId="firstName">
          <Form.Label>First Name:</Form.Label>
          <Form.Control type="text" value={firstName} onChange={handleFirstNameChange} />
        </Form.Group>

        <Form.Group controlId="lastName">
          <Form.Label>Last Name:</Form.Label>
          <Form.Control type="text" value={lastName} onChange={handleLastNameChange} />
        </Form.Group>

        <Form.Group controlId="dob">
          <Form.Label>Date of Birth:</Form.Label>
          <Form.Control type="date" value={dob} onChange={handleDobChange} />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" value={password} onChange={handlePasswordChange} />
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
        </Form.Group>

        <Button variant="primary" className="btn-sm mt-2" type="submit">Sign Up</Button>
      </Form>
    </div>
  );
}

export default SignupForm;
