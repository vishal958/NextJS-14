'use client'
import MuiButton from '@/components/MUIButton';
import { Grid, Typography } from '@mui/material';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const SignoutPage = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item>
        <Typography variant='h4'>Sign Out</Typography>
        <Typography variant="h6">Are you sure you want to sign out?</Typography>
        <MuiButton onClick={handleSignOut}>Sign Out</MuiButton>
      </Grid>
    </Grid>
  );
};

export default SignoutPage;
