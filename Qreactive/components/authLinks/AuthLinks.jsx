"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Button from '@/components/Button'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthLinks = () => {
  // const [status, setStatus] = useState("unauthenticated");
  const router = useRouter();

//Add this part for authentication
  var status;
  function getCookie(cookieName) {
    if (typeof window !== 'undefined') {
      var name = cookieName + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var cookieArray = decodedCookie.split(';');
  
      for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0) {
          return cookie.substring(name.length, cookie.length);
        }
      }
    }
  
    return null;
  }
  
  function checkStatus() {
    const token = getCookie('token');
    if (token) {
      status = "authenticated";
      console.log('status2',status);
      console.log('token',token);
    } else {
      status = "unauthenticated";
  }}


    checkStatus();



const logout = async() => {
  //clear cookie
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  router.push("/");
  //get token from cookie
  const token = getCookie('token');
  console.log('status', status);
  signOut();
};
  return (
    <>
      {status === "unauthenticated" ? (
        <div className='lg:flex hidden'>
        <Link href="/login-page">
            <Button
            type='button'
            title='Login'
            icon='/user.svg'
            variant='btn_dark_green'
            />
        </Link>
        </div>
      ) : (
        <>
            <div className='lg:flex hidden' onClick={logout}>
                <Link href="/login-page">
                    <Button
                    type='button'
                    title='Logout'
                    icon='/user.svg'
                    variant='btn_dark_green'
                    />
                </Link>
            </div>
        </>
      )}
    </>
  );
};

export default AuthLinks;