"use client";
import styles from "./signin.module.css";
import React from 'react'
import  { useSession, signIn } from "next-auth/react"
import {useRouter} from "next/navigation"
import Link from "next/link";
import { faGooglePlusG, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { useState } from 'react';


const LoginPage = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { data, status} = useSession();

  const router = useRouter();

  if (status === "loading"){
    return <div className=''>Loading...</div>;
  }

  if (status === "authenticated"){
    router.push("/qr_scanner");
  }
  const login = async (e) => {
    e.preventDefault();
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
   <div className={styles.container} id={styles.container}>
  <div className={styles.formContainerSignIn}>
    <form>
      <h1 class="text-4xl font-bold dark:text-black">Sign In</h1>
      <div className={styles.socialIcons}>
        <div className={styles.icon} onClick={() => signIn("google")}>
              <FontAwesomeIcon icon={faGooglePlusG} />
            </div>
            <div className={styles.icon} onClick={() => signIn("github")}>
              <FontAwesomeIcon icon={faGithub} />
            </div>
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
      <p>{error}</p>
      <button onClick={(e) => login(e)
       }>Sign In</button>
       <p>Don't have an account? <Link href='/signup'>Create account</Link>  </p>

    </form>
  </div>
  <div className={styles.toggleContainer}>
    <div className={styles.toggle}>
      <div className={styles.togglePanelLeft}>
<h1 className="text-4xl font-bold dark:text-white">Welcome Back !</h1>
        <p>Enter your personal details to use all site features</p>
      </div>
    </div>
  </div>
</div>

  )
}

export default LoginPage