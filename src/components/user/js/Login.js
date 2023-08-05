import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Container } from "reactstrap";
import "../scss/Login.scss";
import { API_BASE_URL as BASE, USER } from "../../../config/host-config";
import { AuthContext } from "../../../util/AuthContext";
import { useNavigate } from "react-router-dom";
import HeaderSolar from "../../layout/js/PageHeader";

const Login = () => {
  const redirection = useNavigate();

  //AuthContext에서 onLogin 함수 가져오기
  const { onLogin, isLoggedIn } = useContext(AuthContext);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      setOpen(true);
      setTimeout(() => {
        redirection("/Main");
      }, 1000);
    }
  }, [isLoggedIn, redirection]);

  const REQUEST_URL = BASE + USER + "/signin";

  // 서버에 비동기 로그인 요청
  const fetchLogin = async () => {
    // 사용자가 입력한 이메일, 비밀번호 입력 태그 얻어오기
    const $email = document.getElementById("email");
    const $password = document.getElementById("password");

    const res = await fetch(REQUEST_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: $email.value,
        password: $password.value,
      }),
    });

    // 가입이 안되어 있거나 비밀번호가 틀린 경우
    if (res.status === 400) {
      const text = await res.text();
      alert(text);
      return;
    }

    const { token, name, email } = await res.json();
    // 로그인 상태 업데이트
    onLogin(token, email);

    // 홈으로 리다이렉트
    redirection("/Main");
  };

  //로그인 요청 핸들러
  const loginHandler = (e) => {
    e.preventDefault();

    // 서버로 로그인 요청 전송
    fetchLogin();
  };

  //회원가입 버튼 클릭 핸들러
  const joinButtonClickHandler = () => {
    redirection("/join");
  };

  return (
    <>
      <div className="login-wrapper">
        <HeaderSolar />
        <Container
          component="main"
          maxwidth="xs"
          style={{ margin: "80px auto" }}
        >
          <form noValidate onSubmit={loginHandler}>
            <Grid container spacing={2} maxwidth="xs">
              <Grid item xs={12}>
                <Typography component="h1" variant="h5">
                  로그인
                </Typography>
              </Grid>
            </Grid>

            <br />

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="email address"
                  name="email"
                  autoFocus
                  autoComplete="email"
                  InputLabelProps={{
                    style: { color: "white" },
                  }}
                  InputProps={{ style: { color: "white" } }}
                  style={{ background: "rgba(0,0,0,0.5)" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="on your password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  InputLabelProps={{
                    style: { color: "white" },
                  }}
                  InputProps={{ style: { color: "white" } }}
                  style={{ background: "rgba(0,0,0,0.5)" }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  style={{ background: "#3159d1" }}
                >
                  로그인
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ textAlign: "center" }}>아직 회원이 아니신가요~?</Box>
                <Button
                  fullWidth
                  variant="contained"
                  style={{ background: "#3159d1", marginTop: "10px" }}
                  onClick={joinButtonClickHandler}
                >
                  회원가입
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </div>
    </>
  );
};

export default Login;
