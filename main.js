const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      minWidth: 500, // specify the minimum width of the window
      minHeight: 600, // specify the minimum height of the window
    })
  
    win.loadFile('test.html')
  }

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })