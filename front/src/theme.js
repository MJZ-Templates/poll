// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // 또는 'dark'
    primary: {
      main: '#1976d2', // 파란색
    },
    secondary: {
      main: '#f50057', // 분홍색
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    button: {
      textTransform: 'none',
    },
  },
});

export default theme;
