import React from 'react'

function ProfileData({data}) {
  return (
    <div className='profile-data'>
        <div>
            <span>Name:</span>
            <p>{data?.name}</p>
            <span>last name:</span>
            <p>{data?.lastName}</p>
            <span>email:</span>
            <p>{data?.email}</p>
        </div>
    </div>
  )
}

export default ProfileData
