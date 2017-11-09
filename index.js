const electron = require('electron');
var ffmpeg = require('fluent-ffmpeg');

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

app.on('ready', () => {
     mainWindow = new BrowserWindow({});
     mainWindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on('video:submit', (event, path) => {
    ffmpeg = ffmpeg(path).setFfprobePath('C:\\Users\\zacha\\Documents\\Applications\\ffmpeg\\bin\\ffprobe.exe');
    ffmpeg.ffprobe((err, metadata) => {
        mainWindow.webContents.send('video:metadata', metadata.format.duration);
    });
});