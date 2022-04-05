import Navbar from './component/Navbar';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
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
import Profile from "./screen/Profile";
import Editque from "./screen/Editque";
import Lobby from "./screen/Lobby";
import Exercise from "./screen/Exercise";
import CreateSetOfQuestion from './screen/CreateSetOfQuestion';
import { useAuthContext } from './context/AuthContext';
function App(props) {

  const { isLogin, logoutHandler, loginBy } = useAuthContext()

  console.log(isLogin)

  if (!isLogin) {
    return <LOGIN />

  }


  return (
    <div>
      <BrowserRouter>
        <Navbar logoutHandler={logoutHandler} loginBy={loginBy} /> <Routes>
          <Route path="/login" element={<LOGIN />} />
          <Route path="/" element={<HomeScreen />} />
          <Route path="/createquiz" element={<Create />} />
          <Route path="/editquiz" element={<Edit />} />
          <Route path="/scorequiz" element={<Score />} />
          <Route path="/profile" element={<Profile />} />
          <Route name="editque" path="/editque/:soqId" element={<Editque />} />
          <Route path="/create-soq" element={<CreateSetOfQuestion />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route name="exercise" path="/exercise/:soqId" element={<Exercise />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
