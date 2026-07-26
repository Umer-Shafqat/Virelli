import React, {
  useContext,
  useState
} from "react";

import axios from "axios";

import "./Login.css";

import { StoreContext } from "../../Context/StoreContext/StoreContext";


const Login = () => {

  // Get setToken from StoreContext
  const { setToken } = useContext(StoreContext);


  // false = Sign In
  // true = Sign Up
  const [isSignUp, setIsSignUp] = useState(false);


  // Backend URL
  const url = "http://localhost:4000";


  // =========================
  // SIGN UP FORM
  // =========================

  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });


  // =========================
  // SIGN IN FORM
  // =========================

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });


  // =========================
  // HANDLE SIGN UP INPUT
  // =========================

  const handleSignUpChange = (e) => {

    const { name, value } = e.target;

    setSignUpData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  // =========================
  // HANDLE SIGN IN INPUT
  // =========================

  const handleSignInChange = (e) => {

    const { name, value } = e.target;

    setSignInData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  // =========================
  // SIGN UP
  // =========================

  const handleSignUp = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        `${url}/api/user/register`,
        signUpData
      );


      console.log(
        "Register Response:",
        response.data
      );


      if (response.data.success) {

        alert(
          "Account created successfully!"
        );


        // Clear signup form
        setSignUpData({
          name: "",
          email: "",
          password: "",
        });


        // Switch to Sign In
        setIsSignUp(false);

      } else {

        alert(
          response.data.message ||
          "Registration failed"
        );

      }

    } catch (error) {

      console.log(
        "Registration Error:",
        error
      );


      console.log(
        "Server Response:",
        error.response?.data
      );


      alert(
        error.response?.data?.message ||
        "Registration failed"
      );

    }

  };


  // =========================
  // SIGN IN
  // =========================

  const handleSignIn = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        `${url}/api/user/login`,
        signInData
      );


      console.log(
        "Login Response:",
        response.data
      );


      if (response.data.success) {

        // Get JWT token
        const token =
          response.data.token;


        // =================================
        // SAVE TOKEN
        // =================================

        // Save in localStorage
        localStorage.setItem(
          "token",
          token
        );


        // IMPORTANT:
        // Update StoreContext token state
        // This makes Add to Cart work
        setToken(token);


        alert(
          "Sign in successful!"
        );


        // Clear form
        setSignInData({
          email: "",
          password: "",
        });


      } else {

        alert(
          response.data.message ||
          "Login failed"
        );

      }

    } catch (error) {

      console.log(
        "Login Error:",
        error
      );


      console.log(
        "Server Response:",
        error.response?.data
      );


      alert(
        error.response?.data?.message ||
        "Login failed"
      );

    }

  };


  return (

    <div className="login-page">

      <div
        className={`login-container ${
          isSignUp
            ? "show-signup"
            : ""
        }`}
      >

        {/* =========================
            SIGN UP FORM
        ========================= */}

        <div className="form-container signup-form">

          <form
            onSubmit={handleSignUp}
          >

            <h1>
              Create Account
            </h1>


            <span>
              Use your email for registration:
            </span>


            <input
              type="text"
              name="name"
              placeholder="Name"
              value={signUpData.name}
              onChange={handleSignUpChange}
              required
            />


            <input
              type="email"
              name="email"
              placeholder="Email"
              value={signUpData.email}
              onChange={handleSignUpChange}
              required
            />


            <input
              type="password"
              name="password"
              placeholder="Password"
              value={signUpData.password}
              onChange={handleSignUpChange}
              required
            />


            <button
              type="submit"
              className="main-button"
            >
              SIGN UP
            </button>

          </form>

        </div>


        {/* =========================
            SIGN IN FORM
        ========================= */}

        <div className="form-container signin-form">

          <form
            onSubmit={handleSignIn}
          >

            <h1>
              Sign in to Virelli
            </h1>


            <span>
              Use your email account:
            </span>


            <input
              type="email"
              name="email"
              placeholder="Email"
              value={signInData.email}
              onChange={handleSignInChange}
              required
            />


            <input
              type="password"
              name="password"
              placeholder="Password"
              value={signInData.password}
              onChange={handleSignInChange}
              required
            />


            <a
              href="#forgot"
              className="forgot-password"
            >
              Forgot your password?
            </a>


            <button
              type="submit"
              className="main-button"
            >
              SIGN IN
            </button>

          </form>

        </div>


        {/* =========================
            OVERLAY
        ========================= */}

        <div className="overlay-container">

          <div className="overlay">

            {/* Sign In Side */}

            <div className="overlay-panel overlay-left">

              <h1>
                Welcome Back!
              </h1>


              <p>
                To keep connected with us
                please login with your
                personal info
              </p>


              <button
                type="button"
                className="ghost-button"
                onClick={() =>
                  setIsSignUp(false)
                }
              >
                SIGN IN
              </button>

            </div>


            {/* Sign Up Side */}

            <div className="overlay-panel overlay-right">

              <h1>
                Hello, Friend!
              </h1>


              <p>
                Enter your personal details
                and start your journey with us
              </p>


              <button
                type="button"
                className="ghost-button"
                onClick={() =>
                  setIsSignUp(true)
                }
              >
                SIGN UP
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};


export default Login;