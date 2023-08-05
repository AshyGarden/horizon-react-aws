import React, { useEffect, useState } from "react";
import PageHeader from "../../layout/js/PageHeader";
import { Table } from "react-bootstrap";
import CSMainTbody from "./CSMainTbody";
import "../../constellation/scss/CSMain.scss";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { API_BASE_URL as BASE, NEWS } from "../../../config/host-config";
import CSModal from "./CSModal";

const CSMain = () => {
  const [open, setOpen] = useState(false);
  const [boardList, setBoardList] = useState([]);
  const [news, setNews] = useState({});

  const [mainNews, setMainNEws] = useState({});

  // 요청 헤더 설정
  const requestHeader = {
    "content-type": "application/json",
  };

  // 서버에 할일 목록(json)을 요청(fetch)해서 받아와야 함.
  const API_NEWS_URL = BASE + NEWS;

  //select 기능 함수
  const [year, setYear] = useState("2023");
  const [month, setMonth] = useState("07");
  const [search, setSearch] = useState(false);

  const handleChange = (event) => {
    setYear(event.target.value);
  };

  const handleChange2 = (event) => {
    setMonth(event.target.value);
  };

  const handleOpenModal = (item) => {
    setNews(item);
    setOpen(!open);
  };

  const searchClick = () => {
    setSearch(!search);
  };

  useEffect(() => {
    console.log("/" + year + month);
    fetch(API_NEWS_URL + "/" + year + month, {
      method: "GET",
      headers: requestHeader,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) setBoardList(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [search]);

  return (
    <>
      <section className="News-board">
        <PageHeader />
        <div className="select-group">
          <FormControl sx={{ m: 1, minWidth: 120, color: "white" }}>
            <InputLabel id="demo-simple-select-helper-label">Year</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={year}
              label="Year"
              onChange={(e) => handleChange(e, 0)}
            >
              <MenuItem value="">
                <em>Year</em>
              </MenuItem>
              <MenuItem value="2023">2023</MenuItem>
              <MenuItem value="2022">2022</MenuItem>
            </Select>
            <FormHelperText>With label + helper text</FormHelperText>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Month</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Month"
              value={month}
              onChange={(e) => handleChange2(e, 1)}
              // displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <em>Month</em>
              </MenuItem>
              <MenuItem value="01">01</MenuItem>
              <MenuItem value="02">02</MenuItem>
              <MenuItem value="03">03</MenuItem>
              <MenuItem value="04">04</MenuItem>
              <MenuItem value="05">05</MenuItem>
              <MenuItem value="06">06</MenuItem>
              <MenuItem value="07">07</MenuItem>
              <MenuItem value="08">08</MenuItem>
              <MenuItem value="09">09</MenuItem>
              <MenuItem value="10">10</MenuItem>
              <MenuItem value="11">11</MenuItem>
              <MenuItem value="12">12</MenuItem>
            </Select>
            <FormHelperText>Without label</FormHelperText>
          </FormControl>
          <Stack
            direction="row"
            spacing={2}
            className="check-btn"
            sx={{
              clear: "both",
              width: "120px",
              height: "60px",
              marginTop: "7px",
              marginLeft: "5px",
            }}
          >
            <Button
              variant="outlined"
              href="#outlined-buttons"
              sx={{
                color: "#03A9F4",
                border: "1px solid #03A9F4",
                fontFamily: "Orbitron-Bold",
                flexDirection: "row",
              }}
              onClick={searchClick}
            >
              Search
            </Button>
          </Stack>
        </div>
        <Table board hover border={1} className="News-table" width="100%">
          <thead className="notic-news">
            <th>MainNews</th>
            <tr className="notic-table-body2">
              <td>제임스 웹, NGC 346 산개성단을 자세히 관측하다</td>
              <td>2023.02.06</td>
            </tr>
          </thead>
        </Table>
        <Table board hover border={1} className="News-table" width="100%">
          <thead className="mini-table">
            <tr className="tbl">
              <th>Title</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {boardList.map((products) => (
              <CSMainTbody
                open={handleOpenModal}
                key={products.id}
                item={products}
              />
            ))}
          </tbody>
        </Table>
      </section>
      {open && <CSModal open={open} setOpen={setOpen} item={news} />}
    </>
  );
};

export default CSMain;
