import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, TextField, IconButton, Paper, Switch, FormControlLabel, Avatar } from '@mui/material';
import { Send, AutoAwesome, SmartToy } from '@mui/icons-material';
import useAgent from '../hooks/useAgent';

const AgentManager = () => {
  const [input, setInput] = useState('');
  const { messages, sendMessage, isTyping, mode, toggleMode } = useAgent();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header for Agent Manager */}
      <Box sx={{ p: 2, borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="subtitle1" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AutoAwesome fontSize="small" color="primary" /> Agent Manager
        </Typography>
        <FormControlLabel
          control={<Switch checked={mode === 'fast'} onChange={toggleMode} size="small" />}
          label={<Typography variant="caption">{mode === 'fast' ? 'Fast' : 'Plan'}</Typography>}
        />
      </Box>

      {/* Chat Area */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {messages.map((msg, index) => (
          <MessageItem key={index} msg={msg} />
        ))}
        {isTyping && (
           <Box sx={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 1 }}>
             <Avatar sx={{ width: 24, height: 24, bgcolor: 'transparent' }}><SmartToy fontSize="small" color="primary" /></Avatar>
             <Typography variant="caption" color="text.secondary">Thinking...</Typography>
           </Box>
        )}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input Area */}
      <Box sx={{ p: 1.5, borderTop: '1px solid #333', bgcolor: 'background.paper' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: '#333', borderRadius: 4, px: 2, py: 0.5 }}>
          <TextField
            fullWidth
            variant="standard"
            placeholder="Describe your task..."
            InputProps={{ disableUnderline: true }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isTyping}
            multiline
            maxRows={4}
          />
          <IconButton color="primary" onClick={handleSend} disabled={!input.trim() || isTyping}>
            <Send />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

// Memoized component to prevent unnecessary re-renders of existing messages
// when the parent state updates (e.g., input changes)
const MessageItem = React.memo(({ msg }) => (
  <Box sx={{
    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
    maxWidth: '85%'
  }}>
    <Paper sx={{
      p: 1.5,
      borderRadius: 2,
      bgcolor: msg.sender === 'user' ? 'primary.dark' : 'background.paper',
      color: 'text.primary'
    }}>
      <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>{msg.text}</Typography>
    </Paper>
    <Typography variant="caption" sx={{ color: 'text.secondary', ml: 1, fontSize: '0.7rem' }}>
      {msg.sender === 'agent' ? 'Gemini 3 Pro' : 'You'}
    </Typography>
  </Box>
));

export default AgentManager;
