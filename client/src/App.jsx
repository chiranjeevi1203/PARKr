import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ParkrPage from "./pages/ParkrPage";
import Profile from "./pages/Profile";
import ParkingMap from "./pages/ParkingMap";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/parkrpage" element={<ParkrPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/parkingmap" element={<ParkingMap />} />
      </Routes>
    </Router>
  );
}

export default App;
