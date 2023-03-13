import { useState, useEffect } from 'react';
import { firebase } from '../firebase/firebase';

function LoginPage({isLoggedIn, setIsLoggedIn}) {
  useEffect(() => {
    // Persist the user's login state
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        console.log('User state persisted');
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      // Handle successful login
      setIsLoggedIn(true)
    } catch (error) {
      // Handle login error
      console.log(error);
    }
  };

  return (
    <div style={{display:'flex', justifyContent:'center'}}>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <br/>
        <input type="email" value={email} onChange={handleEmailChange} />
        <br/>
        <label>Password:</label>
        <br/>
        <input type="password" value={password} onChange={handlePasswordChange} />
        <br />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LoginPage;
