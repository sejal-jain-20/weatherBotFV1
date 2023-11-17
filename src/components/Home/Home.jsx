import React, { useState, useEffect } from 'react';
import img from '../asset/bot1.jpg';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AdminDashboard from "../Admin/AdminDashboard";

const Home = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedGivenName = localStorage.getItem("given_name");
    if (storedEmail || storedGivenName) {
      setIsSignedIn(true);
    }
  }, []);

  const handleGoogleSignIn = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    localStorage.setItem("email", decoded.email);
    localStorage.setItem("given_name", decoded.given_name);
    setIsSignedIn(true);
    console.log(decoded.email);
  };

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("given_name");
    setIsSignedIn(false);
  };

  return (
    <>
      <GoogleOAuthProvider clientId="927444201471-qnamkjgc27lp5824bipdtcq6nb0jilrg.apps.googleusercontent.com">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg bg-body-tertiary d-flex justify-content-between">
          <div className="container">
            <h1>
              <a className="navbar-brand" href="#">
                Weather_API
              </a>
            </h1>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarNav"
            >
              <ul className="navbar-nav">
                <li>
                  {isSignedIn ? (
                    // Render this when the user is signed in
                    <>
                      Welcome, {localStorage.getItem("given_name")}!
                      <button onClick={handleLogout} className="btn btn-outline-danger">
                        Logout
                      </button>
                    </>
                  ) : (
                    // Render this when the user is not signed in
                    <GoogleLogin
                      onSuccess={handleGoogleSignIn}
                      onError={() => {
                        console.log("Login Failed");
                      }}
                    />
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Admin - Dashboard */}
        {isSignedIn ? (
          <AdminDashboard />
        ) : (
          <>
            <div className="container text-center">
              <div className="row align-items-center">
                {/* Left Column */}
                <div className="col-md-6 d-flex justify-content-center">
                  <div>
                    <h2 className="text-center">
                      Join us on telegram for getting daily updates on weather
                    </h2>
                    <div className="text-center mt-3">
                      <button type="button" className="btn btn-primary">
                        <a href="https://t.me/weatherApi_details_bot" className='text-light'>Join us</a>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="col-md-6 mt-2">
                  <img src={img} alt="" className="img-fluid" />
                </div>
              </div>
            </div>
          </>
        )}
        {/* Home page hero window */}
      </GoogleOAuthProvider>
    </>
  );
};

export default Home;
