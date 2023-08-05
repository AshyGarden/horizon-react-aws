import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import "../scss/footer.scss";
import { Grid } from "@mui/material";

export default function Footer({ change }) {
  // 하단 메뉴버튼 클릭 이벤트
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const [menuAnimation, setMenuAnimation] = React.useState("");

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
    setMenuAnimation(isMenuOpen ? "slide-in" : "slide-out");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{ top: "auto", bottom: 0 }}
        style={{ boxShadow: "none", backgroundColor: "rgba(0,0,0,0)" }}
      >
        <Toolbar>
          <div className="ft-btn-container">
            <>
              <div className={`ft-btn-group ${menuAnimation}`}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Button
                    className="ft-btn plant-btn sun-btn"
                    value="Sun"
                    onClick={change}
                  >
                    Sun
                  </Button>

                  <Button
                    className="ft-btn plant-btn moon-btn"
                    value="Moon"
                    onClick={change}
                  >
                    Moon
                  </Button>

                  <Button
                    className="ft-btn plant-btn mercury-btn"
                    value="Mercury"
                    onClick={change}
                  >
                    Mercury
                  </Button>

                  <Button
                    className="ft-btn plant-btn venus-btn"
                    value="Venus"
                    onClick={change}
                  >
                    Venus
                  </Button>

                  <Button
                    className="ft-btn plant-btn earth-btn"
                    value="Earth"
                    onClick={change}
                  >
                    Earth
                  </Button>

                  <Button
                    className="ft-btn plant-btn mars-btn"
                    value="Mars"
                    onClick={change}
                  >
                    Mars
                  </Button>

                  <Button
                    className="ft-btn plant-btn jupiter-btn"
                    value="Jupiter"
                    onClick={change}
                  >
                    Jupiter
                  </Button>

                  <Button
                    className="ft-btn plant-btn saturn-btn"
                    value="Saturn"
                    onClick={change}
                  >
                    Saturn
                  </Button>

                  <Button
                    className="ft-btn plant-btn uranus-btn"
                    value="Uranus"
                    onClick={change}
                  >
                    Uranus
                  </Button>

                  <Button
                    className="ft-btn plant-btn neptune-btn"
                    value="Neptune"
                    onClick={change}
                  >
                    Neptune
                  </Button>

                  <Button
                    className="ft-btn plant-btn all-btn"
                    value="All"
                    onClick={change}
                  >
                    All
                  </Button>
                </Grid>
              </div>
            </>
          </div>
          <div className="menu-btn">
            <IconButton
              size="large"
              edge="end"
              color="blue"
              aria-label="menu"
              onClick={handleMenuToggle}
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
