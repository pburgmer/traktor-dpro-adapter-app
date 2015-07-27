var app = require('app');
var Menu = require('menu');
var Tray = require('tray');
var BrowserWindow = require('browser-window');

// Keep a global references of window objects,
// if we don't, the window will be closed automatically when the JavaScript object is GCed.
var windows = {};

// override default handler that quits app
app.on('window-all-closed', function() {});

// hide the dock icon on mac os x
app.dock.hide();

app.on('ready', function() {
  setupTray();
});

function setupTray() {
  var appTrayIcon = new Tray(__dirname + '/assets/images/icon/midi.png');
  appTrayIcon.setToolTip('Traktor-D-Pro-Adapter');

  var contextMenu = Menu.buildFromTemplate([
    { label: 'Settings', click: function () {
      if (windows.settings) {
        windows.settings.show();
        windows.settings.focus();
      }
      else {
        windows.settings = new BrowserWindow({width: 800, height: 600, show: false});
        windows.settings.loadUrl('file://' + __dirname + '/index.html#/settings');
        windows.settings.show();

        windows.settings.on('closed', function() {
          windows.settings = null;
        });
      }

    }},
    { type: 'separator' },
    { label: 'Quit', click: function () {
      appTrayIcon.destroy();
      appTrayIcon = null;
      app.quit();
    }}
  ]);
  appTrayIcon.setContextMenu(contextMenu);
}
