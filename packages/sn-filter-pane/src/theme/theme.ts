import { createTheme } from '@mui/material';

// TODO: Get theme from hosting app?
const theme = createTheme({
  typography: {
    fontSize: 14,
    htmlFontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontFamily: ['"Source Sans Pro"', '"Segoe UI"', '"Helvetica Neue"', '-apple-system', 'Arial', 'sans-serif'].join(','),
  },
});

export default theme;
