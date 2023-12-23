"use client";

// pages/index.tsx

import React from 'react';
import Link from 'next/link';
import { response } from 'express';
import { useState } from 'react';

const[username, setUsername] = useState("");
const[password, setPassword] = useState("");


const SignIn = () => {
    
  return (
    <div >
      <div>
        <form>
          <h1>Sign In</h1>
          <div >
          </div>
          <span>or use your email password</span>
          <input type="text" name="username" id="username" placeholder="Enter your username" />
          <input type="password" name="password" id="password" placeholder="Enter your password" />
          <button type="button" name="login" value="Login" onClick={login}>Login</button>
        </form>

      </div>

      <div>
        <div>
          <div>
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of the site features</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
