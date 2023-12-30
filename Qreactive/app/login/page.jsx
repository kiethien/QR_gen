"use client";

// pages/index.tsx

import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import styles from './styles.module.css';
import { useRouter } from 'next/navigation';



const SignIn = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');



  const login = async () => {
    try {
    const res = await axios.post("http://localhost:5000/login", {
      username,
      password
    });
    if (res.data === 'Username does not exist') {
      setError('Username does not exist');
    } else if (res.data === 'Wrong password') {
      setError('Wrong password');
    } else {
      // Clear any previous error
      setError('');

      if (res.data.error) {
        setError(res.data.error);
      } else {
        // Redirect to qr_generate page upon successful login
        router.push('/qr_scanner');
      }
    
    }
  } catch (err) {
    console.error(err);
    setError('Internal Server Error');
  }
}

  return (
      <>
      <div className={styles.all}>  
          
          <title>Sign In | AsmrProg</title>
  
          <div className={styles.container}id="container">
            <div className={'${styles[form-container]} ${styles[sign-in]}'}>
              <form>
                <h1>Sign In</h1>
                <div className={styles.social_icons}>
                  <a href="#" className={styles.icon}>
                    <i className={'${styles[fa-brands]} ${styles[fa-google-plus-g]}'}></i>
                  </a>
                  <a href="#" className={styles.icon}>
                    <i className={'${styles[fa-brands]} ${styles[fa-github]}'}></i>
                  </a>
                </div>
                <span>or use your email password</span>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" name="login" value="Login" onClick={login}>
                  Login
                </button>
                <p>
                  Don't have an account?<a href="signup.html" onClick={
                    () => {
                      window.location.href = 'signup.html';
                    }
                  }>Create account</a>
                </p>
              </form>
              <div style={{ color: 'red' }}>{error}</div>
            </div>
            <div >
              <div className={styles.toggle}>
                <div className={'${styles[toggle-panel]} ${styles[toggle-left]}'}>
                  <h1>Welcome Back!</h1>
                  <p>Enter your personal details to use all of site features</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
  );
};

export default SignIn;
