import { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import axios from "axios";
import { Link,useParams } from "react-router-dom";

import BookedRoomsTableRow from "./BookedRoomsTableRow";
import Pagination from "./Pagination";
import Spinner from "../../Spinner.png";

function BookedUsers({ match, location }) {
  const token = reactLocalStorage.get("token");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);


  let { id } = useParams();

  useEffect(() => {
    setLoading(true);
    let getUsersData = async () => {
      await axios
        .get(`${process.env.React_App_Url}/warden/rooms/booked-rooms/${id}`, {
          headers: {
            token: token,
          }, 
        })
        .then((response) => {
          if (response.data) {
            setUsers(response.data.result);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getUsersData();
  }, []);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

   const deleteBooking = async (user_id) => {
    await axios
      .delete(`${process.env.React_App_Url}/warden/rooms/booking/room/${id}/user/${user_id}`,
      {
        headers: {
          token: token,
        },
      }
      )
      .then((res) => {
      setUsers(users.filter((user) => user.id !== user_id));
      });
  };


  return (
    <div id="content" className="p-4">
      <div className="card-body">
        <h3 className="card-title text-center mb-5">Booked Rooms table</h3>
        <table
          className="table table-responsive dataTable mt-3"
          role="grid"
          style={{ minHeight: "350px" }}
        >
          <thead>
            <tr role="row">
              <th style={{ minWidth: "100" }}>#</th>
              <th style={{ minWidth: "100px" }}>Photo</th>
              <th style={{ minWidth: "100px" }}>User Name</th>
              <th style={{ minWidth: "200px" }}>User Email</th>
              <th style={{ minWidth: "100px" }}>Actions</th>
            </tr>
          </thead>
          {loading ? (
            <div className="loading">
              <img src={Spinner} className="loader" alt="loader" />
              <h2>Loading</h2>
            </div>
          ) : (
            <tbody>
              {currentUsers.map((user) => (
                <BookedRoomsTableRow
                  match={match}
                  user={user}
                  deleteBooking={deleteBooking}
                />
              ))}
            </tbody>
          )}
        </table>

        <div className="row d-flex align-items-center">
          <div className="col-8 col-md-3 ">
            Showing {indexOfFirstUser + 1} to {indexOfLastUser} of{" "}
            {users.length} entities
          </div>
          <div class="col-4">
            <label>
              <select
                class="form-control select"
                onChange={(e) => {
                  setUsersPerPage(e.target.value);
                }}
                value={usersPerPage}
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
              roomsPerPage={usersPerPage}
              totalRooms={users.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookedUsers;
