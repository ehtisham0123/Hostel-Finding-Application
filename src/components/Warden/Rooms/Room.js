import { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import StarRatings from "react-star-ratings";

import axios from "axios";
import { Link, useParams } from "react-router-dom";

function Room() {
  
  const token = reactLocalStorage.get("token");
  const [reviews, setReviews] = useState([]);
  const [room, setRoom] = useState([]);
  let { id } = useParams();
  useEffect(() => {
    let getUserData = async () => {
      await axios
        .get(`${process.env.React_App_Url}/warden/rooms/show/${id}`, {
        headers: {
          token: token,
        },
      })
        .then((response) => {
          if (response.data) {
            setRoom(response.data.result[0]);
            setReviews(response.data.reviews)
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getUserData();
  }, []);


  return (
    <div id="content" className="mx-3">
   <div className="container">
<h3 className="card-title text-center my-5">Room Details</h3>
<div className="row">
    <div className="col-md-12">
        <div className="card">
         <div className="card-header border d-flex justify-content-between">
                <h4 className="card-title mb-0">{room.name} {room.room_number}</h4>
                <div> 
                  <Link to={`/warden/rooms/booked-rooms/${room.id}`}>
                    <button className="btn btn-outline-dark btn-sm mr-1">
                      booked rooms
                    </button>
                  </Link>
                </div>
              </div>
            <div className="card-body h-100">
                <p className="no-margin-bottom">{room.details} </p>                              
                   <div class="row my-5">
                  <div class="col-6">
                    <div class="row">
                      <div class="col-6">
                        <p class="mb-0">Category</p>
                      </div>
                      <div class="col-6">
                        {room.category}
                      </div>
                    </div>
                    <div class="row mt-4">
                      <div class="col-6">
                        <p class="mb-0">Per Month Rent</p>
                      </div>
                      <div class="col-6">
                        {room.per_month_rent}
                      </div>
                    </div>
                    <div class="row mt-4">
                      <div class="col-6">
                        <p class="mb-0">{room.account_name}</p>
                      </div>
                      <div class="col-6">
                        {room.account_number}
                      </div>
                    </div>
                  </div>

                  <div class="col-6">
                    <a href={`http://localhost:5000/uploads/${room.thumbnail}`} target="_blank" >
                      <img
                        src={`${process.env.React_App_Url}/uploads/${room.thumbnail}`}
                        alt={room.name}
                        height="190"
                        style={{ marginTop: '-20px' }}
                      />
                    </a>
                  </div>
                </div>
                {reviews.map((review) => (
                    <div className="media mb-4">
                        <img src={`${process.env.React_App_Url}/uploads/${review.user_photo}`} alt={room.user_name} width="36" height="36" className="rounded-circle mr-2"/>
                        <div className="media-body">                 
                            <strong>{review.user_firstname} {review.user_lastname}</strong> added a review on <strong>{room.name}</strong>'s Room
                            <br/>
                            <small className="text-muted">{review.created_at}</small>
                                <div className="row">
                                    <div className="col-md-6 text-warning font-weight-bold">
                                       <StarRatings
                                        rating={review.reviews}
                                        starRatedColor="#000"
                                        starDimension="20px"
                                        starSpacing="2px"
                                        numberOfStars={5}
                                      />
                                    </div>
                                </div>
                            <div className="border text-sm text-muted p-2 mt-1">
                                {review.reviews_details}
                            </div>
                        </div>
                    <hr/> 
                    </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Room;
