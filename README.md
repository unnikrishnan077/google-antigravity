# Vibe Coder

**Vibe Coder** is a high-aesthetic, local-first code editor powered by Google's Gemini AI. Built with Electron, React, and Vite, it allows you to code in a "flow state" with intelligent AI assistance always at your fingertips.

## Features

- **Gemini AI Integration**: Chat with the latest Gemini models directly in your editor.
- **Vibe Checks**: Get instant feedback and code generation.
- **Apply Code**: One-click apply generated code to your editor.
- **Glassmorphism UI**: A stunning, modern interface designed for focus.
- **Local & Secure**: Your API key stays on your machine.

## Setup

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Run Locally (Dev Mode)**
    Start the Vite dev server and Electron app:
    ```bash
    npm run electron
    ```

3.  **Build for Production**
    Generate an executable for your OS:
    ```bash
    npm run dist
    ```

## Configuration

**API Key**: You need a Google Gemini API Key.
- Get one for free at [Google AI Studio](https://aistudio.google.com/).
- Enter it in the app's settings (gear icon). It is saved locally to your machine.

## Tech Stack

- **Electron**
- **Vite**
- **React**
- **Google Generative AI SDK**
