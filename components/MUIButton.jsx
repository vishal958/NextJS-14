import { Box, Button } from '@mui/material';

const MuiButton = ({
  onClick,
  variant = 'contained',
  children,
  color = 'primary',
  ...rest
}) => {
  return (
    <Box sx={{ padding: '10px', ...rest?.sx }}>
      <Button  variant={variant} color={color} onClick={onClick} {...rest}>
        {children}
      </Button>
    </Box>

  );
};

export default MuiButton;