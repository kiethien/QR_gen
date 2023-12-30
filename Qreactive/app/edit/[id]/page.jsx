"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';




export default function UserProfile({params}) {
    const router = useRouter();
    const [data, setData] = useState({
      name: '',
      email: '',
      phone: '',
      website: '',
      company: '',
      position: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [website, setWebsite] = useState('');
    const [company, setCompany] = useState('');
    const [position, setPosition] = useState('');



    
    useEffect(() => {
      const fetchData = async () => {
        
        try {
          const response = await axios.get(`http://localhost:5000/profile/edit/${params.id}`);
          setData(response.data);
          setLoading(false);
          setName(response.data.name);
          setEmail(response.data.email);
          setPhone(response.data.phone);
          setWebsite(response.data.website);
          setCompany(response.data.company);
          setPosition(response.data.position);




        } catch (error) {
          console.error('Error fetching data: ', error);
          setError(error);
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(`http://localhost:5000/profile/edit/${params.id}`, {
          name,
          email,
          phone,
          website,
          company,
          position,
        });
        console.log(response);
        router.push('/qr_list');
      } catch (error) {
        console.error(error);
      }
    }

  return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <h1>Profile</h1>
        
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="phone">Phone</label>
          <input type="text" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <label htmlFor="website">Website</label>
          <input type="text" name="website" id="website" value={website} onChange={(e) => setWebsite(e.target.value)} />
          <label htmlFor="company">Company</label>
          <input type="text" name="company" id="company" value={company} onChange={(e) => setCompany(e.target.value)} />
          <label htmlFor="position">Position</label>
          <input type="text" name="position" id="position" value={position} onChange={(e) => setPosition(e.target.value)} />
          <button onClick={handleSubmit}>Submit</button>
      </div>
  )
}
