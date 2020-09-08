const electron = require('electron')
const { app, BrowserWindow, ipcMain } = electron
const isDev = (process.env.NODE_ENV === 'development') ? true:false;

const Client = require('./tcp/Client.js')
const client = new Client();

if(isDev) {
  require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/../node_modules/electron`)
  });
}

let mainWindow = null

function createWindow() {
  let mainURL = (isDev) ? 'http://localhost:4242/app':`file://${__dirname}/index.html`

  mainWindow = new BrowserWindow({width: 750, height: 750, minWidth: 750, minHeight: 675, icon: './assets/icon.png'})
  mainWindow.loadURL(mainURL)
  mainWindow.setMenuBarVisibility(false)
  // mainWindow.webContents.openDevTools()
}

app.on('ready', () => {
  createWindow();

  ipcMain.on('login', (e, config) => {
    client.connectToServer(config, () => {
      e.sender.send('reply_login', {message: client.response, isLogged: client.connected});
    });
  })

  ipcMain.on('command', (e, payload) => {
    client.command(payload.type, payload.data, () => {
      console.log('**** PREPARING REPLY : *****');
      console.log(client.response);
      console.log(client.filesList);
      e.sender.send('reply_command', {
        path: client.response,
        filesList: client.filesList
      });
    });
  })
});

app.on('activate', () => {
  if(mainWindow === null) createWindow()
})

app.on('window-all-closed', () => {
  app.quit()
})
