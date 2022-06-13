import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Input } from "@chakra-ui/core";

import { createCustomer } from "../features/customers/customersSlice";
import { getProducts, reset } from "../features/products/productsSlice";
import Spinner from "./Spinner";

const CustomerForm = ({ lead, setIsModalOpen }) => {
  const [customerData, setCustomerData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    location: "",
    gender: "Male",
    photo: "",
    annualEarning: "",
    productsOfInterest: "product A",
    leadId: lead,
  });

  const {
    firstName,
    middleName,
    lastName,
    phone,
    photo,
    location,
    gender,
    leadId,
    annualEarning,
    productsOfInterest,
  } = customerData;

  const dispatch = useDispatch();

  const { products, isLoading, isError, message } = useSelector(
    (state) => state.products
  );

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
      annualEarning,
      productsOfInterest,
    };

    dispatch(createCustomer(customerData));
    setIsModalOpen(false);
    window.location.reload();
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getProducts());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="profile profile-theme-dragdropbox">
          <input
            style={{
              zIndex: "999",
              opacity: "0",
              width: "320px",
              height: "200px",
              position: "absolute",
              right: "0px",
              left: "0px",
              marginRight: "auto",
              marginLeft: "auto",
            }}
            name="photo"
            id="photo"
            type="file"
            onChange={onChange}
            accept="image/png, image/jpeg"
          />
          <div className="profile-input-dragDrop">
            <div className="profile-input-inner">
              <div className="profile-input-icon">
                <i className="fa fa-file-image-o"></i>
              </div>
              <div className="profile-input-text">
                <h3>Drop Image here</h3>{" "}
                <span style={{ display: "inline-block", margin: "15px 0" }}>
                  or
                </span>
              </div>
              <span className="profile-input-choose-btn blue">
                Browse Files
              </span>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="firstName" className="text">
            First name
          </label>
          <Input
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
          <Input
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
          <Input
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
          <Input
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
          <Input
            type="text"
            name="location"
            id="location"
            value={location}
            onChange={onChange}
            placeholder="Enter location..."
          />
        </div>
        <div className="form-group">
          <label htmlFor="annualEarning" className="text">
            Annual earnings
          </label>
          <Input
            type="text"
            name="annualEarning"
            id="annualEarning"
            value={annualEarning}
            onChange={onChange}
            placeholder="Enter annual earnings..."
          />
        </div>
        <div className="form-group">
          <label htmlFor="productsOfInterest" className="text">
            Products of interest
          </label>
          <select
            name="productsOfInterest"
            id="productsOfInterest"
            onChange={onChange}
          >
            {products &&
              products.map((product) => (
                <option key={product.id} value={product.title}>
                  {product.title} ({product.shortDescription})
                </option>
              ))}
          </select>
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
