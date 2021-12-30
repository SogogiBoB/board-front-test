import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
//import ListBoardComponent from './components/ListBoardComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import List from './components/ListBoard';

function App() {
  return (
    <div> 
      <Router>
        <HeaderComponent/>
          <div className="container">
            <Routes>
              <Route path = "/" exact={true} element = {<List/>}></Route>
              <Route path = "/board" element = {<List/>}></Route>
              <Route path = "/pagedBoard" element = {<List/>}></Route>
            </Routes>
          </div>
        <FooterComponent/>
      </Router>
    </div>
  );
}

export default App;