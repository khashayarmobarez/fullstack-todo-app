'use client'
import React, { useState } from 'react'
import {CgProfile} from 'react-icons/cg'
import ProfileForm from '@/components/module/ProfileForm'

function ProfilePage() {

    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = (e) => {
    }

  return (
    <div className='profile-form'>
        <h2>
            Profile
        </h2>
        <ProfileForm 
        name={name} 
        lastName={lastName}
        password={password}
        setName={setName}
        setLastName={setLastName}
        setPassword={setPassword}
        submitHandler={submitHandler} />
    </div>
  )
}

export default ProfilePage
