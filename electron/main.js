import { app, BrowserWindow } from 'electron'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        titleBarStyle: 'hiddenInset',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false
        },
        backgroundColor: '#0a0a0a',
        icon: path.join(__dirname, '../public/vite.svg')
    });

    if (!app.isPackaged) {
        win.loadURL('http://localhost:5173');
    } else {
        win.loadFile(path.join(__dirname, '../dist/index.html'));
    }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
