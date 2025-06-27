const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  login: (credentials) => ipcRenderer.invoke('auth:login', credentials),
  getUsers: () => ipcRenderer.invoke('users:getAll'),
  createUser: (userData) => ipcRenderer.invoke('users:create', userData),
  updateUser: (id, userData) => ipcRenderer.invoke('users:update', id, userData),
  deleteUser: (id) => ipcRenderer.invoke('users:delete', id),
  getEmployees: () => ipcRenderer.invoke('employees:getAll'),
  createEmployee: (employeeData) => ipcRenderer.invoke('employees:create', employeeData),
  updateEmployee: (id, employeeData) => ipcRenderer.invoke('employees:update', id, employeeData),
  deleteEmployee: (id) => ipcRenderer.invoke('employees:delete', id),
  generateBadge: (employeeId) => ipcRenderer.invoke('employees:generateBadge', employeeId),
  getShops: () => ipcRenderer.invoke('shops:getAll'),
  createShop: (shopData) => ipcRenderer.invoke('shops:create', shopData),
  updateShop: (id, shopData) => ipcRenderer.invoke('shops:update', id, shopData),
  deleteShop: (id) => ipcRenderer.invoke('shops:delete', id),
  recordTime: (recordData) => ipcRenderer.invoke('timeRecords:record', recordData),
  getReports: (filters) => ipcRenderer.invoke('timeRecords:getReports', filters)
});