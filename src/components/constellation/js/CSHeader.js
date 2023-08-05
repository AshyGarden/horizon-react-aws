import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer, { drawerClasses } from "@mui/material/Drawer";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Icon from "@mdi/react";
import {
  mdiAccount,
  mdiAccountPlus,
  mdiBasket,
  mdiLock,
  mdiLockOpen,
} from "@mdi/js";
import "../scss/CSHeader.scss";
import "../../solarsystem/img/Tip001Blue.png";
import { useTheme } from "@emotion/react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../util/AuthContext";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    // padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  // AuthContext에서 로그인 상태와 onLogout 함수를 가져옵니다.
  const { isLoggedIn, onLogout, name } = React.useContext(AuthContext);
  const redirection = useNavigate();

  //로그아웃 핸들러
  const logoutHandler = () => {
    onLogout();
    alert("로그아웃 되었습니다.");
    redirection("/");
  };

  const handlerDrawerOpen = () => {
    setOpen(true);
  };

  const handlerDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <div className="CSHeader">
        <Toolbar className="header-menubar">
          <Link to="/">
            <img
              src={"/final-logo-removebg.png"}
              alt="logo"
              style={{ width: "80px", height: "80px" }}
            />
          </Link>
          <Typography
            className="typography-cs"
            variant="h5"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              //textAlign: "center",
              color: "white",
              marginLeft: "15px",
            }}
          >
            Over the Horizon
          </Typography>

          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              color="white"
            />
          </Search> */}

          {!isLoggedIn && (
            <>
              <Link to="/login">
                <Icon
                  className="locked"
                  path={mdiLock}
                  title="LOGIN"
                  size={2}
                  horizontal
                  vertical
                  rotate={180}
                />
              </Link>
              <Link to="/join">
                <Icon
                  className="join-btn"
                  path={mdiAccountPlus}
                  title="JOIN"
                  size={2}
                  horizontal
                  vertical
                  rotate={180}
                />
              </Link>
            </>
          )}

          {isLoggedIn && (
            <>
              <Link to="/mypage">
                <Icon
                  className="profile-icon"
                  path={mdiAccount}
                  title="MYPAGE"
                  size={2}
                  horizontal
                  vertical
                  rotate={180}
                />
              </Link>
              <Link to="/basket">
                <Icon
                  className="shop-basket"
                  path={mdiBasket}
                  title="BASKET"
                  size={2}
                  horizontal
                  vertical
                  rotate={180}
                />
              </Link>
              <div onClick={logoutHandler}>
                <Icon
                  className="lock-open"
                  path={mdiLockOpen}
                  title="LOGOUT"
                  size={2}
                  horizontal
                  vertical
                  rotate={180}
                />
              </div>
            </>
          )}
        </Toolbar>
      </div>
    </Box>
  );
}
