import { mdiCloseThick } from "@mdi/js";
import Icon from "@mdi/react";
import {
  Box,
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import BasketItem from "./BasketItem";
import PayModalList from "./PayModalList";

const PayModal = ({
  open,
  setPayOpen,
  yesPayHandle,
  basketList,
  totalPrice,
}) => {
  const redirection = useNavigate();

  // 닫기 버튼 클릭 실행 함수
  const handleClose = () => {
    setPayOpen(!open);
  };

  // 아니오 버튼 클릭
  const noPayAndClose = () => {
    alert("결제가 취소되었습니다.");
    handleClose();
  };

  const yesPay = () => {
    yesPayHandle();
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{ border: "none" }}
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
        <div className="pay-list" style={{ fontSize: "30px" }}>
          결제 목록
        </div>
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

        <Table
          sx={{ tableLayout: "fixed" }}
          style={{
            border: "1px solid white",
            background: "rgba(0,0,0,0.5)",
            margin: "30px",
          }}
        >
          <TableHead>
            <TableRow sx={{ align: "center" }}>
              <TableCell align="center" style={{ width: "20%" }}>
                상품
              </TableCell>
              <TableCell align="center" style={{ width: "20%" }}>
                가격
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basketList.map((products) => (
              <PayModalList key={products.id} item={products} />
            ))}
          </TableBody>
        </Table>

        <strong>총 가격: {totalPrice()}원</strong>

        <Box
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            sx={{ mr: 2, width: 150, height: 60, fontSize: 20 }}
            onClick={yesPay}
          >
            결제하기
          </Button>
          <Button
            variant="contained"
            sx={{ width: 150, height: 60, fontSize: 20 }}
            onClick={noPayAndClose}
          >
            결제취소
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PayModal;
