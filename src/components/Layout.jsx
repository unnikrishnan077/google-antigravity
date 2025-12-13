import React from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { BatteryFull, Wifi, SignalCellular4Bar, Menu, ArrowBack, Home, Square } from '@mui/icons-material';

const StatusBar = () => (
  <Box sx={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    px: 2,
    py: 0.5,
    bgcolor: '#000',
    color: '#fff',
    fontSize: '12px',
    height: '24px'
  }}>
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Typography variant="caption" sx={{ fontWeight: 'bold' }}>12:00</Typography>
    </Box>
    <Box sx={{ display: 'flex', gap: 1 }}>
      <SignalCellular4Bar fontSize="small" sx={{ fontSize: 16 }} />
      <Wifi fontSize="small" sx={{ fontSize: 16 }} />
      <BatteryFull fontSize="small" sx={{ fontSize: 16 }} />
    </Box>
  </Box>
);

const NavigationBar = () => (
  <Box sx={{
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '48px',
    bgcolor: '#000',
    color: '#fff'
  }}>
    <IconButton color="inherit" size="small"><ArrowBack /></IconButton>
    <IconButton color="inherit" size="small"><Home /></IconButton>
    <IconButton color="inherit" size="small"><Square sx={{ fontSize: 16 }} /></IconButton>
  </Box>
);

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw' }}>
      <StatusBar />

      {/* App Header */}
      <AppBar position="static" sx={{ height: 56, justifyContent: 'center' }}>
        <Toolbar variant="dense">
           <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <Menu />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }}>
            Antigravity IDE
          </Typography>
          {/* User Avatar Placeholder */}
          <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: '#5f6368', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>
            U
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content Area */}
      <Box sx={{ flex: 1, overflow: 'hidden', bgcolor: 'background.default' }}>
        {children}
      </Box>

      <NavigationBar />
    </Box>
  );
};

export default Layout;
