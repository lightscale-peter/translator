import React, { useEffect, useState } from 'react';
import './DicTranslator.scss';

const { ipcRenderer } = window.require("electron");
const { dialog } = window.require("electron").remote;




function DicTranslator(){


    const [loadPath, setLoadPath] = useState('선택 필요');
    const [savePath, setSavePath] = useState('/Users/beomkeunshin/Desktop/');

    
    const setLoadPathFunc = () =>{
        const options = {
            title: 'Open a file or folder',
            //defaultPath: '/path/to/something/',
            // buttonLabel: 'Do it',
            /*filters: [
              { name: 'xml', extensions: ['xml'] }
            ],*/
            properties: ["openDirectory", "multiSelections", "showHiddenFiles"],
            // message: '대상 파일 선택'
          };
    
          dialog.showOpenDialog(null, options).then((result: any) => {
            // console.log('result', result);
            if(!result.canceled){
                setLoadPath(result.filePaths[0]);
            }
    
          }).catch((err: any) =>{
            console.log(err);
          });
    }

    const setSavePathFunc = () =>{
        const options = {
            properties: ["openDirectory"]
          };
    
          dialog.showOpenDialog(null, options).then((result: any) => {
            if(!result.canceled){
                setLoadPath(result.filePaths[0]);
            }
          }).catch((err: any) =>{
            console.log(err);
          });
    }

    const startTranslator = () =>{
        const options = {
            type: 'question',
            buttons: ['Cancel', 'Yes, please', 'No, thanks'],
            defaultId: 2,
            title: 'Question',
            message: '번역을 시작하시겠습니까?',
            detail: '다시 되돌릴 수 없습니다.',
            checkboxLabel: 'Remember my answer',
            checkboxChecked: true,
          };
        

          dialog.showMessageBox(null, options).then((response: any, checkboxChecked: any) => {
            console.log('response', response.response);
            console.log('checkboxChecked', checkboxChecked);

            if(response.response === 1){
                ipcRenderer.send('ReplaceText', {loadPath: loadPath, savePath: savePath});
            }
          });
    }

    useEffect(()=>{
        ipcRenderer.once('ShowAlert', function(event: any, arg: any){
            dialog.showErrorBox('오류발생', '경로를 다시 확인해주세요.');
        });
    }, []);

    return (
        <div className="ts-tt-article">
            <div className="ts-tt-article__box">
                <div className="ts-tt-article__title">
                    <h1>번역 파일 위치</h1>
                </div>
                <div className="ts-tt-article__contents">
                    <div>{loadPath}</div>
                    <button onClick={setLoadPathFunc}>원본파일 선택</button>
                </div>
            </div>
            <div className="ts-tt-article__box">
                <div className="ts-tt-article__title">
                    <h1>번역 파일 저장</h1>
                </div>
                <div className="ts-tt-article__contents">
                    <div>{savePath}</div>
                    <button onClick={setSavePathFunc}>저장경로 선택</button>
                </div>
            </div>
            <div className="ts-tt-article__box--button" onClick={startTranslator}>
                번역 시작
            </div>
        </div>
    )
}

export default DicTranslator;