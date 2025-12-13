import React from 'react';
import Layout from './components/Layout';
import AgentManager from './components/AgentManager';
import Workspace from './components/Workspace';
import { Box, useMediaQuery, useTheme } from '@mui/material';

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Layout>
      <Box sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        height: '100%',
        overflow: 'hidden'
      }}>
        <Box sx={{
          width: isMobile ? '100%' : '350px',
          height: isMobile ? '50%' : '100%',
          borderRight: isMobile ? 'none' : `1px solid ${theme.palette.divider}`,
          borderBottom: isMobile ? `1px solid ${theme.palette.divider}` : 'none',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <AgentManager />
        </Box>
        <Box sx={{
          flex: 1,
          height: isMobile ? '50%' : '100%',
          position: 'relative'
        }}>
          <Workspace />
        </Box>
      </Box>
    </Layout>
  );
}

export default App;
