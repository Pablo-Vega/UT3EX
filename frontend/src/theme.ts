import { createTheme, ThemeOptions } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#1a73e8',
    },
    secondary: {
      main: '#ffc107',
    },
    error: {
      main: '#d32f2f',
    },
    success: {
      main: '#388e3c',
    },
    warning: {
      main: '#f57c00',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
    background: {
      default: '#fafafa',
    },
  },
};

const theme = createTheme(themeOptions);
export default theme;