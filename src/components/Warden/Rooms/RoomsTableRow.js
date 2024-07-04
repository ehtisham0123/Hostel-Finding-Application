import { Link } from "react-router-dom";
function RoomsTableRow({ match, room, deleteRoom,hideRoom,unhideRoom }) {
  return (
    <tr role="row">
      <td>{room.id}</td>
      <td>{room.name}</td>
      <td>{room.room_number}</td>
      <td>{room.category}</td>
      <td>{room.per_month_rent}</td>
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
          className="btn btn-sm btn-outline-dark  mr-1"
          onClick={(e) => deleteRoom(room.id)}
        >
          Delete
        </button>
        {room.hidden == "False" && (

        <button
          className="btn btn-sm btn-outline-dark"
          onClick={(e) => hideRoom(room.id)}
        >
          Hide
        </button> 
          )}
        {room.hidden == "True" && (
           <button
            className="btn btn-sm btn-outline-dark"
            onClick={(e) => unhideRoom(room.id)}
          >
            Show
          </button>
        )}
       
      </td>
    </tr>
  );
}

export default RoomsTableRow;
