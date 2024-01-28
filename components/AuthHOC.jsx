'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import React, { useEffect } from 'react'

const AuthHOC = (Component) => {
    return function WithAuth(props) {
        const { data: session } = useSession()
        useEffect(() => {
            if (session) {
                redirect('/dashboard')
            }
        })
        if (session) return null
        return <Component {...props} />
    }
}

export default AuthHOC