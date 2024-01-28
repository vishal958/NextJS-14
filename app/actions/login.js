'use server'

import { signIn } from 'next-auth/react';

export async function doLogin(data) {
    const signInResult = await signIn('credentials', {
        ...data,
        redirect: false,
    });
    return signInResult
}