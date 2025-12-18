import React from 'react';
import './CodeEditor.css';

const CodeEditor = ({ code, setCode }) => {
    return (
        <div className="editor-container">
            <div className="glass-panel editor-wrapper">
                <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    spellCheck="false"
                    className="code-textarea"
                    placeholder="// Start capturing your vibes..."
                />
                <div className="editor-glow" />
            </div>
        </div>
    );
};

export default CodeEditor;
