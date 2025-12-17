import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { Code, Preview } from '@mui/icons-material';
import EditorPanel from './EditorPanel';
import PreviewPanel from './PreviewPanel';
import useAgent from '../hooks/useAgent';

const Workspace = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const { generatedCode } = useAgent();

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
        <Tabs value={tabIndex} onChange={handleTabChange} aria-label="workspace tabs" textColor="primary" indicatorColor="primary">
          <Tab icon={<Code fontSize="small"/>} iconPosition="start" label="Code" sx={{ minHeight: 48 }} />
          <Tab icon={<Preview fontSize="small"/>} iconPosition="start" label="Preview" sx={{ minHeight: 48 }} />
        </Tabs>
      </Box>
      <Box sx={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <Box sx={{ display: tabIndex === 0 ? 'block' : 'none', height: '100%' }}>
          <EditorPanel code={generatedCode} />
        </Box>
        <Box sx={{ display: tabIndex === 1 ? 'block' : 'none', height: '100%' }}>
          <PreviewPanel code={generatedCode} />
        </Box>
      </Box>
    </Box>
  );
};

export default Workspace;
