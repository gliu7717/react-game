import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Tetris from './tetris/App'
import Huarongdao from './huarongdao/App'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route index element = {<Home/>} />
        <Route path="/Home" element = {<Home/>} />
        <Route path="/About" element = {<About/>} />
        <Route path="/Contact" element = {<Contact/>} />
        <Route path="/Tetris" element = {<Tetris/>} />
        <Route path="/Huarongdao" element = {<Huarongdao/>} />

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
