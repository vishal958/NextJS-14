
'use client'

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation'

import AuthHOC from '@/components/AuthHOC';
import Button from '@/components/MUIButton'
import TextInput from '@/components/MUIInput'
import { Alert, Grid, Paper, Typography } from '@mui/material';

const SignupPage = () => {
    const { handleSubmit, control, formState: { isValid } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'onTouched',
    });
    const router = useRouter()
    const [error, setError] = useState(null);

    const onSubmit = async (data) => {
        setError(null)
        const res = await fetch("/api/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...data
            }),
        });
        const result = await res.json()
        if (result.error) {
            // Set the error message if authentication fails
            setError(result.error);
        } else {
            router.push('/login')
        }
    };

    return (
        <Grid p={1} as={Paper} container alignItems="center" justifyContent="center" spacing={2}>
            <Grid item xs={12}><Typography textAlign="center">Please Register</Typography></Grid>
            {error && <Grid item xs={12}><Alert severity="error">{error}</Alert></Grid>}
            <Grid item xs={12}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextInput
                        fullWidth
                        control={control}
                        name="username"
                        label="User Name"
                        rules={{
                            required: 'UserName is required',
                            minLength: { value: 3, message: 'Min length is 3' },
                        }}
                    />
                    <TextInput
                        fullWidth
                        control={control}
                        name="email"
                        label="Email"
                        rules={{
                            required: 'Email is required',
                            minLength: { value: 3, message: 'Min length is 3' },
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: 'Invalid email address',
                            },
                        }}
                    />

                    <TextInput
                        control={control}
                        name="password"
                        label="Password"
                        type="password"
                        rules={{
                            required: 'Password field is required',
                            minLength: { value: 3, message: 'Min length is 3' },
                            pattern: '',
                        }}
                    />
                    <Button sx={{ textAlign: 'center' }} disabled={!isValid} type="submit">Sign Up</Button>
                </form>
            </Grid>
        </Grid>
    );
};

export default AuthHOC(SignupPage);
