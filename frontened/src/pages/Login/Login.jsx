import React, { useState } from "react";
import "./Login.css";

const Login = () => {

  // false = Sign In
  // true = Sign Up
  const [isSignUp, setIsSignUp] = useState(false);


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

  const handleSignUp = (e) => {

    e.preventDefault();

    console.log(
      "Sign Up Data:",
      signUpData
    );

    alert("Account created successfully!");

  };


  // =========================
  // SIGN IN
  // =========================

  const handleSignIn = (e) => {

    e.preventDefault();

    console.log(
      "Sign In Data:",
      signInData
    );

    alert("Sign in successful!");

  };


  return (

    <div className="login-page">


      {/* =========================
          MAIN CONTAINER
      ========================= */}

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


            {/* Social Icons */}

          


            <span>
              Use your email for registration:
            </span>


            {/* Name */}

            <input
              type="text"
              name="name"
              placeholder="Name"
              value={signUpData.name}
              onChange={handleSignUpChange}
              required
            />


            {/* Email */}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={signUpData.email}
              onChange={handleSignUpChange}
              required
            />


            {/* Password */}

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


            {/* Social Icons */}

          
            <span>
              Use your email account:
            </span>


            {/* Email */}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={signInData.email}
              onChange={handleSignInChange}
              required
            />


            {/* Password */}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={signInData.password}
              onChange={handleSignInChange}
              required
            />


            {/* Forgot Password */}

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