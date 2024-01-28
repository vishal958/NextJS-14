"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'

const AuthProvider = ({ children }) => {
    const { data: session } = useSession();
    const router = useRouter()
    return session ? router?.push('/dashboard') : <>{children}</>;
};

export default AuthProvider;