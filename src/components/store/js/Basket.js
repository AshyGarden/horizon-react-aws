import React, { useContext, useEffect, useState } from "react";
import HeaderSolar from "../../layout/js/PageHeader";
import BasketItem from "./BasketItem";
import BasketModal from "./BasketModal";
import "../scss/basket.scss";

import { API_BASE_URL as BASE, SHOP, USER } from "../../../config/host-config";
import {
  Box,
  Button,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getLoginUserInfo } from "../../../util/login-utils";
import { AuthContext } from "../../../util/AuthContext";
import PayModal from "./PayModal";
import { BorderBottom } from "@mui/icons-material";
import PageHeader from "../../layout/js/PageHeader";

const Basket = () => {
  // 로그인 인증 토큰 얻어오기
  const { isLoggedIn } = useContext(AuthContext);
  const [token, setToken] = useState(getLoginUserInfo().token);
  const [user, setUser] = useState({});

  // 요청 헤더 설정
  const requestHeader = {
    "content-type": "application/json",
    Authorization: "Bearer " + token,
  };

  // 서버에 할일 목록(json)을 요청(fetch)해서 받아와야 함.
  const API_SHOP_URL = BASE + SHOP;
  const API_USER_URL = BASE + USER;
  const [basketList, setBasketList] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [isRendered, setIsRendered] = useState(false);

  const redirection = useNavigate();
  const deleteAllProducts = async () => {
    try {
      const productIds = basketList.map((product) => product.id);

      // DELETE 요청을 보냅니다.
      await Promise.all(
        productIds.map((id) =>
          fetch(API_SHOP_URL + "/products/" + id, {
            method: "DELETE",
            headers: requestHeader,
          })
        )
      );

      // 모든 제품 삭제 후, basketList를 빈 배열로 업데이트합니다.
      setBasketList([]);
    } catch (error) {
      console.error("Error deleting products:", error);
      alert("관리자에게 문의하세요");
    }
    redirection("/history");
  };

  useEffect(() => {
    if (!isRendered) {
      setIsRendered(!isRendered);
    } else if (!isLoggedIn) {
      redirection("/login");
    }

    // 페이지가 렌더링 됨과 동시에 할 일 목록을 요청해서 뿌려주기.
    fetch(API_SHOP_URL + "/products", {
      method: "GET",
      headers: requestHeader,
    })
      .then((response) => response.json()) // JSON 형식으로 변환
      .then((data) => {
        // fetch를 통해 받아온 데이터를 상태 변수에 할당
        if (Array.isArray(data.products)) {
          // data.products를 가공하여 필요한 속성만 추출하여 객체로 만듦
          const basketItems = data.products.map((product) => ({
            id: product.id,
            count: product.count,
            name: product.name.name,
            price: product.name.price,
            content: product.name.content,
          }));
          setBasketList(basketItems);
          // console.log(basketItems);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [isRendered, isLoggedIn]);

  const [open, setOpen] = useState(false); // 모달 상태를 관리하기 위한 상태변수

  //결제하기 버튼 모달
  const [payOpen, setPayOpen] = useState(false);

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setOpen(!open);
  };

  const handleOpenPayModal = () => {
    setPayOpen(!payOpen);
  };

  // 수량 증가 함수
  const increaseQuntity = (count, id) => {
    fetch(API_SHOP_URL, {
      method: "PUT",
      headers: requestHeader,
      body: JSON.stringify({
        count: count + 1,
        id: id,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (Array.isArray(json.products)) {
          // data.products를 가공하여 필요한 속성만 추출하여 객체로 만듦
          const basketItems = json.products.map((product) => ({
            id: product.id,
            count: product.count,
            name: product.name.name,
            price: product.name.price,
            content: product.name.content,
          }));
          setBasketList(basketItems);
        }
      });
  };

  // 수량 감소 함수
  const decreaseQuantity = (count, id) => {
    fetch(API_SHOP_URL, {
      method: "PUT",
      headers: requestHeader,
      body: JSON.stringify({
        count: count - 1,
        id: id,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (Array.isArray(json.products)) {
          // data.products를 가공하여 필요한 속성만 추출하여 객체로 만듦
          const basketItems = json.products.map((product) => ({
            id: product.id,
            count: product.count,
            name: product.name.name,
            price: product.name.price,
            content: product.name.content,
          }));
          setBasketList(basketItems);
        }
      });
  };

  // 삭제
  const deleteProduct = (id) => {
    fetch(API_SHOP_URL + "/products/" + id, {
      method: "DELETE",
      headers: requestHeader,
    })
      .then((res) => res.json())
      .then((json) => {
        // 서버가 업데이트된 장바구니 데이터를 응답으로 보낼 경우
        if (Array.isArray(json.products)) {
          // data.products를 가공하여 필요한 속성만 추출하여 객체로 만듦
          const basketItems = json.products.map((product) => ({
            id: product.id,
            count: product.count,
            name: product.name.name,
            price: product.name.price,
            content: product.name.content,
          }));
          setBasketList(basketItems);
        }
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  // 총 가격 계산 함수
  const totalPrice = () => {
    let total = 0;
    for (const item of basketList) {
      total += item.price * item.count;
    }
    return total;
  };

  //저장에 필요한 주소지 가지고오기
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

  // 결제 시
  const yesPayHandle = () => {
    const confirmed = window.confirm("결제하시겠습니까?");
    if (confirmed) {
      if (basketList.length === 0) {
        alert("장바구니가 비어있습니다.");
        return;
      }
      const sendProduct = async (product) => {
        try {
          const productWithAddress = {
            ...product,
            address1: user.address1,
            address2: user.address2,
          };
          await fetch(API_SHOP_URL + "/history", {
            method: "POST",
            headers: requestHeader,
            body: JSON.stringify(productWithAddress),
          });
        } catch (error) {
          throw new Error("상품 전송 중 오류가 발생했습니다.");
        }
      };

      // basketList 배열의 각 상품을 개별적으로 서버에 전송
      basketList.forEach((product) => sendProduct(product));
      deleteAllProducts();
    }
  };

  return (
    <>
      <div className="basket-wrapper">
        <PageHeader />

        <Typography variant="h4" align="center" marginTop={5}>
          장바구니
        </Typography>
        <Container
          component="main"
          className="basket-main-wrapper"
          sx={{ padding: "50px", display: "flex" }}
          style={{ marginTop: "30px" }}
        >
          <Grid container spacing={4}>
            <Box
              className="list-box"
              sx={{
                width: "100%",
                margin: "auto",
                display: "flex",
                flexDirection: "column",
                overflowY: "auto",
                maxHeight: "55vh",
                // 스크롤바 모양 제거
                "&::-webkit-scrollbar": {
                  width: "0",
                  height: "0",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <Table
                sx={{ tableLayout: "fixed" }}
                style={{
                  border: "1px solid white",
                  background: "rgba(0,0,0,0.5)",
                }}
              >
                <TableHead
                  sx={{ zIndex: 10 }}
                  style={{
                    position: "sticky",
                    top: 0,
                    background: "rgba(0,0,0,1)",
                  }}
                >
                  <TableRow sx={{ align: "center" }}>
                    <TableCell align="center" style={{ width: "20%" }}>
                      상품
                    </TableCell>
                    <TableCell align="center" style={{ width: "20%" }}>
                      가격
                    </TableCell>
                    <TableCell align="center" style={{ width: "15%" }}>
                      수량
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ width: "10%" }}
                    ></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {basketList.map((products) => (
                    <BasketItem
                      open={handleOpenModal}
                      increase={increaseQuntity}
                      decrease={decreaseQuantity}
                      deleteProduct={deleteProduct}
                      key={products.id}
                      item={products}
                    />
                  ))}
                </TableBody>
              </Table>
            </Box>
            <Box
              className="cal-pay-wrapper"
              sx={{
                marginTop: "20px",
                position: "fixed",
                left: "0",
                bottom: "0",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                width: "100%",
                height: "100px",
                borderTop: "1px solid white",
                borderBottom: "1px solid white",
              }}
            >
              <Box
                className="calculate-box"
                sx={{
                  padding: "10px",
                }}
              >
                <Box>
                  <strong>총 가격: {totalPrice()}원</strong>
                </Box>
              </Box>

              <Button
                className="payment-btn"
                variant="contained"
                sx={{
                  width: 100,
                  height: 40,
                  margin: "50px",
                }}
                onClick={handleOpenPayModal}
              >
                결제하기
              </Button>
            </Box>
          </Grid>
        </Container>

        {open && (
          <BasketModal
            open={open}
            setOpen={setOpen}
            handleOpen={handleOpenModal}
            selectedItem={selectedItem}
          />
        )}

        {payOpen && (
          <PayModal
            open={payOpen}
            setPayOpen={setPayOpen}
            handleOpen={handleOpenPayModal}
            yesPayHandle={yesPayHandle}
            basketList={basketList}
            totalPrice={totalPrice}
          />
        )}
      </div>
    </>
  );
};

export default Basket;
