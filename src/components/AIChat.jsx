import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './AIChat.css';

const AIChat = ({ onCodeGenerated }) => {
    const [apiKey, setApiKey] = useState(localStorage.getItem('gemini_api_key') || '');
    const [messages, setMessages] = useState([{ role: 'system', text: 'Welcome to Vibe Coding. Set your API key to start.' }]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const saveKey = (key) => {
        localStorage.setItem('gemini_api_key', key);
        setApiKey(key);
        setMessages([{ role: 'system', text: 'API Key saved. Let\'s vibe.' }]);
    };

    const sendMessage = async () => {
        if (!input.trim() || !apiKey) return;

        const userMsg = { role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });

            const result = await model.generateContent(input);
            const response = await result.response;
            const text = response.text();

            setMessages(prev => [...prev, { role: 'ai', text }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'error', text: 'Error: ' + error.message }]);
        } finally {
            setLoading(false);
        }
    };

    const renderMessageContent = (text) => {
        const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
        const parts = [];
        let lastIndex = 0;
        let match;

        while ((match = codeBlockRegex.exec(text)) !== null) {
            if (match.index > lastIndex) {
                parts.push({ type: 'text', content: text.substring(lastIndex, match.index) });
            }
            parts.push({ type: 'code', language: match[1], content: match[2] });
            lastIndex = match.index + match[0].length;
        }

        if (lastIndex < text.length) {
            parts.push({ type: 'text', content: text.substring(lastIndex) });
        }

        return parts.map((part, index) => {
            if (part.type === 'code') {
                return (
                    <div key={index} className="code-block">
                        <div className="code-header">
                            <span>{part.language || 'code'}</span>
                            <button
                                className="apply-btn"
                                onClick={() => onCodeGenerated(part.content)}
                            >
                                Apply
                            </button>
                        </div>
                        <pre>{part.content}</pre>
                    </div>
                );
            }
            return <span key={index}>{part.content}</span>;
        });
    };

    return (
        <div className="chat-container glass-panel">
            <div className="chat-header">
                <span>Vibe AI</span>
                <button className="settings-btn" onClick={() => setApiKey('')} title="Reset Key">⚙</button>
            </div>

            {!apiKey ? (
                <div className="api-key-screen">
                    <p>Enter your Google Gemini API Key</p>
                    <input
                        type="password"
                        placeholder="paste key here..."
                        onKeyDown={(e) => e.key === 'Enter' && saveKey(e.target.value)}
                    />
                    <small>Get one for free at aistudio.google.com</small>
                </div>
            ) : (
                <>
                    <div className="messages-list">
                        {messages.map((m, i) => (
                            <div key={i} className={`message ${m.role}`}>
                                <div className="message-content">
                                    {m.role === 'ai' ? renderMessageContent(m.text) : m.text}
                                </div>
                            </div>
                        ))}
                        {loading && <div className="message ai typing">Vibing...</div>}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="chat-input-area">
                        <input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && sendMessage()}
                            placeholder="Ask for code or vibes..."
                        />
                        <button onClick={sendMessage} disabled={loading}>➤</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default AIChat;
