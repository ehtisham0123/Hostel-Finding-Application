import { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import axios from "axios";
import { Link } from "react-router-dom";

import RoomsTableRow from "./RoomsTableRow";
import Pagination from "./Pagination";
import Spinner from "../../Spinner.png";

function Rooms({ match, location }) {
  const token = reactLocalStorage.get("token");
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage, setRoomsPerPage] = useState(5);
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    setLoading(true);
    let getRoomsData = async () => {
      await axios
        .get(`${process.env.React_App_Url}/admin/rooms/`, {
          headers: {
            token: token,
          }, params: {
            category: category
          },
        })
        .then((response) => {
          if (response.data) {
            setRooms(response.data.result);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getRoomsData();
  }, [category]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const deleteRoom = async (id) => {
    await axios
      .delete(`${process.env.React_App_Url}/admin/rooms/${id}`, {
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
      .get(`${process.env.React_App_Url}/admin/rooms/${name}`, {
        headers: {
          token: token,
        },params: {
            category: category
          },
      })
      .then((response) => {
        if (response.data) {
          setRooms(response.data.result);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const setNewCategories = async (e) => { 
    setCategory(e.target.value);
  }
  return (
    <div id="content" className="p-4">
      <div className="card-body">
        <h3 className="card-title text-center">Rooms table</h3>
        <div className="row d-flex align-items-center justify-content-between mr-1">
          <div className="d-flex align-items-center">
            <input
              type="search"
              className="form-control search_bar ml-3"
              placeholder="Search"
              onChange={(e) => searchRoom(e.target.value)}
            />
            <label>
              <select
                class="form-control form-control select ml-3"
                onChange={setNewCategories}
              >
                <option value="All">ALL</option>
                <option value="One Bed Room">One Bed Room </option>
                <option value="Two Bed Room">Two Bed Room </option>
                <option value="Three Bed Room">Three Bed Room </option>
                <option value="Four Bed Room">Four Bed Room </option>
              </select>
            </label>
          </div>
         </div>

        <table
          className="table table-responsive dataTable mt-3"
          role="grid"
          style={{ minHeight: "350px" }}
        >
          <thead>
            <tr role="row">
             <th style={{ minWidth: "50px" }}>#</th>
              <th style={{ minWidth: "120px" }}>Hostel Name</th>
              <th style={{ minWidth: "120px" }}>Room No</th>
              <th style={{ minWidth: "120px" }}>Category</th>
              <th style={{ minWidth: "120px" }}>Rent Per Month</th>
               <th style={{ minWidth: "120px" }}>Warden</th>
              <th style={{ minWidth: "180px" }}>Actions</th>
            </tr>
          </thead>
          {loading ? (
            <div className="loading">
              <img src={Spinner} className="loader" alt="loader" />
              <h2>Loading</h2>
            </div>
          ) : (
            <tbody>
              {currentRooms.map((room) => (
                <RoomsTableRow
                  match={match}
                  room={room}
                  deleteRoom={deleteRoom}
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

export default Rooms;
