import { Button, TableCell, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";

const HistoryItem = ({ item, deleteProduct }) => {
  const { id, name, content, price, address1, address2, buyDate, count } = item;

  const [date, setDate] = useState("");

  const dateObject = new Date(date);

  const formattedDate = dateObject.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // 3일을 더한 날짜를 계산
  const arrivalDate = new Date(dateObject);
  arrivalDate.setDate(dateObject.getDate() + 3);

  const formattedArrivalDate = arrivalDate.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const cancelPurchase = () => {
    const confirmed = window.confirm("취소 하시겠습니까?");
    if (confirmed) {
      deleteProduct(id);
    }
  };

  let flag = false;
  const currentDate = new Date();
  if (currentDate < arrivalDate) {
    flag = false;
  } else {
    flag = true;
  }

  return (
    <>
      <TableRow>
        <TableCell align="center">{name}</TableCell>
        <TableCell align="center">{count}</TableCell>
        <TableCell align="center">{price * count}</TableCell>
        <TableCell align="center">
          {address1}
          <br />
          {address2}
        </TableCell>
        <TableCell align="center">{formattedDate}</TableCell>
        <TableCell align="center">{formattedArrivalDate}</TableCell>
        <TableCell align="center">
          {!flag && (
            <Button variant="contained" onClick={cancelPurchase}>
              구매취소
            </Button>
          )}
          {flag && (
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#4CAF50", // 초록색으로 변경
                "&:hover": {
                  backgroundColor: "#4CAF50", // 호버 효과 없음
                },
              }}
            >
              배송완료
            </Button>
          )}
        </TableCell>
      </TableRow>
    </>
  );
};

export default HistoryItem;
