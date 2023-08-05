import React, { useRef, useEffect, useState } from "react";
import "../scss/SolarSystemModel.scss";
import * as THREE from "three";
import {
  Scene,
  MeshBasicMaterial,
  Mesh,
  PerspectiveCamera,
  MOUSE,
  Vector2,
  Vector3,
  Vector4,
  Quaternion,
  Matrix4,
  Spherical,
  Box3,
  Sphere,
  Raycaster,
  MathUtils,
  Clock,
  SphereGeometry,
  TextureLoader,
  AmbientLight,
  PointLight,
  MeshStandardMaterial,
  Object3D,
  RingGeometry,
  DoubleSide,
  MeshPhongMaterial,
  Line,
  LineBasicMaterial,
  CircleGeometry,
  TorusGeometry,
  WebGLRenderer,
} from "three";
import CameraControls from "camera-controls";
import ModelLoadingPage from "./ModelLoadingPage";
import Footer from "../../layout/js/Footer";
import PlanetContext from "../../layout/js/PlanetContext";
import PageHeader from "../../layout/js/PageHeader";
import { getLoginUserInfo } from "../../../util/login-utils";
import { API_BASE_URL as BASE, SOLAR } from "../../../config/host-config";

const SolarSystemModel = () => {
  const canvasRef = useRef(null);

  // 로딩중인지 아닌지 확인
  const [isLoading, setIsLoading] = useState(true);
  let count = 0;

  // 버튼눌렀을 때 값 가져오기
  const [change, setChange] = useState("All");

  const changeValue = (e) => {
    setChange(e.target.value);
  };

  // 값 변경되어도 useEffect에서 적용이 안돼서 적용되게 작성
  const changeRef = useRef(change);
  useEffect(() => {
    changeRef.current = change;
  }, [change]);

  // script 태그 src가 제대로 들어오지 않아 내용 넣기.
  useEffect(() => {
    const SolarSystemScript = () => {
      // 1 Scene 시작 위치 설정
      const scene = new Scene();
      const canvas = canvasRef.current;

      // 2 the object
      // 2.1 GEOMETRY
      const sphereGeometry = new SphereGeometry(0.5);
      const ringGeometry = new RingGeometry(10, 20, 32);

      // 2.2 행성 이미지 삽입
      const loader = new TextureLoader();

      const sunMaterial = new MeshBasicMaterial({
        map: loader.load(require("../img/sun.jpeg")),
      });
      const mercuryMaterial = new MeshStandardMaterial({
        map: loader.load(require("../img/mercury.png")),
      });
      const venusMaterial = new MeshStandardMaterial({
        map: loader.load(require("../img/venus.jpeg")),
      });
      const earthMaterial = new MeshStandardMaterial({
        map: loader.load(require("../img/earth.jpeg")),
      });
      const moonMaterial = new MeshStandardMaterial({
        map: loader.load(require("../img/moon.jpg")),
      });
      const marsMaterial = new MeshStandardMaterial({
        map: loader.load(require("../img/mars.jpeg")),
      });
      const jupiterMaterial = new MeshStandardMaterial({
        map: loader.load(require("../img/jupiter.jpg")),
      });
      const saturnMaterial = new MeshStandardMaterial({
        map: loader.load(require("../img/saturn.jpg")),
      });
      const saturnRingMaterial = new MeshBasicMaterial({
        map: loader.load(require("../img/saturn-ring.png")),
        side: DoubleSide,
      });
      const uranusMaterial = new MeshStandardMaterial({
        map: loader.load(require("../img/uranus.jpg")),
      });
      const neptuneMaterial = new MeshStandardMaterial({
        map: loader.load(require("../img/neptune.jpg")),
      });

      // 2.3 CREATION Mesh(geometry, Material) 행성 생성
      const sun = new Mesh(sphereGeometry, sunMaterial);
      const sunObj = new Object3D();
      sunObj.add(sun);
      scene.add(sunObj);

      const mercury = new Mesh(sphereGeometry, mercuryMaterial);
      const mercuryObj = new Object3D();
      mercury.name = "mercury";
      mercuryObj.name = "mercuryObj";
      mercuryObj.add(mercury);
      mercuryObj.rotation.y = 5; // 시작 위치
      scene.add(mercuryObj);
      mercury.scale.set(0.2, 0.2, 0.2); //크기
      mercury.position.x += 1; // 거리 설정

      const venus = new Mesh(sphereGeometry, venusMaterial);
      const venusObj = new Object3D();
      venus.name = "venus";
      venusObj.name = "venusObj";
      venusObj.rotation.y = 2;
      venusObj.add(venus);
      scene.add(venusObj);
      venus.scale.set(0.3, 0.3, 0.3);
      venus.position.x += 1.5;

      const earth = new Mesh(sphereGeometry, earthMaterial);
      const earthObj = new Object3D();
      earth.name = "earth";
      earthObj.name = "earthObj";
      earthObj.add(earth);
      earthObj.rotation.y = 8;
      scene.add(earthObj);
      earth.scale.set(0.3, 0.3, 0.3);
      earth.position.x += 2;

      const moon = new Mesh(sphereGeometry, moonMaterial);
      const moonObj = new Object3D();
      moon.name = "moon";
      moonObj.name = "moonObj";
      moonObj.add(moon);
      moon.scale.set(0.3, 0.3, 0.3);
      moon.rotation.y = 8;
      earth.add(moonObj);
      moon.position.x += 1;

      const mars = new Mesh(sphereGeometry, marsMaterial);
      const marsObj = new Object3D();
      mars.name = "mars";
      marsObj.name = "marsObj";
      marsObj.rotation.y = 5;
      marsObj.add(mars);
      scene.add(marsObj);
      mars.scale.set(0.25, 0.25, 0.25);
      mars.position.x += 2.5;

      const jupiter = new Mesh(sphereGeometry, jupiterMaterial);
      const jupiterObj = new Object3D();
      jupiter.name = "jupiter";
      jupiterObj.name = "jupiterObj";
      jupiterObj.rotation.y = 34;
      jupiterObj.add(jupiter);
      scene.add(jupiterObj);
      jupiter.scale.set(0.5, 0.5, 0.5);
      jupiter.position.x += 3;

      const saturn = new Mesh(sphereGeometry, saturnMaterial);
      const saturnObj = new Object3D();
      saturn.name = "saturn";
      saturnObj.name = "saturnOBJ";
      saturnObj.rotation.y = 9;
      saturnObj.add(saturn);
      scene.add(saturnObj);
      saturn.scale.set(0.4, 0.4, 0.4);
      saturn.position.x += 4;

      const saturnRing = new Mesh(ringGeometry, saturnRingMaterial);
      saturnRing.name = "saturnRing";
      saturnObj.add(saturnRing);
      saturnRing.scale.set(0.03, 0.03, 0.03);
      saturnRing.position.x += 4;
      saturnRing.rotateX(-1.57);

      const uranus = new Mesh(sphereGeometry, uranusMaterial);
      const uranusObj = new Object3D();
      uranus.name = "uranus";
      uranusObj.name = "uranus";
      uranus.rotation.x = Math.PI / 2;
      uranusObj.add(uranus);
      scene.add(uranusObj);
      uranus.scale.set(0.35, 0.35, 0.35);
      uranus.position.x += 5;

      const neptune = new Mesh(sphereGeometry, neptuneMaterial);
      const neptuneObj = new Object3D();
      neptune.name = "neptune";
      neptuneObj.name = "neptune";
      neptuneObj.rotation.y = 15;
      neptuneObj.add(neptune);
      scene.add(neptuneObj);
      neptune.scale.set(0.3, 0.3, 0.3);
      neptune.position.x += 5.5;

      // 3 the camera 카메라
      const camera = new PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        2000
      );
      camera.position.z = 6; // 높을수록 멀리서 봄
      scene.add(camera);

      // 4 the renderer
      const renderer = new WebGLRenderer({ canvas: canvas });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight, false);

      // 5 lights 명암
      const pointLight = new PointLight(0xffffff, 2, 300);
      scene.add(pointLight);

      const ambientLight = new AmbientLight(0x333333);
      scene.add(ambientLight);

      // 6.2 Starfield
      var starGeometry = new SphereGeometry(2000, 100, 100);
      var starMaterial = new MeshPhongMaterial({
        map: loader.load(require("../img/stars_a.jpg")),
        side: DoubleSide,
        shininess: 1,
      });
      var starField = new Mesh(starGeometry, starMaterial);
      scene.add(starField);

      // 7 responsivity
      window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight, false);
      });

      // 8 Controls
      const subsetOfTHREE = {
        MOUSE,
        Vector2,
        Vector3,
        Vector4,
        Quaternion,
        Matrix4,
        Spherical,
        Box3,
        Sphere,
        Raycaster,
        LineBasicMaterial,
        CircleGeometry,
        Line,
        TorusGeometry,
        MeshBasicMaterial,
        Mesh,
        MathUtils: {
          DEG2RAD: MathUtils.DEG2RAD,
          clamp: MathUtils.clamp,
        },
      };

      CameraControls.install({ THREE: subsetOfTHREE });
      const clock = new Clock();
      const cameraControls = new CameraControls(camera, canvas);
      cameraControls.dollyToCursor = true;

      // 각 천체의 궤도를 그리는 함수
      function createOrbit(radius) {
        const geometry = new THREE.TorusGeometry(radius, 0.01, 2, 64);
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff }); //궤도 색상
        const torus = new THREE.Mesh(geometry, material);
        torus.rotation.x = Math.PI / 2; //궤도 수평으로 변경
        scene.add(torus);
      }

      // 행성들의 궤도 생성
      createOrbit(1);
      createOrbit(1.5);
      createOrbit(2);
      createOrbit(2.5);
      createOrbit(3);
      createOrbit(4);
      createOrbit(5);
      createOrbit(5.5);

      // 9 the animation
      function animate() {
        const delta = clock.getDelta();
        cameraControls.update(delta);

        // 행성을 기준으로 보기
        if (changeRef.current !== "All") {
          sun.rotation.y += 0.0009;
          earth.rotation.y += 0.008; //자전 속도
          earthObj.rotation.y += 0.0008; //공전 속도
          moonObj.rotation.y -= 0.00055;
          mercury.rotation.y += 0.005;
          mercuryObj.rotation.y += 0.00332;
          venus.rotation.y -= 0.002;
          venusObj.rotation.y += 0.00129;
          mars.rotation.y += 0.005;
          marsObj.rotation.y += 0.0004; // 화성까지는 2.92/@ 365일 기준
          saturn.rotation.y += 0.0038;
          saturnObj.rotation.y += 0.0002; // 목성부터는 2.92/@ 100으로 나눔
          jupiter.rotation.y += 0.0034;
          jupiterObj.rotation.y += 0.0001;
          uranus.rotation.y -= 0.0025;
          uranusObj.rotation.y += 0.00003;
          neptune.rotation.y += 0.0015;
          neptuneObj.rotation.y += 0.00002;

          switch (changeRef.current) {
            case "Mercury": // 수성
              const mercuryPosition = mercury.getWorldPosition(
                new THREE.Vector3()
              );
              camera.position.copy(mercuryPosition);
              camera.position.z += 0.5;
              camera.lookAt(mercuryPosition); // 건들지 못하게 만들기
              break;
            case "Venus": // 금성
              const venusPosition = venus.getWorldPosition(new THREE.Vector3());
              camera.position.copy(venusPosition);
              camera.position.z += 0.5;
              camera.lookAt(venusPosition);
              break;
            case "Earth": // 지구
              const earthPosition = earth.getWorldPosition(new THREE.Vector3());
              camera.position.copy(earthPosition);
              camera.position.z += 0.5;
              camera.lookAt(earthPosition);
              break;
            case "Mars": // 화성
              const marsPosition = mars.getWorldPosition(new THREE.Vector3());
              camera.position.copy(marsPosition);
              camera.position.z += 0.5;
              camera.lookAt(marsPosition);
              break;
            case "Jupiter": // 목성
              const jupiterPosition = jupiter.getWorldPosition(
                new THREE.Vector3()
              );
              camera.position.copy(jupiterPosition);
              camera.position.z += 0.5;
              camera.lookAt(jupiterPosition);
              break;
            case "Saturn": // 토성
              const saturnPosition = saturn.getWorldPosition(
                new THREE.Vector3()
              );
              camera.position.copy(saturnPosition);
              camera.position.z += 0.5;
              camera.lookAt(saturnPosition);
              break;
            case "Uranus": // 천왕성
              const uranusPosition = uranus.getWorldPosition(
                new THREE.Vector3()
              );
              camera.position.copy(uranusPosition);
              camera.position.z += 0.5;
              camera.lookAt(uranusPosition);
              break;
            case "Neptune": // 해왕성
              const neptunePosition = neptune.getWorldPosition(
                new THREE.Vector3()
              );
              camera.position.copy(neptunePosition);
              camera.position.z += 0.5;
              camera.lookAt(neptunePosition);
              break;
            case "Moon": // 달
              const moonPosition = moon.getWorldPosition(new THREE.Vector3());
              camera.position.copy(moonPosition);
              camera.position.z += 0.5;
              camera.lookAt(moonPosition);
              break;
            case "Sun": // 태양
              const sunPosition = sun.getWorldPosition(new THREE.Vector3());
              camera.position.copy(sunPosition);
              camera.position.z += 1.3;
              camera.lookAt(sunPosition);
              break;
          }
        } else {
          sun.rotation.y += 0.0009;
          earth.rotation.y += 0.008; //자전 속도
          earthObj.rotation.y += 0.008; //공전 속도
          moonObj.rotation.y -= 0.0055;
          mercury.rotation.y += 0.005;
          mercuryObj.rotation.y += 0.0332;
          venus.rotation.y -= 0.002;
          venusObj.rotation.y += 0.0129;
          mars.rotation.y += 0.005;
          marsObj.rotation.y += 0.004; // 화성까지는 2.92/@ 365일 기준
          saturn.rotation.y += 0.0038;
          saturnObj.rotation.y += 0.002; // 목성부터는 2.92/@ 100으로 나눔
          jupiter.rotation.y += 0.0034;
          jupiterObj.rotation.y += 0.001;
          uranus.rotation.x -= 0.0025;
          uranusObj.rotation.y += 0.0003;
          neptune.rotation.y += 0.0015;
          neptuneObj.rotation.y += 0.0002;
        }

        // 로딩중에도 애니메이션이 10~15번정도 작동을 해버려서 count 로 로딩 끝난 시점 확인.
        if (count < 100) {
          count++;
        } else {
          // 로딩 끝나면 false로 바꿔주기.
          if (isLoading) {
            setIsLoading(false);
          }
        }

        // 렌더링, 애니메이션 다시 실행
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      }
      animate();
    };
    SolarSystemScript(); // SolarSystemScript 함수를 호출합니다.
  }, []);

  const [token, setToken] = useState(getLoginUserInfo().token);
  const requestHeader = {
    "content-type": "application/json",
  };
  const API_SOLAR_URL = BASE + SOLAR;
  const [essential, setEssential] = useState({});
  const [optional, setOptional] = useState({});
  useEffect(() => {
    if (change !== "All") {
      fetch(API_SOLAR_URL + "/essential/" + change, {
        method: "GET",
        headers: requestHeader,
      })
        .then((response) => response.json()) // JSON 형식으로 변환
        .then((data) => {
          // fetch를 통해 받아온 데이터를 상태 변수에 할당
          if (data) setEssential(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });

      fetch(API_SOLAR_URL + "/optional/" + change, {
        method: "GET",
        headers: requestHeader,
      })
        .then((response) => response.json()) // JSON 형식으로 변환
        .then((data) => {
          // fetch를 통해 받아온 데이터를 상태 변수에 할당
          if (data) setOptional(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [change]);

  return (
    <>
      <canvas ref={canvasRef} id="three-canvas" />
      {isLoading && <ModelLoadingPage />}
      <PageHeader />
      {change != "All" ? (
        <PlanetContext optional={optional} essential={essential} />
      ) : (
        ""
      )}
      <Footer change={changeValue} />
    </>
  );
};

export default SolarSystemModel;
