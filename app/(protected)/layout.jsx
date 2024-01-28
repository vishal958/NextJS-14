import { Box } from "@mui/material";

export const metadata = {
    title: "Time Pass",
    description: "Time Pass",
};

export default async function ProtectedLayout({ children }) {
    return (
        <Box sx={{ display: 'flex', height: '80vh', alignItems: 'center', justifyContent: 'center' }}>
            {children}
        </Box>
    );
}
