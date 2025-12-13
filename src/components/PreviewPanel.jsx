import React from 'react';
import { Box, Typography } from '@mui/material';

const PreviewPanel = ({ code }) => {
  // In a real app, this would execute the code safely in an iframe or sandbox.
  // For this simulation, we'll try to render HTML if it looks like HTML, otherwise show a placeholder.

  const isHtml = code && code.trim().startsWith('<');

  return (
    <Box sx={{ height: '100%', bgcolor: '#fff', color: '#000', overflow: 'hidden', position: 'relative' }}>
        {isHtml ? (
            <iframe
                srcDoc={code}
                style={{ width: '100%', height: '100%', border: 'none' }}
                title="Preview"
            />
        ) : (
             <Box sx={{
                 display: 'flex',
                 flexDirection: 'column',
                 alignItems: 'center',
                 justifyContent: 'center',
                 height: '100%',
                 p: 2,
                 textAlign: 'center'
             }}>
                 <Typography variant="h6" color="text.secondary">App Preview</Typography>
                 <Typography variant="body2" color="text.secondary">
                     {code ? 'Output available (Simulation Only)' : 'No code generated yet.'}
                 </Typography>
             </Box>
        )}
    </Box>
  );
};

export default PreviewPanel;
