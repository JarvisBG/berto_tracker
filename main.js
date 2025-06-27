const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const AuthController = require('./src/backend/controllers/AuthController');
const UserController = require('./src/backend/controllers/UserController');
const EmployeeController = require('./src/backend/controllers/EmployeeController');
const ShopController = require('./src/backend/controllers/ShopController');
const TimeRecordController = require('./src/backend/controllers/TimeRecordController');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false
    }
  });

  win.loadFile('src/frontend/pages/auth/login.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC handlers for backend communication
ipcMain.handle('auth:login', async (event, credentials) => {
  return await AuthController.login(credentials);
});

ipcMain.handle('users:getAll', async (event) => {
  return await UserController.getAll();
});

ipcMain.handle('users:create', async (event, userData) => {
  return await UserController.create(userData);
});

ipcMain.handle('users:update', async (event, id, userData) => {
  return await UserController.update(id, userData);
});

ipcMain.handle('users:delete', async (event, id) => {
  return await UserController.delete(id);
});

ipcMain.handle('employees:getAll', async (event) => {
  return await EmployeeController.getAll();
});

ipcMain.handle('employees:create', async (event, employeeData) => {
  return await EmployeeController.create(employeeData);
});

ipcMain.handle('employees:update', async (event, id, employeeData) => {
  return await EmployeeController.update(id, employeeData);
});

ipcMain.handle('employees:delete', async (event, id) => {
  return await EmployeeController.delete(id);
});

ipcMain.handle('employees:generateBadge', async (event, employeeId) => {
  return await EmployeeController.generateBadge(employeeId);
});

ipcMain.handle('shops:getAll', async (event) => {
  return await ShopController.getAll();
});

ipcMain.handle('shops:create', async (event, shopData) => {
  return await ShopController.create(shopData);
});

ipcMain.handle('shops:update', async (event, id, shopData) => {
  return await ShopController.update(id, shopData);
});

ipcMain.handle('shops:delete', async (event, id) => {
  return await ShopController.delete(id);
});

ipcMain.handle('timeRecords:record', async (event, recordData) => {
  return await TimeRecordController.recordTime(recordData);
});

ipcMain.handle('timeRecords:getReports', async (event, filters) => {
  return await TimeRecordController.getReports(filters);
});