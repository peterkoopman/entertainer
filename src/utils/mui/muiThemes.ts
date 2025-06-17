import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          width: '100%',
          marginBottom: '1rem',
          marginTop: '1rem',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          marginRight: '1rem',
        },
      },
    },
  },
});
