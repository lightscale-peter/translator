import React, { useEffect, useState } from 'react';
import DicList from './DicList';
import DicListAdd from './DicListAdd';
import './DicListTotal.scss';
const { ipcRenderer } = window.require("electron");


export type dicType = {
  _id?: string;
  date?: Date;
  en: string;
  ko: string;
}


function DicListTotal(){

    const [dic, setDic] = useState<dicType[]>([{
        _id: '0',
        date: new Date(),
        en: '',
        ko: ''
      }]);
    
      const [limit, setLimit] = useState(10);
      const [search, setSearch] = useState({
        target: 'en',
        word: ''
      });
      const [inputVal, setInputVal] = useState('');
      const [tempId, setTempId] = useState(0);
    
      useEffect(() =>{
        console.log('useEffect');
        ipcRenderer.send('FindAllDicData', {limit: limit, search: search});
      }, [search, limit]);

      useEffect(()=>{
        ipcRenderer.on('FindAllDicDataReturn', function(event: any, arg: dicType[]){
          console.log('updateList');
          if(arg) setDic(arg);
        });
      }, []);
    
      
      // + 10 리스트 갯수 추가 
      const getMoreList = () =>{
        setLimit(limit + 10);
      }
    
      // 인풋 박스 비우기
      const removeInput = () =>{
        // inputEl.current?
        setInputVal('');
        setSearch({
          ...search,
          word: ''
        })
      }
    
      // 인풋 박스 관리
      const changeInput = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const {value} = e.target;
        setInputVal(value);
        setSearch({
          ...search,
          word: value
        });
      }
    
      // 셀렉트 박스 관리
      const changeSelect = (e: React.ChangeEvent<HTMLSelectElement>) =>{
        const {value} = e.target;
        setSearch({
          ...search,
          target: value
        })
      }
    
      // 리스트 삭제
      const deleteList = (_id: string) =>{
        ipcRenderer.send('DeleteOneDicData', {limit: limit, search: search, _id: _id});
        setDic(dic.filter(info => info._id !== _id));
      }

      // 리스트 재정렬
      const reSortList = (sort: object) =>{
        ipcRenderer.send('FindAllDicData', {limit: limit, search: search, sort});
      }

      // 리스트 추가
      const addList = (words: dicType) =>{
        ipcRenderer.send('InsertDicDate', {limit: limit, search: search, words});

        setTempId(tempId+1);

        const initVal: dicType = {
          ...words,
          _id: tempId.toString(),
          date: new Date()
        };

        setDic([initVal].concat(dic));

      }

    return (
        <div>
          {console.log('render')}
            <div className="ts-article__search-block">
              <div className="ts-article__search-box">
                  <input type="text" placeholder="검색" value={inputVal} onChange={changeInput} />
                  <div className="ts-article__search-box-x" onClick={removeInput}>X</div>
              </div>
              <select onChange={changeSelect} className="ts-article__select-box">
                  <option value="en">English</option>
                  <option value="ko">Korean</option>
              </select>
            </div>
            <DicListAdd addList={addList} reSortList={reSortList} />
            <ul>
            { 
                dic.length === 1 ? '' :
                dic.map((dicVal, indexVal) => <DicList dic={dicVal} key={dicVal._id} index={indexVal} deleteList={deleteList} />)
            }
            </ul>
            {
              dic.length !== 1 &&
              <div onClick={getMoreList} className="ts-article__more-button">더 보기</div>
            }
            
        </div>
    )
}

export default DicListTotal