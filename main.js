const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      minWidth: 500, // specify the minimum width of the window
      minHeight: 600, // specify the minimum height of the window
      titleBarStyle: 'customButtonsOnHover',
  backgroundColor: '#333', // set the background color to a dark shade
  darkTheme: true, // use the dark theme for the window
    })
  
    win.loadFile('index.html')
  }


app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })