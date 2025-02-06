import UserProfile from '@/components/Profile'
import React from 'react'

type Props = {}

 async function page({}: Props) {
  return (
    <div>
        <UserProfile />
    </div>
  )
}

export default page