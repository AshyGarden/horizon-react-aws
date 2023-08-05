import React from "react";
import "../scss/context.scss";

const PlanetContext = ({ essential, optional }) => {
  const { celNameKor, celNameEng, diameter, surface, comment, mass, rotation } =
    essential;
  const {
    earthLike,
    orbitRadius,
    revolution,
    satellite1,
    satellite2,
    satellites,
  } = optional;

  let earthLikeName = "";
  if (earthLike) {
    earthLikeName = "지구";
  } else {
    earthLikeName = "목성";
  }

  return (
    <>
      <div className="planet-content-box">
        <div className="content" style={{ whiteSpace: "pre-line" }}>
          <br />
          {comment}
        </div>
      </div>

      <div className="left-planet-content-box">
        <div className="left-content">
          <div className="planet-name-box">
            <div className="title-k">{celNameKor}</div>
            <div className="title-e">{celNameEng}</div>
          </div>

          <div className="planet-information">
            <div className="planet-info diameter">지름: ({diameter} km)</div>
            <div className="planet-info surface-area">
              표면적: ({surface} km²)
            </div>
            <div className="planet-info mass">질량: ({mass} kg)</div>
            <div className="planet-info rotation">
              자전주기: ({rotation} 일)
            </div>
            {revolution == 0 ? (
              ""
            ) : (
              <div className="planet-info revolution">
                공전주기: ({revolution} 일)
              </div>
            )}
            {celNameEng == "Sun" ? (
              ""
            ) : (
              <div className="planet-info earthLike">
                {earthLikeName}형 행성
              </div>
            )}
            {orbitRadius == 0 ? (
              ""
            ) : (
              <div className="planet-info orbital-radius">
                궤도 반지름: ({orbitRadius} AU)
              </div>
            )}
            {satellite1 && (
              <div className="planet-info main-satellite">
                대표위성: {satellite1}
                {satellite2 ? `, ${satellite2}` : ""}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlanetContext;
