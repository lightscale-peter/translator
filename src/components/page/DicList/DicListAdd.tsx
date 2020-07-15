import React, { useRef, useState } from 'react';
import './DicListAdd.scss';
import {dicType} from './DicListTotal';

function DicListAdd({addList, reSortList}: {addList: (args: dicType)=>void; reSortList: (sort: object)=>void; }){

    const blockEl = useRef<HTMLDivElement>(null);
    const [isFlag, setIsFlag] = useState(false);
    const [addValue, setAddValue] = useState({
        en: '',
        ko: ''
    });

    // 리스트 블럭 토글
    const blockToggle = () =>{
        if(blockEl.current){
            blockEl.current.classList.toggle('hide');
            setIsFlag(!isFlag);
        }
    }

    // 필터링 함수
    const sortList = (e:React.MouseEvent<HTMLLIElement, MouseEvent>) =>{
        document.querySelectorAll('.ts-article__list-top-buttons li').forEach(function(e){
            e.classList.remove('on');
        });

        e.currentTarget.classList.add('on');

        if(e.currentTarget.dataset.sort){
            reSortList(JSON.parse(e.currentTarget.dataset.sort));
        }
    }

    const addListButton = () =>{
        addList(addValue);
        blockToggle();
        setAddValue({
            en: '',
            ko: ''
        })
    }

    const updateAddValue = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = e.target;
        setAddValue({
            ...addValue,
            [name]:  value
        })
    }

    return (
        <div>
            <div className="ts-article__list-top-buttons">
                <ul className="sort">
                    <li className="on" data-sort='{"_id": -1}' onClick={sortList}>최신순</li>
                    <li data-sort='{"ko": 1}' onClick={sortList}>국문순</li>
                    <li data-sort='{"en": 1}' onClick={sortList}>영문순</li>
                </ul>
                <div>
                    <button onClick={blockToggle}>{isFlag ? '추가 취소' : '번역 추가'}</button>
                </div>
            </div>
            <div className={`ts-article__list-top-add-wrapper ${isFlag ? 'show':''}`} ref={blockEl}>
                <div className="ts-article__list-top-add">
                    <div className="ts-article__list-input">
                        <div className="input">
                            <h4>EN&nbsp;:&nbsp;</h4>
                            <div><input type="text" name="en" value={addValue.en} onChange={updateAddValue} /></div>
                        </div>
                        <div className="input">
                            <h4>KO&nbsp;:&nbsp;</h4>
                            <div><input type="text" name="ko" value={addValue.ko} onChange={updateAddValue} /></div>
                        </div>
                    </div>
                    <div className="ts-article__list-complete-button">
                        <button onClick={addListButton}>추가</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DicListAdd;