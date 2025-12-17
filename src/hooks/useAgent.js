import { create } from 'zustand';

// Simple store for global state management if needed across components
const useStore = create((set) => ({
    generatedCode: '',
    setGeneratedCode: (code) => set({ generatedCode: code }),
    messages: [],
    addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
    mode: 'plan', // 'plan' or 'fast'
    setMode: (mode) => set({ mode }),
    isTyping: false,
    setIsTyping: (status) => set({ isTyping: status })
}));

const useAgent = () => {
  const { generatedCode, setGeneratedCode, messages, addMessage, mode, setMode, isTyping, setIsTyping } = useStore();

  const toggleMode = () => {
    setMode(mode === 'plan' ? 'fast' : 'plan');
  };

  const simulateAgentResponse = async (userPrompt) => {
    setIsTyping(true);

    // Simulate network delay / "thinking" time
    const thinkingTime = mode === 'fast' ? 1000 : 2500;
    await new Promise(resolve => setTimeout(resolve, thinkingTime));

    let responseText = '';
    let code = '';

    // Simple keyword matching for demo purposes
    const lowerPrompt = userPrompt.toLowerCase();

    if (lowerPrompt.includes('snake')) {
        responseText = mode === 'plan'
            ? "I've analyzed your request. To build a Snake game, I will:\n1. Create an HTML5 Canvas.\n2. Implement the game loop.\n3. Handle keyboard input.\n4. Add collision detection.\n\nHere is the implementation."
            : "Generating Snake game...";
        code = `<!DOCTYPE html>
<html>
<head>
    <title>Snake Game</title>
    <style>
        body { display: flex; justify-content: center; align-items: center; height: 100vh; background: #222; margin: 0; color: white; font-family: sans-serif; }
        canvas { border: 2px solid #555; background: #000; }
    </style>
</head>
<body>
    <canvas id="game" width="400" height="400"></canvas>
    <script>
        const canvas = document.getElementById('game');
        const ctx = canvas.getContext('2d');

        let tileCount = 20;
        let gridSize = canvas.width / tileCount - 2;
        let headX = 10;
        let headY = 10;
        let velocityX = 0;
        let velocityY = 0;

        let appleX = 5;
        let appleY = 5;

        let trail = [];
        let tailLength = 5;

        function drawGame() {
            changeSnakePosition();
            let result = isGameOver();
            if(result) return;

            clearScreen();
            checkAppleCollision();
            drawApple();
            drawSnake();
            setTimeout(drawGame, 1000 / 10);
        }

        function isGameOver() {
            let gameOver = false;
            if(velocityX === 0 && velocityY === 0) return false;

            if(headX < 0 || headX === tileCount || headY < 0 || headY === tileCount) gameOver = true;

            for(let i = 0; i < trail.length; i++) {
                if(trail[i].x === headX && trail[i].y === headY) gameOver = true;
            }

            if(gameOver) {
                ctx.fillStyle = "white";
                ctx.font = "50px Verdana";
                ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
            }
            return gameOver;
        }

        function clearScreen() {
            ctx.fillStyle = 'black';
            ctx.fillRect(0,0,canvas.width,canvas.height);
        }

        function drawSnake() {
            ctx.fillStyle = 'lime';
            for(let i = 0; i < trail.length; i++) {
                ctx.fillRect(trail[i].x * tileCount, trail[i].y * tileCount, gridSize, gridSize);
            }

            trail.push({x: headX, y: headY});
            while(trail.length > tailLength) {
                trail.shift();
            }
        }

        function changeSnakePosition() {
            headX = headX + velocityX;
            headY = headY + velocityY;
        }

        function drawApple() {
            ctx.fillStyle = "red";
            ctx.fillRect(appleX * tileCount, appleY * tileCount, gridSize, gridSize);
        }

        function checkAppleCollision() {
            if(appleX === headX && appleY === headY) {
                appleX = Math.floor(Math.random() * tileCount);
                appleY = Math.floor(Math.random() * tileCount);
                tailLength++;
            }
        }

        document.body.addEventListener('keydown', keyDown);

        function keyDown(event) {
            // up
            if(event.keyCode == 38) {
                if(velocityY == 1) return;
                velocityY = -1;
                velocityX = 0;
            }
            // down
            if(event.keyCode == 40) {
                if(velocityY == -1) return;
                velocityY = 1;
                velocityX = 0;
            }
            // left
            if(event.keyCode == 37) {
                if(velocityX == 1) return;
                velocityY = 0;
                velocityX = -1;
            }
            // right
            if(event.keyCode == 39) {
                if(velocityX == -1) return;
                velocityY = 0;
                velocityX = 1;
            }
        }

        drawGame();
    </script>
</body>
</html>`;
    } else if (lowerPrompt.includes('hello') || lowerPrompt.includes('hi')) {
        responseText = "Hello! I'm Gemini 3 Pro. I can help you build web applications, games, or fix bugs. Try asking me to 'create a snake game' or 'make a portfolio page'.";
    } else {
        responseText = "I'm a simulated agent for this demo. Try asking me to 'create a snake game' to see the 'Vibe Coding' in action!";
        code = `// Example generated code for: ${userPrompt}\nconsole.log("Action performed");`;
    }

    addMessage({ text: responseText, sender: 'agent' });
    if (code) {
        setGeneratedCode(code);
    }
    setIsTyping(false);
  };

  const sendMessage = (text) => {
    addMessage({ text, sender: 'user' });
    simulateAgentResponse(text);
  };

  return {
    messages,
    sendMessage,
    generatedCode,
    isTyping,
    mode,
    toggleMode
  };
};

export default useAgent;
