"use client";
import Button from '@/components/Button'
import React from 'react'
import  { useSession, signIn } from "next-auth/react"
import {useRouter} from "next/navigation"

const LoginPage = () => {
  const { data, status} = useSession();

  const router = useRouter();

  if (status === "loading"){
    return <div className=''>Loading...</div>;
  }

  if (status === "authenticated"){
    return <div className=''>Loading...</div>;
  }
  return (
    <div className='container border-2 flexCenter flex-col px-16'>
      <div  className="border-2" onClick={()=>signIn("google") }>
        <Button
          type='button'
          title='Login with Google'
          icon='/user.svg'
          variant='btn_dark_green'
        />
      </div>

      <div  className="border-2" onClick={()=>signIn("github") }>
        <Button
          type='button'
          title='Login with Github'
          icon='/user.svg'
          variant='btn_dark_green'
        />
      </div>
    </div>
  )
}

export default LoginPage