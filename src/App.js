import Navbar from './component/Navbar';
import React,{useState}from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import LOGIN from "./screen/LOGIN";
import HomeScreen from "./screen/HomeScreen";
import Create from "./screen/Create";
import Edit from "./screen/Edit";
import Score from "./screen/Score";
import Createquiz from "./screen/Createquiz";
function App() {

  
  const [isLogin, setIsLogin] = useState(false)
  if (!isLogin) {
    return<div>
      <LOGIN setIsLogin={setIsLogin} isLogin={isLogin} />
     </div>

  }

  return (
    <div>
     
      <BrowserRouter>
      <Navbar/> <Routes>
          
        <Route path="/login" element={<LOGIN />} />
          <Route path="/" element={<HomeScreen />} />
          <Route path="/createquiz" element={<Create />} />
          <Route path="/createquizz" element={<Createquiz />} />
          <Route path="/editquiz" element={<Edit />} />
          <Route path="/scorequiz" element={<Score />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
