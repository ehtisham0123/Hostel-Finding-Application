import { Link } from "react-router-dom";
function UsersTableRow({match,user,deleteUser}) {
  return (
      <tr role="row">
      <td className="img_cont">
        <img
            style = {{marginTop:"-5px",marginBottom:"-5px"}}
           src={`${process.env.React_App_Url}/uploads/${user.avatar}`} alt={user.name}
           className="user_img"
        />
      </td>
      <td>{user.firstname} {user.lastname}</td>
      <td>{user.email}</td>
      <td>{user.contact}</td>
      <td>{user.gender}</td>
      <td>{user.city}</td>
      <td>
        <Link to={`${match.url}/profile/${user.id}`}>
          <button className="btn btn-sm btn-outline-dark mr-1">
            View
          </button>
        </Link>
        <Link to={`${match.url}/edit/${user.id}`}>
          <button className="btn btn-sm btn-outline-dark mr-1">
            Edit
          </button>
        </Link>
        <button
          className="btn btn-sm btn-outline-dark"
          onClick={(e) => deleteUser(user.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default UsersTableRow;
