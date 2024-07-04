import { Link } from "react-router-dom";
function RoomsTableRow({ match, room, deleteRoom }) {
  return (
    <tr role="row">      

      <td>{room.id}</td>
      <td>{room.name}</td>
      <td>{room.room_number}</td>
      <td>{room.category}</td>
      <td>{room.per_month_rent}</td> 
      <td>{room.warden_name}</td>
      <td>
        <Link to={`${match.url}/view/${room.id}`}>
          <button className="btn btn-sm btn-outline-dark mr-1">View</button>
        </Link>
        <Link to={`${match.url}/edit/${room.id}`}>
          <button className="btn btn-sm btn-outline-dark mr-1">
            Edit
          </button>
        </Link>
        <button
          className="btn btn-sm btn-outline-dark"
          onClick={(e) => deleteRoom(room.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default RoomsTableRow;
