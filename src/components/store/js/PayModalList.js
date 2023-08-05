import { Box, TableCell, TableRow } from "@mui/material";
import React from "react";

const PayModalList = ({ item }) => {
  const { id, name, count, price } = item;
  return (
    <TableRow>
      <TableCell align="center" style={{ cursor: "pointer" }}>
        {name}
      </TableCell>
      <TableCell align="center">{price * count}원</TableCell>
    </TableRow>
  );
};

export default PayModalList;
