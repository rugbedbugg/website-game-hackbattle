// Import necessary libraries
const { app, BrowserWindow } = require('electron');

function createWindow() {
    // Window variables
    const tileSize = 32;
    const rows = 16;
    const columns = 16;
    const boardWidth = tileSize * columns; // 32*16 = 512px
    const boardHeight = tileSize * rows; // 32*16 = 512px

    // Create the browser window
    const window = new BrowserWindow({
        width: boardWidth,
        height: boardHeight,
        title: "Space Invaders",
        resizable: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // Load the HTML file (assuming you have an HTML file for your game)
    window.loadFile('index.html');

    // Center the window
    window.center();

    // Emitted when the window is closed
    window.on('closed', function () {
        // Dereference the window object
        window = null;
    });
}

// This method will be called when Electron has finished initialization
app.whenReady().then(createWindow);

// Quit when all windows are closed
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// The SpaceInvaders game logic would go here or be imported from another file
// For example:
// const SpaceInvaders = require('./SpaceInvaders');
// let spaceInvaders = new SpaceInvaders();

