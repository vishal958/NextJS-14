"use client";

import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import Link from "@/components/LInk";
import { useSession } from "next-auth/react";

const Navbar = () => {
    const { data: session } = useSession();
    console.log('nav', session)
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Time Pass
                </Typography>
                <Link href="/" replace >
                    <Button color="inherit">Home</Button>
                </Link>
                <Link href="/dashboard" replace>
                    <Button color="inherit">Dashboard</Button>
                </Link>
                <Link href={!session ? '/login' : '/sign-out'} replace>
                    <Button color="inherit">{!session ? 'Login' : 'LogOut'}</Button>
                </Link>
                {!session && <Link href='/register' replace>
                    <Button color="inherit">Register</Button>
                </Link>}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;