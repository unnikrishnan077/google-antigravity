import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Box } from '@mui/material';

const EditorPanel = ({ code, language = 'javascript' }) => {
  return (
    <Box sx={{ height: '100%', overflow: 'auto', fontSize: '14px' }}>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{ margin: 0, height: '100%', borderRadius: 0 }}
        showLineNumbers={true}
      >
        {code || '// Waiting for agent to generate code...'}
      </SyntaxHighlighter>
    </Box>
  );
};

export default EditorPanel;
