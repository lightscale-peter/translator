const {app, BrowserWindow, ipcMain} = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const {FindAllDicData, UpdateOneDicData, DeleteOneDicData, InsertDicDate, closeDBB} = require('./data/dic/');
const {ReplaceText} = require('./util');

function createWindow(){
    let win = new BrowserWindow({
        width: 1300,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        },
        // resizable: false,
        titleBarStyle: "hidden"
        
    });

    if(isDev){
        win.loadURL('http://localhost:3000');
        win.webContents.openDevTools();
    }else{
        win.loadFile(path.join(__dirname, '../../build/index.html'));
    }    

    win.on('close', function(){
        closeDBB();
    })


    // MongoDB
    ipcMain.on('FindAllDicData', (event, args) =>{    
        console.log('FindAllDicData 실행');

        FindAllDicData(args).then((val)=>{
            win.webContents.send('FindAllDicDataReturn', val);
        });
    });

    ipcMain.on('UpdateOneDicData', (event, args) =>{
        console.log('UpdateOneDicData 실행');
        UpdateOneDicData(args);
    });

    ipcMain.on('DeleteOneDicData', (event, args) =>{
        console.log('DeleteOneDicData 실행');
        DeleteOneDicData(args);
    });

    ipcMain.on('InsertDicDate', (event, args) =>{
        console.log('InsertDicDate 실행');
        InsertDicDate(args);
    });

    // File
    ipcMain.on('ReplaceText', (event, args) =>{
        console.log('ReplaceText 실행');
        ReplaceText(args).then((result) =>{
            win.webContents.send('ShowAlert', result);
        })
    });


    ipcMain.handle('GetDesktopPath', function(event, arg){
        console.log('GetDesktopPath 실행');
        return app.getPath('desktop');
    });

    // console.log('fsddsfsdf', app.getPath('desktop'));

    


}

app.whenReady().then(createWindow);

app.on('window-all-closed', ()=>{
    if(process.platform !== 'darwin'){
        app.quit();
    }
});

app.on('activate', ()=>{
    if(BrowserWindow.getAllWindows().length === 0){
        createWindow();
    }
});













// ipcMain.on('test1', (event, args) =>{
//     event.returnValue = 'test1 return';
//     console.log('test1 실행됨', args);

    
//     ReplaceText(path.join(__dirname, './sample/test/ios/index.html'));
//     console.log('llll', path.join(__dirname, './sample/test/ios/index.html'));
// });