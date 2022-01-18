import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
//import ListBoardComponent from './components/ListBoardComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import List from './components/ListBoard';
import Update from './components/updateForm';
import SelectDetail from './components/detailPage';

function App() {
  return (
    <div> 
      <BrowserRouter>
        <HeaderComponent/>
          <div className="container">
            <Routes>
              <Route exact path = "/detail/:uid" element = {<SelectDetail/>}></Route>
              <Route exact path = "/update/:uid" element = {<Update/>}></Route>
              <Route exact path = "/" element = {<List/>}></Route>
              <Route exact path = "/board" element = {<List/>}></Route>
              <Route exact path = "/pagedBoard" element = {<List/>}></Route>
            </Routes>
          </div>
        <FooterComponent/>
      </BrowserRouter>
    </div>
  );
}

export default App;
