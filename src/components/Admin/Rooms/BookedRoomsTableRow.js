import { Link } from "react-router-dom";
function BookedRoomsTableRow({ match, user, deleteBooking }) {
  return (
    <tr role="row">
      <td>{user.id}</td>
      <td className="img_cont">
        <img
            style = {{marginTop:"-5px",marginBottom:"-5px"}}
           src={`${process.env.React_App_Url}/uploads/${user.avatar}`} alt={user.name}
           className="user_img"
        />
      </td>
      <td>{user.firstname} {user.lastname}</td>
      <td>{user.email}</td>
      <td className="d-flex">
       <Link to={`/admin/users/profile/${user.id}`}>
          <button className="btn btn-sm btn-outline-dark mr-1">
            View User Profile
          </button>
        </Link>
       <button
          className="btn btn-sm btn-outline-dark"
          onClick={(e) => deleteBooking(user.id)}
        >
          Delete Booking
        </button>
      </td>
    </tr>
  );
}

export default BookedRoomsTableRow;
