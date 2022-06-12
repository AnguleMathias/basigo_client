import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCustomer } from "../features/customers/customersSlice";

const CustomerForm = ({ lead }) => {
  const [customerData, setCustomerData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    location: "",
    gender: "",
    photo: "",
    annualEarnings: "",
    productsOfInterest: "",
    leadId: lead,
  });
  console.log("lead", lead);

  const {
    firstName,
    middleName,
    lastName,
    phone,
    photo,
    location,
    gender,
    leadId,
    annualEarnings,
    productsOfInterest,
  } = customerData;

  const dispatch = useDispatch();

  const onChange = (e) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();

    const customerData = {
      firstName,
      middleName,
      lastName,
      phone,
      photo,
      location,
      gender,
      leadId,
      annualEarnings,
      productsOfInterest,
    };
    console.log("customerData", customerData);

    dispatch(createCustomer(customerData));
    // window.location.reload();
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="photo" className="text">
            Photo
          </label>
          <input
            type="text"
            name="photo"
            id="photo"
            value={photo}
            onChange={onChange}
            placeholder="Enter photo..."
          />
        </div>
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
            placeholder="Enter first name..."
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
            placeholder="Enter middle name..."
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
            placeholder="Enter last name..."
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
            placeholder="Enter location..."
          />
        </div>
        <div className="form-group">
          <label htmlFor="annualEarnings" className="text">
            Annual earnings
          </label>
          <input
            type="text"
            name="annualEarnings"
            id="annualEarnings"
            value={annualEarnings}
            onChange={onChange}
            placeholder="Enter annual earnings..."
          />
        </div>
        <div className="form-group">
          <label htmlFor="productsOfInterest" className="text">
            Products of interest
          </label>
          <input
            type="text"
            name="productsOfInterest"
            id="productsOfInterest"
            value={productsOfInterest}
            onChange={onChange}
            placeholder="Enter products of interest..."
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
          <button className="btn btn-block" type="submit">
            Create Customer
          </button>
        </div>
      </form>
    </section>
  );
};

export default CustomerForm;
