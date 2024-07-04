import Home from "../Home";
import Chat from "./Chat/Chat";
import Rooms from "./Rooms/Rooms";
import BookedRooms from "./Rooms/BookedRooms";
import CreateRoom from "./Rooms/CreateRoom";
import EditRoom from "./Rooms/EditRoom"; 
import Room from "./Rooms/Room";
import EditProfile from "./Profile/EditProfile"; 
import Profile from "./Profile/Profile";
import User from "./Users/User";

import { useState } from "react";
import { Link ,Switch ,Route} from "react-router-dom";
import {reactLocalStorage} from 'reactjs-localstorage';

import logo from "../../logo.png";


function Warden({history,match,location}) {
  const checkProfile =  location.pathname.includes("warden/profile");
  const checkChat =  location.pathname.includes("warden/chat");
  
  const checkRooms =  location.pathname.includes("warden/rooms");
  const checkErollments =  location.pathname.includes("warden/erollments");
  const [active, setActive] = useState(false);

   const logout = ()=>{
    reactLocalStorage.remove('token');
    reactLocalStorage.remove('user_id');
    reactLocalStorage.remove('user_role');
    history.push("/warden-login");
  }

  if (!reactLocalStorage.get('token')){
    history.push("/warden-login");
   }
  else if (reactLocalStorage.get('user_role') != 'warden'){
    logout();    
    history.push("/warden-login");
   }

  const toggleClass = () => {
      const currentState = active;
      setActive(!currentState );
  };


  return (
      <div className="wrapper d-flex align-items-stretch">
            <nav id="sidebar" className={active ? 'active': null}>
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
            
            <Link to={`${match.url}`}>
              <li 
               className={`${location.pathname === "/warden"  ? "active" : ""}`} 
              >
                <a>
                  <span className="fa fa-home mr-3"></span> Home
                </a>
              </li>
            </Link>

             <Link to={`${match.url}/profile`}>
              <li 
              className={`${checkProfile ? "active" : ""}`} 
              >
                <a>
                  <span className="fa fa-id-card mr-3"></span> Profile
                </a>
              </li>
            </Link>
                     <Link to={`${match.url}/chat`}>
              <li 
              className={`${checkChat ? "active" : ""}`} 
              >
                <a href="">
                  <span className="fa fa-comment mr-3"></span> Chat
                </a>
              </li>
            </Link>

            <Link to={`${match.url}/rooms`}>
              <li
              className={`${checkRooms ? "active" : ""}`} 
              >
                <a href="#">
                  <span className="fa fa-briefcase mr-3" aria-hidden="true"></span>
                  Rooms
                </a>
              </li>
            </Link>     
            <Link onClick={logout}>
              <li>
                <a>
                   <span className="fa fa-sign-out mr-3" aria-hidden="true"></span>
                    Logout
                </a>  
              </li>
            </Link>    
          </ul>
        </nav>
        <Switch>

          <Route exact path={`${match.path}`}  component={Home} />  

          <Route exact path={`${match.path}/chat/:id?`}  component={Chat} />  


          <Route path={`${match.path}/profile/edit/`} component={EditProfile}/>
          
          <Route path={`${match.path}/profile/`} component={Profile}/>
                      
             

          <Route exact path={`${match.path}/rooms`} component={Rooms} />
          
          <Route exact path={`${match.path}/rooms/booked-rooms/:id`} component={BookedRooms} />

          <Route path={`${match.path}/rooms/create`} component={CreateRoom}/>
             
          <Route path={`${match.path}/rooms/view/:id`} component={Room}/>
                      
          <Route path={`${match.path}/rooms/edit/:id`} component={EditRoom}/> 
          
          <Route path={`${match.path}/rooms/user-profile/:id`} component={User}/> 

        </Switch>
      </div>
  );
}

export default Warden;
