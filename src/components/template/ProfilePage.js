'use client'
import React, { useEffect, useState } from 'react'
import {CgProfile} from 'react-icons/cg'
import ProfileForm from '@/components/module/ProfileForm'
import ProfileData from '../module/ProfileData'

function ProfilePage() {

    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [data, setData] = useState(null)

    useEffect(() => {
        fetchProfile();
    }, [])

    const fetchProfile = async () => {
        const res = await fetch("/api/profile");
        const data = await res.json();
        if(data.status === "success" && data.data.name && data.data.lastName) {
            setData(data.data)
        }
    }

    const submitHandler = async(e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/profile", {
                method: "POST",
                body: JSON.stringify({name, lastName, password}),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            
            const result = await res.json();
            console.log(result);
            
            if (result.status === "success") {
                // Clear form fields after successful update
                setName('');
                setLastName('');
                setPassword('');
                // Fetch updated profile data
                await fetchProfile();
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    }

  return (
    <div className='profile-form'>
        <h2>
            Profile
        </h2>
        {
        data ?
            <ProfileData data={data}/>
            :
            <ProfileForm 
            name={name} 
            lastName={lastName}
            password={password}
            setName={setName}
            setLastName={setLastName}
            setPassword={setPassword}
            submitHandler={submitHandler} />
        }
    </div>
  )
}

export default ProfilePage
