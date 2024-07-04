import { Link } from "react-router-dom";
function RoomsTableRow({ match, room }) {
  return (
    <tr role="row">
      <td>{room.id}</td>
      <td>{room.name}</td>
      <td>{room.room_number}</td>
      <td>{room.category}</td>
      <td>{room.per_month_rent}</td> 
      <td>{room.warden_name}</td>
    
      <td>
        <Link to={`/user/rooms/view/${room.id}`}>
          <button className="btn btn-sm btn-outline-dark mr-1">View</button>
        </Link>   
      </td>
    </tr>
  );
}

export default RoomsTableRow;
