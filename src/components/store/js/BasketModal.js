import { mdiCloseThick } from "@mdi/js";
import Icon from "@mdi/react";
import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";

const BasketModal = ({ open, setOpen, handleOpen, selectedItem }) => {
  const { name, content } = selectedItem;

  // 닫기 버튼 클릭 실행 함수
  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <Modal
      open={open}
      onClose={handleOpen}
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
        {/* 모달 상세사항은 수정해야함 */}
        {/* <Typography variant="h6" id="modal-title" gutterBottom>
          {selectedProduct ? selectedProduct.name : ""}
        </Typography> */}

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

        <Box className="modal-md-img" sx={{ textAlign: "center", mt: 3 }}>
          <img src={"assets/img/" + name + ".jpg"} alt="이미지입니다" />
        </Box>

        <Typography variant="body1" id="modal-description" sx={{ mt: 5 }}>
          {content}
        </Typography>
      </Box>
    </Modal>
  );
};

export default BasketModal;
