import React, { useState } from "react";
import LoginForm from "./components/login";
import SignupForm from "./components/signup";

function App() {
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleLoginButtonClick = () => {
    setShowLoginForm(!showLoginForm);
  };

  const [showSignupForm, setShowSignupForm] = useState(false);

  const handleSignupButtonClick = () => {
    setShowSignupForm(!showSignupForm);
  };

  return (
    <div>
      <h1>ImaginePix</h1>

      <button className="btn-primary" onClick={handleLoginButtonClick}>Login</button>

      <button onClick={handleSignupButtonClick}>Signup</button>

      {showLoginForm && <LoginForm />}

      {showSignupForm && <SignupForm />}
      
    </div>
  );
}

export default App;
