import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import Home from "./components/home.component";
import { useEffect, useState } from "react";

const App = () => {
  const [accessToken, setAccessToken] = useState<string>("");

  const handleLogout = () => {
    console.log("hererer");
    AuthService.logout();
    window.location.reload();
  };

  useEffect(() => {
    const accessTokenData: string = localStorage.getItem("accessToken") || "";
    setAccessToken(accessTokenData);
  }, []);

  useEffect(() => {}, [accessToken]);

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          CYBERSHIELD NETWORK
        </Link>
        {accessToken && (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/home"} onClick={handleLogout} className="nav-link">
                Logout
              </Link>
            </li>
          </div>
        )}

        {!accessToken && (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/login"
            element={<Login setAccessToken={setAccessToken} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
