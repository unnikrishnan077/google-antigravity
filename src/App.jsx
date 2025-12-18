import React, { useState } from 'react';
import CodeEditor from './components/CodeEditor';
import AIChat from './components/AIChat';
import './App.css'; // We'll make a minimal App.css

function App() {
  const [code, setCode] = useState(`// Welcome to Vibe Coder
// Relax and let the code flow...

function vibe() {
  console.log("Chill status: 100%");
}
`);

  return (
    <div className="app-container">
      <CodeEditor code={code} setCode={setCode} />
      <AIChat onCodeGenerated={setCode} />
    </div>
  );
}

export default App;
