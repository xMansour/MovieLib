const { app, BrowserWindow } = require('electron')
const path = require('path')
const createWindow = () => {
    const win = new BrowserWindow({
        width: 900,
        height: 700,

        webPreferences: {
            nodeIntegration: true,    //gives access to the nodeJS api
            contextIsolation: false,
            enableRemoteModule: true,
            preload: path.join(__dirname, 'scripts/preload.js')
        }
    });

    win.loadFile('index.html');
    win.setMenuBarVisibility(false);
}
app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})