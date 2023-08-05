import React from "react";
import CSHeader from "../../constellation/js/CSHeader";
import "../scss/MainScreen.scss";
import { Link } from "react-router-dom";
import kindpng_5401205 from "../assets/kindpng_5401205.png";
import blackHole from "../assets/blackHole.png";
import Cosmos from "../assets/Cosmos.png";
import { height } from "@mui/system";

const MainScreen = () => {
  return (
    <>
      <CSHeader />
      <div className="MainMenu">
        <div className="BigBtn">
          <Link to="/News" style={{ width: "550px", height: "695px" }}>
            <div className="NewsMenu">
              <button className="News-main-btn">News</button>
              <img
                className="News-image"
                src={kindpng_5401205}
                alt="News Image"
              ></img>
            </div>
          </Link>
          <Link to="/SolarSystem" style={{ width: "550px", height: "695px" }}>
            <div className="solarMenu">
              <button className="Solar-main-btn">SolarSystem</button>
              <img
                className="Cosmos"
                src={Cosmos}
                alt="solarSystem Menu image"
              />
            </div>
          </Link>
          <Link to="/Store" style={{ width: "550px", height: "695px" }}>
            <div className="storeMenu">
              <button className="store-main-btn">Store</button>
              <img
                className="storeImage"
                src={blackHole}
                alt="Store Menu image"
              />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MainScreen;
