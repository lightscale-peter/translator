import React, { useState } from 'react';
import './DicTranslator.scss';

const { ipcRenderer } = window.require("electron");
const { dialog } = window.require("electron").remote;




function DicTranslator(){


    const [filePath, setFilePath] = useState('/Users/beomkeunshin/Desktop/practice/electron/replace-html-text/public/electron/sample/test/ios/index.html');

    
    const sendFilePath = () =>{
        const options = {
            title: 'Open a file or folder',
            //defaultPath: '/path/to/something/',
            // buttonLabel: 'Do it',
            /*filters: [
              { name: 'xml', extensions: ['xml'] }
            ],*/
            //properties: ['showHiddenFiles'],
            // message: '대상 파일 선택'
          };
    
          dialog.showOpenDialog(null, options).then((result: any) => {
            console.log('result', result.filePaths[0]);
            setFilePath(result.filePaths[0]);
            // ipcRenderer.send('ReplaceText', result.filePaths[0]);
    
          }).catch((err: any) =>{
            console.log(err);
          });
    }


    return (
        <div>
            <div className="ts-tt-artile__title">
                <h1>번역 파일 불러오기</h1>
            </div>

            <div>
                <div>{filePath}</div>
                <button onClick={sendFilePath}>원본파일 선택</button>
            </div>
        </div>
    )
}

export default DicTranslator;