
'use client'

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useSession } from "next-auth/react"
import { useSearchParams, useRouter } from 'next/navigation'

import AuthHOC from '@/components/AuthHOC';
import Button from '@/components/MUIButton'
import TextInput from '@/components/MUIInput'
import { Alert, Grid, Paper, Typography } from '@mui/material';

const LoginPage = () => {
  const { status } = useSession() 
  const { handleSubmit, control, formState: { isValid } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onTouched',
  });
  console.log(status)

  const searchParams = useSearchParams()
  const search = searchParams.get('callbackUrl')
  const router = useRouter()
  const [error, setError] = useState(null);


  const onSubmit = async (data) => {
    setError(null)
    const signInResult = await signIn('credentials', {
      ...data,
      redirect: false,
    });
    if (signInResult.error) {
      // Set the error message if authentication fails
      setError('Invalid username or password');
    } else {
      router.replace(search || '/')
    }
  };

  return (
    <Grid p={1} as={Paper} container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '400px' }}>
      <Grid item xs={12}><Typography variant="h6" textAlign="center">Login</Typography></Grid>
      {error && <Grid item xs={12}><Alert severity="error">{error}</Alert></Grid>}
      <Grid item xs={12}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <Button sx={{ textAlign: "center" }} disabled={!isValid} type="submit">Sign In</Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default AuthHOC(LoginPage);
