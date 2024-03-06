import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  SignInFailure,
  SignInStart,
  SignInSuccess,
} from "../redux/user/userSlice";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(SignInStart());

      await axios
        .post("/api/auth/sign-in", formData)
        .then((res) => {
          const data = res.data;
          // console.log(data);
          if (data.success === false) {
            dispatch(
              SignInFailure("Sign-in failed. Please check your credentials.")
            );
            return;
          }

          dispatch(SignInSuccess(data));
          navigate("/");
        })
        .catch((err) => {
          dispatch(
            SignInFailure(
              "An error occurred while signing in. Please try again later."
            )
          );
        });
    } catch (err) {
      dispatch(
        SignInFailure(
          "An error occurred while signing in. Please try again later."
        )
      );
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold py-7">Sign In</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3
        rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>

      <div className="flex gap-2 pt-4">
        <p>Don't Have an account </p>
        <Link to={"/sign-up"}>
          <span className="text-blue-500">Sign up</span>
        </Link>
      </div>

      <p className="text-red-700 pt-5">
        {error ? error.message || "Something went wrong!" : ""}
      </p>
      <ToastContainer />
    </div>
  );
};

export default SignIn;
