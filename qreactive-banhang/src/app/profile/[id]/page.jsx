"use client";
import axios from "axios";
import Link from "next/link";
import React, {useState} from "react";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";


export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("nothing")
    const logout = async () => {
        
            await axios.get('http://localhost:5000/logout')
            toast.success('Logout successful')
            router.push('/login')
        
    }

    const getUserDetails = async () => {
        const res = await axios.get('http://localhost:5000/user')
        console.log(res.data);
        setData(res.data.data._id)
    }

    return (
        <div >
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <h2>{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}
            </Link>}</h2>
        <hr />
        <button
        onClick={logout}
        >Logout</button>

        <button
        onClick={getUserDetails}
        >GetUser Details</button>


            </div>
    )
}