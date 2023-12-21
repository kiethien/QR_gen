"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Button from '@/components/Button'

const AuthLinks = () => {

  const { status } = useSession();

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
            <div className='lg:flex hidden' onClick={signOut}>
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