import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Container } from "reactstrap";
import "../scss/Join.scss";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../util/AuthContext";
import { API_BASE_URL as BASE, USER } from "../../../config/host-config";
import DaumPostcode from "react-daum-postcode";
import { getLoginUserInfo } from "../../../util/login-utils";
import HeaderSolar from "../../layout/js/PageHeader";

const Join = () => {
  const API_BASE_URL = BASE + USER;
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    passwordCheck: "",
    postCode: "",
    address1: "",
    address2: "",
  });
  const [token, setToken] = useState(getLoginUserInfo().token);

  const redirection = useNavigate();

  const { isLoggedIn } = useContext(AuthContext);

  const requestHeader = {
    "content-type": "application/json",
    Authorization: "Bearer " + token,
  };

  //이미 로그인상태면 메인페이지로
  useEffect(() => {
    if (isLoggedIn) {
      setTimeout(() => {
        redirection("/Main");
      }, 1000);
    }
  }, [isLoggedIn]);

  // 검증 메세지 상태변수 관리
  const [message, setMessage] = useState({
    userName: "",
    password: "",
    passwordCheck: "",
    email: "",
    postCode: "주소지는 필수입니다.",
    address2: "",
  });

  // 검증 완료 체크 상태변수 관리
  const [correct, setCorrect] = useState({
    userName: false,
    password: false,
    passwordCheck: false,
    email: false,
    postCode: false,
    address2: false,
  });

  // 검증 데이터 상태변수에 저장
  const saveInputState = ({ key, inputVal, flag, msg }) => {
    inputVal !== "pass" &&
      setUser({
        ...user,
        [key]: inputVal,
      });

    setMessage({
      ...message,
      [key]: msg,
    });

    setCorrect({
      ...correct,
      [key]: flag,
    });
  };

  const nameHandler = (e) => {
    // 이름 입력 조건 2~5글자 정규식
    const nameRegex = /^[가-힣]{2,5}$/;
    const inputVal = e.target.value;

    //입력값 검증
    let msg; //검증 메세지 저장 변수
    let flag = false; //입력값 검증 체크 변수

    if (inputVal === "") {
      msg = "유저 이름은 필수입니다.";
    } else if (!nameRegex.test(inputVal)) {
      msg = "2~5글자 사이의 한글로 작성하세요!";
    } else {
      msg = "사용 가능한 이름입니다.";
      flag = true;
    }
    saveInputState({
      key: "userName",
      inputVal,
      msg,
      flag,
    });
  };

  // 이메일 중복 체크 서버 통신 함수
  const fetchDuplicateCheck = (email) => {
    let msg = "",
      flag = false;
    fetch(`${API_BASE_URL}/check?email=${email}`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((json) => {
        if (json) {
          msg = "사용중인 이메일입니다!";
        } else {
          msg = "사용 가능한 이메일 입니다.";
          flag = true;
        }
        setUser({ ...user, email: email });
        setMessage({ ...message, email: msg });
        setCorrect({ ...correct, email: flag });
      })
      .catch((err) => {
        console.log("서버 통신이 원활하지 않습니다.");
      });
  };

  // 이메일 입력창 핸들러
  const emailHandler = (e) => {
    const emailRegex = /^[a-z0-9\.\-_]+@([a-z0-9\-]+\.)+[a-z]{2,6}$/;

    // 입력값 상태변수에 저장
    const inputVal = e.target.value;

    let msg,
      flag = false;
    if (!inputVal) {
      msg = "이메일은 필수값입니다.";
    } else if (!emailRegex.test(inputVal)) {
      msg = "유효하지 않은 이메일 형식입니다.";
    } else {
      // 이메일 중복체크
      // 버튼형식으로 교체 예정
      fetchDuplicateCheck(inputVal);
      return;
    }

    saveInputState({
      key: "email",
      inputVal,
      msg,
      flag,
    });
  };

  //비밀번호 입력창 이벤트 핸들러
  const passwordHandler = (e) => {
    // 패스워드가 변동되면 패스워드 확인란 비우기
    document.getElementById("password-check").value = "";
    document.getElementById("check-span").textContent = "";

    setMessage({ ...message, passwordCheck: "" });
    setMessage({ ...correct, passwordCheck: false });

    // 입력값 상태 변수에 저장
    const inputVal = e.target.value;

    // 비밀번호 체크 정규식
    const pwRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;

    // 비밀번호 검증
    let msg,
      flag = false;
    if (!inputVal) {
      msg = "비밀번호는 필수입니다.";
    } else if (!pwRegex.test(inputVal)) {
      msg = "8글자 이상의 영문, 숫자, 특수문자를 포함해 주세요.";
    } else {
      msg = "사용가능한 비밀번호 입니다.";
      flag = true;
    }

    saveInputState({
      key: "password",
      inputVal,
      msg,
      flag,
    });
  };

  // 패스워드 확인 이벤트 핸들러
  const pwChkHandler = (e) => {
    let msg,
      flag = false;
    if (!e.target.value) {
      msg = "비밀번호 확인란은 필수입니다.";
    } else if (user.password !== e.target.value) {
      msg = "비밀번호가 일치하지 않습니다.";
    } else {
      msg = "비밀번호가 일치합니다.";
      flag = true;
    }

    saveInputState({
      key: "passwordCheck",
      inputVal: "pass",
      msg,
      flag,
    });
  };

  // 주소검색 클릭 이벤트 핸들러
  const searchAddrClickHandler = () => {
    let flag = true;
    new window.daum.Postcode({
      oncomplete: function (data) {
        const { zonecode, roadAddress, buildingName, apartment } = data;
        let extraRoadAddr = "";

        if (data.buildingName !== "" && data.apartment === "Y") {
          extraRoadAddr +=
            extraRoadAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        if (zonecode) {
          flag = true;
          setUser({
            ...user,
            postCode: zonecode,
            address1: roadAddress,
          });
          setCorrect({
            ...correct,
            postCode: true,
          });
          setMessage({
            ...message,
            postCode: "작성되었습니다.",
          });
        }
      },
    }).open();
  };

  //상세주소 입력 변수
  const addrDetailHandler = (e) => {
    const inputValue = e.target.value;
    let msg,
      flag = false;
    if (!e.target.value) {
      msg = "상세주소는 필수입니다.";
      flag = false;
    } else {
      msg = "작성되었습니다.";
      flag = true;
    }

    setUser({
      ...user,
      address2: inputValue,
    });
    setCorrect({ ...correct, address2: flag });
    setMessage({
      ...message,
      address2: msg,
    });
  };

  const handlePostcodeComplete = (data) => {
    // 다음 주소 검색 완료 시 호출되는 콜백 함수
    const { zonecode, roadAddress } = data;

    setUser({
      ...user,
      postCode: zonecode,
      address1: roadAddress,
    });

    setCorrect({
      ...correct,
      postCode: true,
    });

    const element = document.getElementById("postcode");
    if (element) {
      element.style.display = "none";
    }
  };

  // 입력칸이 모두 검증에 통과했는지 여부 검사
  const isValid = () => {
    for (const key in correct) {
      const flag = correct[key];
      if (!flag) return false;
    }
    return true;
  };

  // 회원가입 버튼 클릭 이벤트 핸들러
  const joinButtonClickHandler = (e) => {
    // 회원 가입 서버 요청
    if (isValid()) {
      fetchSignUpPost();
    } else {
      alert("입력란을 다시 확인 해주세요.");
      return;
    }
  };

  // 회원가입 처리 서버 요청
  const fetchSignUpPost = () => {
    fetch(API_BASE_URL, {
      method: "POST",
      headers: requestHeader,
      body: JSON.stringify(user),
    }).then((res) => {
      console.log(res.status);
      if (res.status === 200) {
        alert("회원가입을 완료하셨습니다.");
        redirection("/login");
      } else {
        alert("서버와의 통신이 원활하지 않습니다.");
      }
    });
  };

  return (
    <>
      <div className="join-wrapper">
        <HeaderSolar />
        <Container
          component="main"
          maxwidth="xs"
          style={{ margin: "80px auto" }}
        >
          <form noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography component="h1" variant="h5">
                  회원 가입
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  autoComplete="fname"
                  name="username"
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="유저 이름"
                  autoFocus
                  onChange={nameHandler}
                  InputLabelProps={{
                    style: { color: "white" },
                  }}
                  InputProps={{ style: { color: "white" } }}
                  style={{ background: "rgba(0,0,0,0.5)" }}
                />
                <span
                  style={
                    correct.userName ? { color: "green" } : { color: "red" }
                  }
                >
                  {message.userName}
                </span>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="이메일 주소"
                  name="email"
                  autoComplete="email"
                  onChange={emailHandler}
                  InputLabelProps={{
                    style: { color: "white" },
                  }}
                  InputProps={{ style: { color: "white" } }}
                  style={{ background: "rgba(0,0,0,0.5)" }}
                />
                <span
                  style={correct.email ? { color: "green" } : { color: "red" }}
                >
                  {message.email}
                </span>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="패스워드"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={passwordHandler}
                  InputLabelProps={{
                    style: { color: "white" },
                  }}
                  InputProps={{ style: { color: "white" } }}
                  style={{ background: "rgba(0,0,0,0.5)" }}
                />
                <span
                  style={
                    correct.password ? { color: "green" } : { color: "red" }
                  }
                >
                  {message.password}
                </span>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password-check"
                  label="패스워드 확인"
                  type="password"
                  id="password-check"
                  autoComplete="check-password"
                  onChange={pwChkHandler}
                  InputLabelProps={{
                    style: { color: "white" },
                  }}
                  InputProps={{ style: { color: "white" } }}
                  style={{ background: "rgba(0,0,0,0.5)" }}
                />
                <span
                  id="check-span"
                  style={
                    correct.passwordCheck
                      ? { color: "green" }
                      : { color: "red" }
                  }
                >
                  {message.passwordCheck}
                </span>
              </Grid>

              <Grid item xs={12} sm={8}>
                <TextField
                  type="text"
                  id="sample4_postcode"
                  name="Postcode"
                  placeholder="우편번호*"
                  value={user.postCode}
                  fullWidth
                  disabled
                  required
                  InputLabelProps={{
                    style: { color: "white" },
                  }}
                  InputProps={{ style: { color: "white" } }}
                  style={{ background: "rgba(0,0,0,0.5)" }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  className="searchAddrBtn"
                  variant="contained"
                  fullWidth
                  onClick={searchAddrClickHandler}
                  style={{
                    background: "#3159d1",
                    height: "50px",
                    fontSize: "18px",
                  }}
                >
                  주소검색
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  id="sample4_roadAddress"
                  name="roadAddress"
                  placeholder="도로명주소*"
                  value={user.address1}
                  fullWidth
                  disabled
                  required
                  InputLabelProps={{
                    style: { color: "white" },
                  }}
                  InputProps={{ style: { color: "white" } }}
                  style={{ background: "rgba(0,0,0,0.5)" }}
                />
                <span
                  style={
                    correct.postCode ? { color: "green" } : { color: "red" }
                  }
                >
                  {message.postCode}
                </span>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="detail-address"
                  variant="outlined"
                  fullWidth
                  required
                  id="detail-address"
                  label="상세주소"
                  onChange={addrDetailHandler}
                  InputLabelProps={{
                    style: { color: "white" },
                  }}
                  InputProps={{ style: { color: "white" } }}
                  style={{ background: "rgba(0,0,0,0.5)" }}
                />
                <span
                  style={
                    correct.address2 ? { color: "green" } : { color: "red" }
                  }
                >
                  {message.address2}
                </span>
              </Grid>
              <Grid item>
                <Link to="/login" variant="body2" style={{ color: "white" }}>
                  이미 계정이 있습니까? 로그인 하세요.
                </Link>
              </Grid>
              <Grid container justifyContent="flex-end">
                <Grid item xs={4}>
                  <Button
                    fullWidth
                    variant="contained"
                    style={{ background: "#3159d1", fontSize: "20px" }}
                    onClick={joinButtonClickHandler}
                  >
                    계정 생성
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Container>
      </div>
      <div id="postcode" style={{ display: "none" }}>
        <DaumPostcode onComplete={handlePostcodeComplete} />
      </div>
    </>
  );
};

export default Join;
