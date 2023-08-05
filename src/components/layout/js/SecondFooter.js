import { Box, Container, Typography } from "@mui/material";
import React from "react";

const SecondFooter = () => {
  return (
    <Box
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        p: 6,
      }}
      component='footer'
    >
      <Container maxWidth='sm'>
        <Typography variant='body2' color='text.secondary' align='center'>
          {"Copyright © Over the Horizon "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Container>
    </Box>
  );
};

export default SecondFooter;
