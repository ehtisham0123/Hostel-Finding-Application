import Home from "../Home";
import Users from "./Users/Users";
import CreateUser from "./Users/CreateUser"; 
import EditUser from "./Users/EditUser"; 
import User from "./Users/User";

import Wardens from "./Wardens/Wardens";
import CreateWarden from "./Wardens/CreateWarden";
import EditWarden from "./Wardens/EditWarden"; 
import Warden from "./Wardens/Warden";

import Rooms from "./Rooms/Rooms";
import BookedRooms from "./Rooms/BookedRooms";
import EditRoom from "./Rooms/EditRoom"; 
import Room from "./Rooms/Room";

import {useState} from "react";
import { Link ,Switch ,Route} from "react-router-dom";
import {reactLocalStorage} from 'reactjs-localstorage';

import logo from "../../logo.png";


function Admin({history,match,location}) {
  
  const checkUsers =  location.pathname.includes("admin/users");
  const checkWardens =  location.pathname.includes("admin/wardens");
  const checkRooms =  location.pathname.includes("admin/rooms");
  const [active, setActive] = useState(false);

  const logout = ()=>{
    reactLocalStorage.remove('token');
    reactLocalStorage.remove('user_id');
    reactLocalStorage.remove('user_role');
    history.push("/admin-login");
  }

  const toggleClass = () => {
      const currentState = active;
      setActive(!currentState );
  };

  if (!reactLocalStorage.get('token')){
    history.push("/admin-login");
   }
  else if (reactLocalStorage.get('user_role') !== 'admin'){
    logout();    
    history.push("/admin-login");
   
   }


  return (
      <div className="wrAdminer d-flex align-items-stretch">
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
                </div>        <h3>Hostel Managemnet System</h3>
            </div>
          </div>
            
          <ul className="list-unstyled components mb-5">
            <Link to={`${match.url}`}>
              <li 
               className={`${location.pathname === "/admin"  ? "active" : ""}`} 
              >
                <a>
                  <span className="fa fa-home mr-3"></span> Home
                </a>
              </li>
            </Link>


           <Link to={`${match.url}/wardens`}>
              <li
              className={`${checkWardens ? "active" : ""}`} 
              >
                <a>
                  <span className="fa fa-user mr-3"></span>
                  Wardens
                </a>
              </li>
            </Link>              


           <Link to={`${match.url}/users`}>
              <li
              className={`${checkUsers ? "active" : ""}`} 
              >
                <a>
                  <span className="fa fa-male mr-3"></span>
                  Users
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
    
          <Route exact path={`${match.path}/users`} component={Users} />
          
          <Route path={`${match.path}/users/create`} component={CreateUser}/>
             
          <Route path={`${match.path}/users/profile/:id`} component={User}/>
                      
          <Route path={`${match.path}/users/edit/:id`} component={EditUser}/>
          
          

          <Route exact path={`${match.path}/wardens`} component={Wardens} />
          
          <Route path={`${match.path}/wardens/create`} component={CreateWarden}/>
             
          <Route path={`${match.path}/wardens/profile/:id`} component={Warden}/>
                      
          <Route path={`${match.path}/wardens/edit/:id`} component={EditWarden}/>



          <Route exact path={`${match.path}/rooms`} component={Rooms} />
          
          <Route exact path={`${match.path}/rooms/booked-rooms/:id`} component={BookedRooms} />
             
          <Route path={`${match.path}/rooms/view/:id`} component={Room}/>
                      
          <Route path={`${match.path}/rooms/edit/:id`} component={EditRoom}/>
             
        </Switch>
      </div>
  );
}

export default Admin;
