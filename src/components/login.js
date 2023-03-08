import { useState } from 'react';
import { firebase } from '../firebase/firebase';

function LoginForm() {
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
      alert('logged in')
    } catch (error) {
      // Handle login error
      console.log(error)

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

export default LoginForm;
