import { Box, Button, TableCell, TableRow } from "@mui/material";
import React from "react";
import "../scss/basket.scss";
import Icon from "@mdi/react";
import { mdiDelete, mdiTriangle, mdiTriangleDown } from "@mdi/js";

const BasketItem = ({ open, item, increase, decrease, deleteProduct }) => {
  const { id, name, count, price } = item;

  const deleteOnClick = () => {
    deleteProduct(id);
  };

  const increaseCount = () => {
    increase(count, id);
  };

  const decreaseCount = () => {
    if (count > 1) {
      decrease(count, id);
    }
  };

  const modalOpen = () => {
    open(item);
  };

  return (
    <>
      <TableRow>
        <TableCell
          align="center"
          style={{ cursor: "pointer" }}
          onClick={modalOpen}
        >
          {name}
        </TableCell>
        <TableCell align="center">{price * count}원</TableCell>
        <TableCell align="center" sx={{ padding: 0 }}>
          {/* 수량 감소 버튼 */}
          <Box sx={{ padding: 0 }}>
            <Button
              className="minus"
              sx={{ padding: 0 }}
              onClick={() => decreaseCount()}
            >
              <Icon path={mdiTriangleDown} size={1} />
            </Button>
            {count}

            {/* 수량 증가 버튼 */}
            <Button
              className="plus"
              sx={{ padding: 0 }}
              onClick={() => increaseCount()}
            >
              <Icon path={mdiTriangle} size={1} />
            </Button>
          </Box>
        </TableCell>

        <TableCell align="center">
          {/* 삭제 버튼 */}
          <Button className="delete" onClick={() => deleteOnClick()}>
            <Icon path={mdiDelete} size={1.3} />
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};

export default BasketItem;
