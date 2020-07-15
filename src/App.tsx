import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import './App.scss';

import DicListTotal from './components/page/DicList/DicListTotal';
import DicTranslator from './components/page/DicTranslator/DicTranslator';

function App() {


  return (
    <Router>
      <main className="ts-main">
        <nav className="ts-nav">
          <ul className="ts-nav__ul">
            <li className="ts-nav__li">
              <Link to="/">검색/수정</Link>
            </li>
            <li className="ts-nav__li">
              <Link to="/DicTranslator">번역 시작</Link>
            </li>
          </ul>
        </nav>
        <article className="ts-article">
          <Switch>
            <Route path="/DicTranslator">
              <DicTranslator />
            </Route>
            <Route path="/">
              <DicListTotal />
            </Route>
          </Switch>
        </article>
      </main>
    </Router>
    
  );
}

export default App;
