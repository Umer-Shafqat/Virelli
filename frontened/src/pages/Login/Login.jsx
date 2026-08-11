import React, {useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { StoreContext } from "../../Context/StoreContext/StoreContext";


const Login = () => {

  const { setToken } = useContext(StoreContext);
const navigate = useNavigate();


  const [isSignUp, setIsSignUp] = useState(false);
  const url = import.meta.env.VITE_API_URL;

  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });
  const handleSignUpChange = (e) => {

    const { name, value } = e.target;

    setSignUpData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  const handleSignInChange = (e) => {

    const { name, value } = e.target;

    setSignInData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

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

        setSignUpData({
          name: "",
          email: "",
          password: "",
        });

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


        localStorage.setItem(
          "token",
          token
        );

        setToken(token);

setSignInData({
  email: "",
  password: "",
});

navigate("/");


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
              autoComplete="email"
              required
            />


            <input type="password" 
            name="password" 
            placeholder="Password" 
            value={signUpData.password} 
            onChange={handleSignUpChange} 
            autoComplete="new-password" 
            required />


            <button
              type="submit"
              className="main-button"
            >
              SIGN UP
            </button>

          </form>

        </div>

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
              autoComplete="email"
              required
            />


            <input type="password" 
            name="password" 
            placeholder="Password" 
            value={signInData.password}
            onChange={handleSignInChange} 
            autoComplete="current-password" 
            required />


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


        <div className="overlay-container">

          <div className="overlay">

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