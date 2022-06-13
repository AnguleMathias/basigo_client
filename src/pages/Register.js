import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";

import { signUp, reset } from "../features/auth/signup/signupSlice";
import Spinner from "../components/Spinner";

const Register = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const { username, email, password, passwordConfirm } = signUpData;

  const isButtonDisabled = !username || !email || !password || !passwordConfirm;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.signup
  );

  const onChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      toast.error("Password does not match");
    } else {
      const userData = {
        username,
        email,
        password,
      };

      dispatch(signUp(userData));
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Sign Up
        </h1>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={username}
              placeholder="Enter your name..."
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email..."
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password..."
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="passwordConfirm"
              name="passwordConfirm"
              value={passwordConfirm}
              placeholder="Confirm password..."
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-block"
              disabled={isButtonDisabled}
            >
              Sign Up
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;
