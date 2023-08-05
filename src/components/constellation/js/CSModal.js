import { mdiCloseThick } from "@mdi/js";
import Icon from "@mdi/react";
import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";

export const CSModal = ({ open, setOpen, handleOpen, item }) => {
  const { title, date, time, comment, img1, img2 } = item;
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

        <Box
          className="planet-img"
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            mt: 6,
            mb: 3,
          }}
        >
          {!img1 && (
            <Box className="planet-img1">
              <img src={"assets/img/default.png"} alt="이미지입니다" />
            </Box>
          )}
          {img1 && (
            <Box className="planet-img1">
              <img src={"assets/img/" + img1 + ".png"} alt="이미지입니다" />
            </Box>
          )}
          {img2 && (
            <Box className="planet-img2">
              <img src={"assets/img/" + img2 + ".png"} alt="이미지입니다" />
            </Box>
          )}
        </Box>

        <Typography variant="body1" id="modal-description" sx={{ mt: 5 }}>
          타이틀: {title}
        </Typography>
        <Typography variant="body1" id="modal-description" sx={{ mt: 5 }}>
          날짜: {date} / {time}
        </Typography>

        <Typography variant="body1" id="modal-description" sx={{ mt: 5 }}>
          <Box
            sx={{
              fontSize: 20,
              padding: 0,
              paddingRight: 5,
              paddingLeft: 5,
              //   textAlign: "center",
            }}
          >
            {comment}
          </Box>
        </Typography>
      </Box>
    </Modal>
  );
};

export default CSModal;
