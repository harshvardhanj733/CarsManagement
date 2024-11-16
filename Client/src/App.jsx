import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import HomeSection from "./Components/HomeSection";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";
import AllCars from "./Components/AllCars";
import MyCars from "./Components/MyCars";
import AddCars from "./Components/AddCars";
import Nav from "./Components/Nav";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [cars, setCars] = useState([]);
  const [myCars, setMyCars] = useState([]);

  const handleLogin = (loginToken) => {
    setIsLoggedIn(true);
    setToken(loginToken)
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeSection />} />
        <Route path="/login" element={<Login onLogin={handleLogin} setToken={setToken} />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <Dashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route index element={<Navigate to="all-cars" />} />

          <Route path="all-cars" element={<AllCars cars={cars} setCars={setCars}/>} />
          <Route path="my-cars" element={<MyCars token={token} myCars={myCars} setMyCars={setMyCars}/>} />
          <Route path="add-cars" element={<AddCars token={token} setMyCars={setMyCars}/>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
