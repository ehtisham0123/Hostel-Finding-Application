import { useState } from "react";
import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";

function CreateRoom() {
  const token = reactLocalStorage.get("token");
  const [formdata, setFormData] = useState({
    name: "",
    room_number: "",
    account_name: "",
    account_number: "",
    details: "",
    per_month_rent : "",
    category   : "",
    thumbnail   : "",
  });
  const [errors, setErrors] = useState({
    name: "",
    details: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    switch (name) {
      // checking room name
      case "name":
        if (value.length < 3) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "Room Name length must be atleast 3 characters",
          }));
        } else if (value.length > 100) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "Room Name must not exceed 100 characters",
          }));
        } else {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "",
          }));
        }
        break;
      // checking room details
      case "details":
        if (value.length < 8) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "Room Details length must be atleast 8 characters",
          }));
        } else if (value.length > 1000) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "Room Details must not exceed 500 characters",
          }));
        } else {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "",
          }));
        }
        break;
      default:
        break;
    }
  };

  const handlePhoto = (e) => {
    setFormData({ ...formdata, thumbnail: e.target.files[0] });
  };


  const handleSubmit = async (e) => {
    setSuccess("");
    setError("");
    e.preventDefault();
    if (errors.name == "" && errors.details == "") {
      const fd = new FormData();
      fd.append("name", formdata.name);
      fd.append("room_number", formdata.room_number);
      fd.append("account_name", formdata.account_name);
      fd.append("account_number", formdata.account_number);
      fd.append("details", formdata.details);
      fd.append("category", formdata.category);
      fd.append("per_month_rent", formdata.per_month_rent);
      fd.append("thumbnail", formdata.thumbnail);
      await axios
        .post(`${process.env.React_App_Url}/warden/rooms/create`, fd, {
         headers: {
            "Content-Type": "multipart/form-data",
             token: token,
          },
        })
        .then(
          (response) => {
            if (response.data.success) {
              setSuccess(response.data.success);
              setFormData({
                name: "",
                room_number: "",
                account_name: "",
                account_number: "",
                details: "",
                per_month_rent : "",
                per_week_rent   : "",
                category   : "",
                thumbnail   : "",
              });
            }
            else if (response.data.error) {
              setError(response.data.error);
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
  };

  return (
    <div id="content" className="mx-5">
      <div className="text-center my-5 ">
        <h2>Create New Room</h2>
      </div>
      <form onSubmit={handleSubmit} className="needs-validation">
        <div className="row">
          <div className="form-group col-md-6">
            <label for="name">Hostel Name</label>
            <input
              type="text"
              name="name"
              className={`form-control input ${errors.name ? "is-invalid" : ""}`}
              id="name"
              placeholder="Hostel Name"
              onChange={handleChange}
              value={formdata.name}
              required
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>
          <div className="form-group col-md-6">
            <label for="room_number">Room Name / Number</label>
            <input
              type="text"
              name="room_number"
              className={`form-control input ${errors.room_number ? "is-invalid" : ""}`}
              id="room_number"
              placeholder="Room Name / Number"
              onChange={handleChange}
              value={formdata.room_number}
              required
            />
            {errors.room_number && (
              <div className="invalid-feedback">{errors.room_number}</div>
            )}
          </div>
          <div className="form-group col-md-6">
            <label for="category">Category</label>
            <select
              id="category"
              name="category"
              className={`form-control input ${
                errors.category ? "is-invalid" : ""
              }`}
              value={formdata.category}
              onChange={handleChange}
              required
            >
                <option value="">Select Category</option>
                <option value="One Bed Room">One Bed Room </option>
                <option value="Two Bed Room">Two Bed Room </option>
                <option value="Three Bed Room">Three Bed Room </option>
                <option value="Four Bed Room">Four Bed Room </option>
            </select>
            {errors.category && (
              <div className="invalid-feedback">{errors.category}</div>
            )}
          </div>
          <div className="form-group col-md-6">
            <label for="per_month_rent">Per Month Rent</label>
            <input
              type="number"
              name="per_month_rent"
              className={`form-control input`}
              id="per_month_rent"
              placeholder="Per Month Rent"
              onChange={handleChange}
              value={formdata.per_month_rent}
              required
            />
          </div>

          <div className="form-group col-md-6">
            <label for="account_name">Account Name</label>
            <input
              type="text"
              name="account_name"
              className={`form-control input ${errors.account_name ? "is-invalid" : ""}`}
              id="account_name"
              placeholder="Account Name"
              onChange={handleChange}
              value={formdata.account_name}
              required
            />
            {errors.account_name && (
              <div className="invalid-feedback">{errors.account_name}</div>
            )}
          </div>

          <div className="form-group col-md-6">
            <label for="account_number">Account Number</label>
            <input
              type="text"
              name="account_number"
              className={`form-control input ${errors.account_number ? "is-invalid" : ""}`}
              id="account_number"
              placeholder="Account Number"
              onChange={handleChange}
              value={formdata.account_number}
              required
            />
            {errors.account_number && (
              <div className="invalid-feedback">{errors.account_number}</div>
            )}
          </div>
          <div className="form-group col-md-6 mt-1">
            <label for="thumbnail"> Room Thumbnail </label>
            <br />
            <input
              id="thumbnail"
              type="file"
              name="thumbnail"
              className="form-control-file input"
              onChange={handlePhoto}
              required
            />
          </div>
          <div className="form-group col-md-12">
            <label for="details">Details</label>
            <textarea
              name="details"
              className={`form-control input ${errors.details ? "is-invalid" : ""}`}
              id="details"
              placeholder="Details"
              onChange={handleChange}
              value={formdata.details}
              rows="5"
            ></textarea>
            {errors.details && (
              <div className="invalid-feedback">{errors.details}</div>
            )}
          </div>
          

        </div>
        <div className="row">
            {success && (
              <div className="form-group col-md-12">
                <div class="alert alert-success" role="alert">
                  {success}
                </div>
              </div>
            )}
            {error && (
              <div className="form-group col-md-12">
                <div class="alert alert-da" role="alert">
                  {error}
                </div>
              </div>
            )}
          <div className="form-group col-md-12">
            <button type="submit" className="form-control input btn btn-outline-dark">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateRoom;
