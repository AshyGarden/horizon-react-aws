import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { API_BASE_URL as BASE, SHOP, USER } from "../../../config/host-config";
import { getLoginUserInfo } from "../../../util/login-utils";
import { AuthContext } from "../../../util/AuthContext";
import { mdiCloseThick } from "@mdi/js";
import Icon from "@mdi/react";

const StoreModal = ({ open, setOpen, item }) => {
  const redirection = useNavigate();

  const { id, name, content, price } = item;

  // 서버에 할일 목록(json)을 요청(fetch)해서 받아와야 함.
  const API_SHOP_URL = BASE + SHOP;
  const { isLoggedIn } = useContext(AuthContext);

  const [token, setToken] = useState(getLoginUserInfo().token);
  // 요청 헤더 설정
  const requestHeader = {
    "content-type": "application/json",
    Authorization: "Bearer " + token,
  };

  const newProduct = {
    name: {
      name: name,
      content: content,
      price: price,
    },
    count: 1,
  };

  // 바로구매 버튼 클릭 실행 함수
  const purchaseHandle = () => {
    //로그아웃 상태면 로그인페이지로
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      redirection("/login");
      return;
    }
    fetch(API_SHOP_URL, {
      method: "POST",
      headers: requestHeader,
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => {
        error = "이미 장바구니에 추가하셨습니다.";
        // alert("Error: " + error);
      });
    alert("결제 페이지로 이동합니다.");
    redirection("/basket");
  };

  //장바구니 버튼 클릭 실행 함수
  const addToCartHandle = () => {
    //로그아웃 상태면 로그인페이지로
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      redirection("/login");
      return;
    }
    const userConfirm = window.confirm("장바구니에 추가하시겠습니까?");
    if (userConfirm) {
      // 장바구니 리스트만 추가 로직
      fetch(API_SHOP_URL, {
        method: "POST",
        headers: requestHeader,
        body: JSON.stringify(newProduct),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
        })
        .catch((error) => {
          const userConfirm = window.confirm("장바구니에 추가하시겠습니까?");
          if (userConfirm) {
            error = "이미 장바구니에 추가하셨습니다.";
          }
          alert("Error: " + error);
        });
    }
    setOpen(!open);
  };

  // 닫기 버튼 클릭 실행 함수
  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700,
          height: 750,
          // bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // overflow: "auto",
          borderRadius: "20px",
          backgroundImage: `url("assets/panel/Popup005_Blue_Opaque.png")`,
          backgroundSize: "105% 105%",
          backgroundPosition: "center",
        }}
      >
        {/* 우측 상단에 닫기 버튼 추가 */}
        <Button
          variant="contained"
          sx={{
            position: "absolute",
            top: 30,
            right: 40,
          }}
          onClick={handleClose}
        >
          <Icon path={mdiCloseThick} size={1} />
        </Button>
        <Typography
          variant="h6"
          id="modal-title"
          gutterBottom
          sx={{ color: "white" }}
        >
          {name}
        </Typography>

        <Box className="modal-md-img" sx={{ textAlign: "center", mt: 3 }}>
          <img src={"assets/img/" + name + ".jpg"} alt="이미지입니다" />
        </Box>

        <Typography
          variant="body1"
          id="modal-description"
          sx={{ mt: 3, color: "white" }}
        >
          {content}
        </Typography>

        {/* 바로구매, 장바구니 버튼  */}
        <Box
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            sx={{
              mr: 2,
              width: 150,
              height: 60,
              fontSize: 20,
            }}
            onClick={purchaseHandle}
            style={{ color: "white" }}
          >
            바로구매
          </Button>
          <Button
            variant="contained"
            sx={{ width: 150, height: 60, fontSize: 20 }}
            onClick={addToCartHandle}
          >
            장바구니
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default StoreModal;
