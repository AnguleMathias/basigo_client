import { useState } from "react";
import { useDispatch } from "react-redux";
import { createLead } from "../features/leads/leadsSlice";

const LeadForm = ({ user }) => {
  const [leadData, setLeadData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    location: "",
    gender: "",
  });

  const { firstName, middleName, lastName, phone, location, gender } = leadData;

  const dispatch = useDispatch();

  const onChange = (e) => {
    setLeadData({ ...leadData, [e.target.name]: e.target.value });
  };
  const isFormNotComplete = !firstName || !lastName || !phone || !location;

  const onSubmit = (e) => {
    e.preventDefault();

    const leadData = {
      firstName,
      middleName,
      lastName,
      phone,
      location,
      gender,
    };

    dispatch(createLead(leadData));
    window.location.reload();
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="firstName" className="text">
            First name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={firstName}
            onChange={onChange}
            placeholder="Enter your first name..."
          />
        </div>
        <div className="form-group">
          <label htmlFor="middleName" className="text">
            Middle name
          </label>
          <input
            type="text"
            name="middleName"
            id="middleName"
            value={middleName}
            onChange={onChange}
            placeholder="Enter your middle name..."
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName" className="text">
            Last name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={lastName}
            onChange={onChange}
            placeholder="Enter your last name..."
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone" className="text">
            Phone number
          </label>
          <input
            type="phone"
            name="phone"
            id="phone"
            value={phone}
            onChange={onChange}
            placeholder="01234567890"
          />
        </div>
        <div className="form-group">
          <label htmlFor="location" className="text">
            Location
          </label>
          <input
            type="text"
            name="location"
            id="location"
            value={location}
            onChange={onChange}
            placeholder="Enter your location..."
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender" className="text">
            Gender
          </label>
          <select name="gender" id="gender" onChange={onChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="form-group">
          {isFormNotComplete ? (
            <p
              style={{
                color: "red",
                display: "flex",
                justifyContent: "center",
                marginBottom: "3rem",
              }}
            >
              Complete form to submit!
            </p>
          ) : (
            <button className="btn btn-block" type="submit">
              Create Lead
            </button>
          )}
        </div>
      </form>
    </section>
  );
};

export default LeadForm;
