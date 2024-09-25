const { app, BrowserWindow } = require('electron');

function createWindow() {
    const boardWidth = 360;
    const boardHeight = 640;

    const win = new BrowserWindow({
        width: boardWidth,
        height: boardHeight,
        resizable: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadURL('file://' + __dirname + '/index.html'); // Assuming you have an index.html file for your Flappy Bird game
    win.center();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

