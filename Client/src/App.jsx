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

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeSection />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
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

          <Route path="all-cars" element={<AllCars />} />
          <Route path="my-cars" element={<MyCars />} />
          <Route path="add-cars" element={<AddCars />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
