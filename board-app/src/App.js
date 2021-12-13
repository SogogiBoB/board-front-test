import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'; 
import ListBoardComponent from './components/ListBoardComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';


function App() {
  return (
    <div> 
      <Router>
        <HeaderComponent/>
          <div className="container">
            <Routes>
              <Route path = "/" exact element = {<ListBoardComponent/>}></Route>
              <Route path = "/board" element = {<ListBoardComponent/>}></Route>
            </Routes>
          </div>
        <FooterComponent/>
      </Router>
    </div>
  );
}

export default App;