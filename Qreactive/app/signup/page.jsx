"use client";
import styles from "./signup.module.css";
import React from "react";
import Link from "next/link";
import { faGooglePlusG, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from "next/navigation";


const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const register = async (e) => {
    e.preventDefault();
    try {
      // Clear any previous error
      setError('');
      
      const res = await axios.post("http://localhost:5000/user/register", {
        username,
        password,
        email
      });
      if (res.data === 'Username already exists') {
        setError('Username already exists');
      } else if (res.data === 'Email already exists') {
        setError('Email already exists');
      } else if (res.data === 'success') {
    
        
        // const token = res.data;
        console.log('success');
        //set the toke to cookie
        // document.cookie = `token=${token}`;
        // console.log(token);
        // Redirect to qr_generate page upon successful login
        router.push('/login-page');
          
        
      
      }
    } catch (err) {
      console.error(err);
      setError('Internal Server Error');
    }
  }

  return (
    <div className={styles.container} id={styles.container}>
      <div className={styles.formContainerSignUp}>
        <form>
          <h1 className="text-4xl font-bold dark:text-black">Create Account</h1>
          <div className={styles.socialIcons}>
            <div className={styles.icon}>
              <FontAwesomeIcon icon={faGooglePlusG} />
            </div>
            <div className={styles.icon}>
              <FontAwesomeIcon icon={faGithub} />
            </div>
          </div>
          <span>or use your email for registration</span>
          <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <p className="text-red-500">{error}</p>
          <button onClick={(e) => register(e)
       }>Sign Up</button>
          <p>
            Already have an account? <Link href="/login-page">Login here</Link>
          </p>
        </form>
      </div>
      <div className={styles.toggleContainer}>
        <div className={styles.toggle}>
          <div className={styles.togglePanelRight}>
            <h1 className="text-4xl font-bold dark:text-white">
              Hello, Friend!
            </h1>
            <p>Register with your personal details to use all site features</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
