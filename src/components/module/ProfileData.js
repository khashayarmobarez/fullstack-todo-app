import React from 'react'

function ProfileData({data}) {
  return (
    <div className='profile-data'>
        <div>
            <span>Name:</span>
            <p>name: {data.data.name}</p>
            <p>last name:{data.data.lastName}</p>
            <p>email: {data.data.email}</p>
        </div>
    </div>
  )
}

export default ProfileData
