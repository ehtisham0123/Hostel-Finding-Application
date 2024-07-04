import { Link } from "react-router-dom";
function WardensTableRow({match,warden,deleteWarden}) {
  return (
      <tr role="row">
      <td className="img_cont">
        <img
            style = {{marginTop:"-5px",marginBottom:"-5px"}}
           src={`${process.env.React_App_Url}/uploads/${warden.avatar}`} alt={warden.name}
           className="user_img"
        />
      </td>
      <td>{warden.firstname} {warden.lastname}</td>
      <td>{warden.email}</td>
      <td>{warden.contact}</td>
      <td>{warden.gender}</td>
      <td>{warden.city}</td>
      <td>
        <Link to={`${match.url}/profile/${warden.id}`}>
          <button className="btn btn-sm btn-outline-dark mr-1">
            View
          </button>
        </Link>
        <Link to={`${match.url}/edit/${warden.id}`}>
          <button className="btn btn-sm btn-outline-dark mr-1">
            Edit
          </button>
        </Link>
        <button
          className="btn btn-sm btn-outline-dark"
          onClick={(e) => deleteWarden(warden.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default WardensTableRow;
