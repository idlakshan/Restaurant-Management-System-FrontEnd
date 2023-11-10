const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1630,
        height: 860,
        webPreferences: {
            nodeIntegration: false, // Disable nodeIntegration in the renderer process
            preload: path.join(__dirname, 'preload.js'), // Load the preload script
        },
    });

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file:',
            slashes: true,
        })
    );

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

// Handle login event from renderer process
ipcMain.on('login', (event, args) => {
    console.log('Received login request:', args.username, args.password);

    // Here, you can perform authentication logic, e.g., check username and password
    const isAuthenticated = args.username === 'admin' && args.password === '1234';
    if (isAuthenticated) {
        // Load admin dashboard
        event.sender.loadURL('./src/views/admin-dashboard.html');
    }
});


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
