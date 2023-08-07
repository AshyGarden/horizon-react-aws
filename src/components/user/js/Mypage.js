import {
  Box,
  Button,
  Container,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import { API_BASE_URL as BASE, USER } from "../../../config/host-config";
import { Color } from "three";
import { getLoginUserInfo } from "../../../util/login-utils";
import { useNavigate } from "react-router-dom";
import "../scss/Mypage.scss";
import { AuthContext } from "../../../util/AuthContext";
import PageHeader from "../../layout/js/PageHeader";

const Mypage = () => {
  const API_USER_URL = BASE + USER;
  const [user, setUser] = useState([]);
  const [token, setToken] = useState(getLoginUserInfo().token);

  const redirection = useNavigate();

  // 요청 헤더 설정
  const requestHeader = {
    Authorization: "Bearer " + token,
  };

  const requestHeader2 = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  const { isLoggedIn } = useContext(AuthContext);

  //로그아웃 상태면 로그인페이지로
  useEffect(() => {
    if (!isLoggedIn) {
      redirection("/login");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    fetch(API_USER_URL + "/user", {
      method: "GET",
      headers: requestHeader,
    })
      .then((response) => response.json()) // JSON 형식으로 변환
      .then((data) => {
        // fetch를 통해 받아온 데이터를 상태 변수에 할당
        if (data) setUser(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const [correct, setCorrect] = useState({
    userName: false,
    password: false,
    passwordCheck: false,
    email: false,
  });

  // 주소검색 클릭 이벤트 핸들러
  const searchAddrClickHandler = () => {
    let flag = true;
    new window.daum.Postcode({
      oncomplete: function (data) {
        const { zonecode, roadAddress } = data;
        let extraRoadAddr = "";
        console.log("zonecode: ", zonecode);

        if (zonecode) {
          // flag = true;
          setUser({
            ...user,
            postCode: zonecode,
            address1: roadAddress,
          });
          setCorrect({
            ...correct,
            postCode: !correct.postCode,
            address1: !correct.userAddress1,
          });
        }
      },
    }).open();
  };

  //상세주소 입력 변수
  const addrDetailHandler = (e) => {
    const inputValue = e.target.value;
    let flag = false;
    if (inputValue) {
      flag = true;
    }
    setUser({
      ...user,
      address2: inputValue,
    });
    setCorrect({ ...correct, address2: !correct.address2 });
  };

  const handlePostcodeComplete = (data) => {
    // 다음 주소 검색 완료 시 호출되는 콜백 함수
    const { zonecode, roadAddress } = data;

    setUser({
      ...user,
      address1: roadAddress,
    });

    setCorrect({
      ...correct,
      address1: true,
    });

    const element = document.getElementById("postcode");
    if (element) {
      element.style.display = "none";
    }
  };

  // 정보수정버튼 클릭 이벤트
  const modifyClickHandler = (e) => {
    e.preventDefault();

    const userData = {
      postCode: user.postCode,
      address1: user.address1,
      address2: user.address2,
    };

    fetch(API_USER_URL, {
      method: "PUT",
      headers: requestHeader2,
      body: JSON.stringify(userData),
    }).then((res) => {
      console.log(userData);
      if (res.status === 200) {
        alert("회원정보가 수정되었습니다!");
        redirection("/mypage");
      } else {
        alert("서버와의 통신이 원활하지 않습니다.");
      }
    });
  };

  // 장바구니 버튼 클릭
  const basketBtnHandel = () => {
    redirection("/basket");
  };

  // 결제내역 버튼 클릭
  const historyBtnHandle = () => {
    redirection("/history");
  };

  return (
    <>
      <div className="mypage-wrapper">
        <PageHeader />
        <Container
          className="mypage no-mui-disabled"
          component="main"
          maxWidth="xs"
          style={{ margin: "80px auto" }}
        >
          <form noValidate>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid item xs={12}>
                <Grid container alignItems="center">
                  <Typography component="h1" variant="h5">
                    마이페이지
                  </Typography>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignContent: "center",
                      }}
                    >
                      <Button
                        variant="contained"
                        style={{ background: "#3159d1", marginRight: "10px" }}
                        onClick={basketBtnHandel}
                      >
                        장바구니
                      </Button>
                      <Button
                        variant="contained"
                        style={{ background: "#3159d1" }}
                        onClick={historyBtnHandle}
                      >
                        결제내역
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <InputLabel className="input-label">이메일(계정)</InputLabel>
                <TextField
                  variant="outlined"
                  fullWidth
                  disabled
                  id="email"
                  name="email"
                  value={user.email}
                  InputLabelProps={{
                    style: { color: "white" },
                  }}
                  InputProps={{
                    style: { color: "white" },
                    classes: {
                      notchedOutline: "outlined", // 테두리 스타일을 변경할 클래스 이름
                    },
                  }}
                  style={{
                    background: "rgba(0,0,0,0.5)",
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <InputLabel className="input-label">이름</InputLabel>
                <TextField
                  name="name"
                  variant="outlined"
                  disabled
                  fullWidth
                  id="name"
                  value={user.userName}
                  InputLabelProps={{
                    style: { color: "white" },
                  }}
                  InputProps={{
                    style: { color: "white" },
                    classes: {
                      notchedOutline: "outlined", // 테두리 스타일을 변경할 클래스 이름
                    },
                  }}
                  style={{
                    background: "rgba(0,0,0,0.5)",
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={8}>
                <InputLabel className="input-label">우편번호</InputLabel>
                <TextField
                  variant="outlined"
                  fullWidth
                  disabled
                  id="sample4_postcode"
                  name="postCode"
                  value={user.postCode}
                  InputLabelProps={{
                    style: { color: "white" },
                  }}
                  InputProps={{
                    style: { color: "white" },
                    classes: {
                      notchedOutline: "outlined", // 테두리 스타일을 변경할 클래스 이름
                    },
                  }}
                  style={{
                    background: "rgba(0,0,0,0.5)",
                  }}
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
                    height: "55px",
                    fontSize: "18px",
                    marginTop: "23px",
                  }}
                >
                  주소검색
                </Button>
              </Grid>
              <Grid item xs={12}>
                <InputLabel className="input-label">도로명주소</InputLabel>
                <TextField
                  variant="outlined"
                  fullWidth
                  disabled
                  id="sample4_roadAddress"
                  name="roadAddress"
                  value={user.address1}
                  InputLabelProps={{
                    style: { color: "white" },
                  }}
                  InputProps={{
                    style: { color: "white" },
                    classes: {
                      notchedOutline: "outlined", // 테두리 스타일을 변경할 클래스 이름
                    },
                  }}
                  style={{
                    background: "rgba(0,0,0,0.5)",
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <InputLabel className="input-label">상세주소</InputLabel>
                <TextField
                  type="text"
                  variant="outlined"
                  fullWidth
                  autoComplete="off"
                  id="detail-address"
                  name="detail-address"
                  value={user.address2}
                  onChange={addrDetailHandler}
                  InputLabelProps={{
                    style: { color: "white" },
                  }}
                  InputProps={{
                    style: { color: "white" },
                    classes: {
                      notchedOutline: "outlined", // 테두리 스타일을 변경할 클래스 이름
                    },
                  }}
                  style={{
                    background: "rgba(0,0,0,0.5)",
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  style={{ background: "#3159d1" }}
                  onClick={modifyClickHandler}
                >
                  정보수정
                </Button>
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

export default Mypage;
