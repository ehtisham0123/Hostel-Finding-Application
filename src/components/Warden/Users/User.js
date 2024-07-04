import { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import LocationShowModal from "../../LocationShowModal";

import axios from "axios";
import { Link, useParams } from "react-router-dom";

function User() {
  const token = reactLocalStorage.get("token");
  const [user, setUser] = useState([]);
  const [rooms, setRooms] = useState([]);
  let { id } = useParams();
  useEffect(() => {
    let getUserData = async () => {
      await axios
        .get(`${process.env.React_App_Url}/warden/users/profile/${id}`, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          if (response.data) {
            setUser(response.data.result[0]);
            setRooms(response.data.rooms);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getUserData();
  }, []);
  return (
    <div id="content" className="mx-5">
      <div className="text-center my-5 ">
        <h2>User Profile</h2>
      </div>
      <div className="row">
        <div className="col-md-4 border pt-5 my-1 text-dark d-flex flex-column align-items-center">
          <div className="profile-img mb-3">
            <img src={`${process.env.React_App_Url}/uploads/${user.avatar}`} alt={user.name} />
          </div>
          <Link to={`../../chat/${user.id}`}>
            <button className="btn btn-outline-dark">
              <i className="fa fa-comment"></i> Message
            </button>
          </Link>
        </div>
          <div className="col-md-8 border p-4  my-1">
          <h2 className="text-dark mb-4">{user.name}</h2>
          <div className="profile-tab">
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Full Name</h5>
              </div>
              <div className="col-md-8">
                <p>
                  {user.firstname} {user.lastname}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Email</h5>
              </div>
              <div className="col-md-8">
                <p>{user.email}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Gender</h5>
              </div>
              <div className="col-md-8">
                <p>{user.gender}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Contact</h5>
              </div>
              <div className="col-md-8">
                <p>{user.contact}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Age</h5>
              </div>
              <div className="col-md-8">
                <p>{user.age}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">House No</h5>
              </div>
              <div className="col-md-8">
                {user.housenumber ? (
                  <p>{user.housenumber}</p>
                ) : (
                  <p className="text-dark">Null </p>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Street</h5>
              </div>
              <div className="col-md-8">
                {user.streetnumber ? (
                  <p>{user.streetnumber}</p>
                ) : (
                  <p className="text-dark">Null </p>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">City</h5>
              </div>
              <div className="col-md-8">
                <p>{user.city}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">State</h5>
              </div>
              <div className="col-md-8">
                {user.state ? (
                  <p>{user.state}</p>
                ) : (
                  <p className="text-dark">Null </p>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Country</h5>
              </div>
              <div className="col-md-8">
                <p>{user.country}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Postal code</h5>
              </div>
              <div className="col-md-8">
                <p>{user.postalcode}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row gutters-sm mt-1">
        <div className="col-sm-6 h-100 mb-3">
          <LocationShowModal
            latitude={user.latitude}
            longitude={user.longitude}
          />
        </div>
        <div className="col-sm-6 mb-3">
          <div
            className="card -berry edge--bottom"
            style={{ height: "325px", "overflow-y": "auto" }}
          >
            <div className="card-body">
              <h6 className="d-flex align-items-center mb-3">
                <i className="material-icons text-dark mr-2">Booked Rooms</i>
              </h6>
              {rooms.map((room) => (
                <div className="row">
                  <div className="col-sm-10">
                <h5 className="headings">{room.name}</h5>
             </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
