import Navbar from './component/Navbar';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import LOGIN from "./screen/LOGIN";
import HomeScreen from "./screen/HomeScreen";
import Create from "./screen/Create";
import Edit from "./screen/Edit";
import Score from "./screen/Score";
function App() {

  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Routes>
        <Route path="/login" element={<LOGIN />} />
          <Route path="/" element={<HomeScreen />} />
          <Route path="/createquiz" element={<Create />} />
          <Route path="/editquiz" element={<Edit />} />
          <Route path="/scorequiz" element={<Score />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
