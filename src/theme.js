import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#a8c7fa', // Google Blue 80 (Material 3)
    },
    secondary: {
      main: '#c4c7c5', // Google Grey
    },
    background: {
      default: '#1e1e1e', // VS Code-ish dark
      paper: '#252526',
    },
    text: {
      primary: '#e3e3e3',
      secondary: '#c4c7c5',
    },
    divider: '#444444',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    code: {
      fontFamily: '"JetBrains Mono", monospace',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#18181b', // Darker header
          backgroundImage: 'none',
          boxShadow: 'none',
          borderBottom: '1px solid #333',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1e1e1e',
          borderRight: '1px solid #333',
        },
      },
    },
  },
});

export default theme;
