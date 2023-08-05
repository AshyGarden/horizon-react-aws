import React from "react";
import "../scss/CSMain.scss";

const CSMainTbody = ({ open, item }) => {
  const { title, date } = item;
  const modalOpen = () => {
    open(item);
  };

  return (
    <>
      <tr id="News-tbody">
        <td className="td-title" onClick={modalOpen}>
          {title}
        </td>
        <td className="td-date">{date}</td>
      </tr>
    </>
  );
};

export default CSMainTbody;
