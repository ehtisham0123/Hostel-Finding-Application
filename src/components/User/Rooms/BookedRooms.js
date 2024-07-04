import { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import axios from "axios";
import { Link } from "react-router-dom";

import BookedRoomsTableRow from "./BookedRoomsTableRow";
import Pagination from "./Pagination";
import Spinner from "../../Spinner.png";

function BookedRooms({ match, location }) {
  const token = reactLocalStorage.get("token");
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage, setRoomsPerPage] = useState(5);
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);

  useEffect(() => {
    setLoading(true);
    let getRoomsData = async () => {
      await axios
        .get(`${process.env.React_App_Url}/user/rooms/booked`,{
          headers: {
            token: token,
          } 
        })
        .then((response) => {
          if (response.data) {
            console.log(response.data.rooms)
            setRooms(response.data.rooms);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getRoomsData();
  }, []);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const deleteBooking = async (id) => {
    await axios
      .delete(`${process.env.React_App_Url}/user/rooms/booking/${id}`,{
        headers: {
          token: token,
        },
      })
      .then((res) => {
        const newRooms = rooms.filter((room) => room.id !== id);
        setRooms(newRooms);
      });
  };

  const searchRoom = async (name) => {
    setLoading(true);
    await axios
      .get(`${process.env.React_App_Url}/user/rooms/booked/${name}`, {
        headers: {
          token: token,
        },
      })
      .then((response) => {
        if (response.data) {
          setRooms(response.data.rooms);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div id="content" className="p-4">
      <div className="card-body">
        <h3 className="card-title text-center">Booked Rooms table</h3>
        <div className="row d-flex align-items-center justify-content-between mr-1">
          <div>
            <input
              type="search"
              className="form-control search_bar"
              placeholder="Search"
              onChange={(e) => searchRoom(e.target.value)}
            />
          </div>
          <Link to={`/user/rooms`}>
            <button className="btn btn-outline-dark mr-1">
              <i className="fa fa-briefcase mr-1"></i> All Rooms
            </button>
          </Link>
        </div>

        <table
          className="table table-responsive dataTable mt-3"
          role="grid"
          style={{ minHeight: "350px" }}
        >
          <thead>
            <tr role="row">
              <th style={{ minWidth: "50px" }}>#</th>
              <th style={{ minWidth: "140px" }}>Hostel Name</th>
              <th style={{ minWidth: "140px" }}>Room No</th>
              <th style={{ minWidth: "140px" }}>Category</th>
              <th style={{ minWidth: "140px" }}>Rent Per Month</th>
              <th style={{ minWidth: "180px" }}>Actions</th>
            </tr>
          </thead>
          {loading ? (
            <div className="loading">
              <img src={Spinner} className="loader" alt="Loader" />
              <h2>Loading</h2>
            </div>
          ) : (
            <tbody>
              {currentRooms.map((room) => (
                <BookedRoomsTableRow
                  deleteBooking={deleteBooking}
                  match={match}
                  room={room}
                />
              ))}
            </tbody>
          )}
        </table>

        <div className="row d-flex align-items-center">
          <div className="col-8 col-md-3 ">
            Showing {indexOfFirstRoom + 1} to {indexOfLastRoom} of{" "}
            {rooms.length} entities
          </div>
          <div class="col-4">
            <label>
              <select
                class="form-control select"
                onChange={(e) => {
                  setRoomsPerPage(e.target.value);
                }}
                value={roomsPerPage}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </label>
          </div>
          <div className="col-12 col-md-4 d-flex justify-content-center">
            <Pagination
              roomsPerPage={roomsPerPage}
              totalRooms={rooms.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookedRooms;
