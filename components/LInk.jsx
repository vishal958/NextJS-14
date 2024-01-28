import { Box } from '@mui/material';
import Link from "next/link";

const NextLink = ({
    children,
    color = 'primary',
    ...rest
}) => {
    return (

        <Link style={{ color: '#fff' }}{...rest}>
            {children}
        </Link>

    );
};

export default NextLink;