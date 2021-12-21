const { app, BrowserWindow } = require('electron')
 
function createWindow() {
    const win = new BrowserWindow({
        width: 1024,
        height: 960,
        webPreferences: {
            nodeIntegration: true
        },
		icon: __dirname + '/favicon.ico'
    })
	win.setMenuBarVisibility(false);
    win.loadFile('index.html');
}
 
app.whenReady().then(createWindow)