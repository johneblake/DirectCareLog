const windowStateManager = require('electron-window-state');
const contextMenu = require('electron-context-menu');
const { app, BrowserWindow, ipcMain } = require('electron');
const remoteMain = require('@electron/remote/main');
const serve = require('electron-serve');
const path = require('path');

try {
  require('electron-reloader')(module);
} catch (e) {
  console.error(e);
}

const serveURL = serve({ directory: '.' });
const port = process.env.PORT || 3000;
const dev = !app.isPackaged;
// @ts-ignore
let mainWindow;
// @ts-ignore
let saveOnClose;
let isClosing = false;

function createWindow() {
  let windowState = windowStateManager({
    defaultWidth: 1080,
    defaultHeight: 700,
  });

  const mainWindow = new BrowserWindow({
    backgroundColor: 'white',
    titleBarStyle: 'default',
    autoHideMenuBar: false,
    trafficLightPosition: {
      x: 17,
      y: 32,
    },
    minHeight: 450,
    minWidth: 500,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      spellcheck: false,
      devTools: dev,
      preload: path.join(__dirname, 'preload.cjs'),
    },
    x: windowState.x,
    y: windowState.y,
    width: windowState.width,
    height: windowState.height,
  });

  remoteMain.enable(mainWindow.webContents);
  windowState.manage(mainWindow);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('close', (e) => {
    windowState.saveState(mainWindow);
    // @ts-ignore
    if (saveOnClose !== undefined) {
      isClosing = true;
      e.preventDefault();
      // @ts-ignore
      saveOnClose.sender.send('save');
    }
  });

  return mainWindow;
}

contextMenu({
  showLookUpSelection: false,
  showSearchWithGoogle: false,
  showCopyImage: false,
  // @ts-ignore
  prepend: (defaultActions, params, browserWindow) => [
    {
      label: 'Make App 💻',
    },
  ],
});

// @ts-ignore
function loadVite(portNum) {
  // @ts-ignore
  mainWindow?.loadURL(`http://localhost:${portNum}`).catch((e) => {
    // eslint-disable-next-line no-console
    console.log('Error loading URL, retrying', e);
    setTimeout(() => {
      loadVite(port);
    }, 200);
  });
}

function createMainWindow() {
  mainWindow = createWindow();
  mainWindow.once('close', () => {
    mainWindow = null;
  });

  if (dev) loadVite(port);
  else serveURL(mainWindow);
}

// @ts-ignore
let schedule;
const { getInstance } = require('./directCareLogDB.cjs');
const db = getInstance();

app.once('ready', () => {
  schedule = db.getSchedule();
  createMainWindow();
});

app.on('activate', () => {
  // @ts-ignore
  if (!mainWindow) {
    createMainWindow();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('initSave', (event) => {
  saveOnClose = event;
});

ipcMain.on('saveComplete', (event, data) => {
  db.updateSchedule(data.schedule);
  if (isClosing) {
    saveOnClose = undefined;
    app.quit();
  } else {
    schedule = data.schedule;
    event.sender.send('data', schedule);
  }
});

ipcMain.on('initData', (event) => {
  // @ts-ignore
  schedule = schedule ?? [];
  event.sender.send('data', schedule);
});
