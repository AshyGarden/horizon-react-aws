import React, { useContext } from "react";
import "../scss/startPage.scss";
import welcome from "../img/welcome.png";
import { Link } from "react-router-dom";
import MainScreen from "../../main/js/MainScreen";
import galaxy from "../img/galaxy.gif";
import { AuthContext } from "../../../util/AuthContext";

const StartPage = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <>
      <div className="start-wrapper">
        <div className="logo-welcome">
          <img
            className="main-logo"
            src={"/final-logo-removebg.png"}
            alt="logo"
          />
          <img className="welcome-img" src={welcome} alt="welcome-img" />
        </div>
        <div className="setBtn">
          <Link to="/Main">
            <button className="start-btn page-btn">Start</button>
          </Link>
          {!isLoggedIn && (
            <>
              <Link to="/Join">
                <button className="join-btn page-btn">Join</button>
              </Link>
              <Link to="/Login">
                <button className="login-btn page-btn">Login</button>
              </Link>
            </>
          )}
          {isLoggedIn && (
            <Link to="/Mypage">
              <button className="mypage-btn page-btn">Mypage</button>
            </Link>
          )}
        </div>
      </div>
      {/* <div className='main-start-img'>
        <img className='start-page-body' src={galaxy} alt='universegif' />
      </div> */}
    </>
  );
};

export default StartPage;
