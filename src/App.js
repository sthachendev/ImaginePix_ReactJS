import React, { useState, useEffect } from "react";
import LoginForm from "./components/login";
import SignupForm from "./components/signup";
import Upload from './components/upload';
import 'bootstrap/dist/css/bootstrap.min.css';
import PostList from "./components/postList";
import Header from "./components/header";
import { Modal } from 'react-bootstrap';

function App() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginButtonClick = () => {
    setShowLoginForm(!showLoginForm);
  };
  
  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("loggedIn", isLoggedIn);
  }, [isLoggedIn]);
  

  const handleSignupButtonClick = () => {
    setShowSignupForm(!showSignupForm);
  };

  const handlePostButtonClick = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <div style={{marginTop:'80px'}}></div>

      {/* display the login & sign up btn when user is not logged in */}
      {!isLoggedIn &&
        <div className='d-flex justify-content-around'>
          <button className="btn btn-sm btn-outline-secondary" onClick={handleLoginButtonClick}>Login</button>
          <button className="btn btn-sm btn-outline-primary" onClick={handleSignupButtonClick}>Signup</button>
          {showLoginForm && <LoginForm isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}
          {showSignupForm && <SignupForm/>}
        </div>
      }

      <button className="btn btn-sm btn-outline-primary" onClick={handlePostButtonClick}>Post</button>
      
      <Modal show={showModal} onHide={handlePostButtonClick}>
        <Modal.Header closeButton>
          <Modal.Title>Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Upload />
        </Modal.Body>
      </Modal>
      
      <hr/>
      <PostList />
    </div>
  );
}

export default App;
