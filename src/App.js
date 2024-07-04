import "./App.css";
import {reactLocalStorage} from 'reactjs-localstorage';

import Home from "./Home";
import Admin from "./components/Admin/Admin";
import Warden from "./components/Warden/Warden";
import User from "./components/User/User";

import AdminLogin from "./components/Admin/AdminLogin";
import WardenLogin from "./components/Warden/WardenLogin";
import WardenSignup from "./components/Warden/WardenSignup";
import UserLogin from "./components/User/UserLogin";
import UserSignup from "./components/User/UserSignup";

import { Link, Switch, Route } from "react-router-dom";
import { useState } from "react";


import logo from "./logo.png";
require('dotenv').config()

function App({ location,history }) {
  const [active, setActive] = useState(false);
  const toggleClass = () => {
    const currentState = active;
    setActive(!currentState);
  };
  return (
    <div className="App">
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/warden" component={Warden} />
        <Route path="/user" component={User} />
        <div className="wrapper d-flex align-items-stretch"  >
          <nav id="sidebar" className={active ? "active" : null}>
            <div className="custom-menu">
              <button
                type="button"
                id="sidebarCollapse"
                className="btn btn-primary"
                onClick={toggleClass}
              ></button>
            </div>
            <div
              className="img bg-wrap text-center py-4"
            >
              <div className="user-logo">
                <div
                  className="img"
                >
                  <img
                  src={logo}
                  width="120"
                 />
                </div>
                <h3>Hostel Managemnet System</h3>
              </div>
            </div>
            <ul className="list-unstyled components mb-5">
              <Link to={`/`}>
                <li className={`${location.pathname === "/" ? "active" : ""}`}>
                  <a>
                    <span className="fa fa-home mr-3"></span>
                    Home
                  </a>
                </li>
              </Link>
              <Link to={`/admin-login`}>
                <li
                  className={`${
                    location.pathname === "/admin-login" ? "active" : ""
                  }`}
                >
                  <a>
                    <span className="fa fa-sign-in mr-3"></span>
                    Admin Login
                  </a>
                </li>
              </Link>
              <Link to={`/warden-signup`}>
                <li
                  className={`${
                    location.pathname === "/warden-signup" ? "active" : ""
                  }`}
                >
                  <a className="d-flex align-items-center">
                    <span className="fa fa-user-plus mr-3"></span>
                    Warden Registration
                  </a>
                </li>
              </Link>
              <Link to={`/warden-login`}>
                <li
                  className={`${
                    location.pathname === "/warden-login" ? "active" : ""
                  }`}
                >
                  <a className="d-flex align-items-center">
                    <span className="fa fa-sign-in mr-3"></span>                      
                    Warden Login
                  </a>
                </li>
              </Link>
              <Link to={`/user-signup`}>
                <li
                  className={`${
                    location.pathname === "/user-signup" ? "active" : ""
                  }`}
                >
                  <a>
                    <span className="fa fa-user-plus mr-3"></span>
                    User Registration
                  </a>
                </li>
              </Link>
              <Link to={`/user-login`}>
                <li
                  className={`${
                    location.pathname === "/user-login" ? "active" : ""
                  }`}
                >
                  <a>
                    <span className="fa fa-sign-in mr-3"></span>
                    User Login
                  </a>
                </li>
              </Link>
            </ul>
          </nav>

          <Route exact path="/" component={Home} />
          <Route path="/admin-login" component={AdminLogin} />
          <Route path="/warden-login" component={WardenLogin} />
          <Route path="/warden-signup/" component={WardenSignup} />
          <Route path="/user-login" component={UserLogin} />
          <Route path="/user-signup" component={UserSignup} />
        </div>
      </Switch>
    </div>
  );
}

export default App;
