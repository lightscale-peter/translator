import React, { useState } from 'react';
import './DicList.scss';
import {dicType} from './DicListTotal';

const { ipcRenderer } = window.require("electron");

function DicList({dic, index, deleteList}: {dic: dicType, index: number, deleteList: (id:string) => void}){


    const [dicTemp, setDicTemp] = useState(dic);
    const [fixFlag, setFixFlag] = useState(false);


    const toggleInput = () =>{
        if(fixFlag){
            ipcRenderer.send('UpdateOneDicData', dicTemp);
        }
        setFixFlag(!fixFlag);
    }

    const changeDicTemp = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = e.target;
        setDicTemp({
            ...dicTemp,
            [name]: value
        });
    }

    const deleteListCheck = () =>{
        if(dicTemp._id){
            deleteList(dicTemp._id)
        }else{
            alert('삭제 오류 발생');
        }
    }

    const getDate = (date: Date) => {

        const year = date.getFullYear().toString().substr(2);
        const month = date?.getMonth() + 1 < 10 ? '0' + (date?.getMonth() + 1) : date?.getMonth() + 1;
        const day = date?.getDate() < 10 ? '0' + date?.getDate() : date?.getDate();
        const hour = date?.getHours();
        const minutes = date?.getMinutes();
        const seconds = date?.getSeconds();

        return year + '.' + month + '.' + day + ' ' + hour + ':' + minutes + ':' + seconds;

    }

    const dicDate = dic.date ? getDate(dic.date) : 'no date';

    return (
        <li className="ts-dic__li">
            <div className="ts-dic__flex">
                <h3>{index+1}.</h3>
                <div className="date">{dicDate}</div>
            </div>
            <div className="ts-dic__flex">
                <div className="ts-dic__display">
                    <div className="ts-dic__word en">
                        <h4>EN&nbsp;:&nbsp;</h4>
                        <div className="ts-dic__word-text">
                            {
                                fixFlag ? 
                                <input name="en" value={dicTemp.en} type="text" onChange={changeDicTemp} /> : 
                                `${dicTemp.en}`
                            }
                        </div>
                    </div>
                    <div className="ts-dic__word ko">
                        <h4>KO&nbsp;:&nbsp;</h4>
                        <div className="ts-dic__word-text">
                            {
                                fixFlag ? 
                                <input name="ko" value={dicTemp.ko} type="text" onChange={changeDicTemp} /> : 
                                `${dicTemp.ko}`
                            }
                        </div>
                    </div>
                </div>
                <div className="ts-dic__buttons">
                    <button onClick={toggleInput}>{fixFlag ? '완료' : '수정'}</button>
                    <button onClick={deleteListCheck}>삭제</button>
                </div>
            </div>
        </li>
    )
}

export default DicList;