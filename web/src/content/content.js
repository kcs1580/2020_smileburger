import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

export default ({ close }) => (
  <div className="modal">
    <a className="close" onClick={close}>
      &times;
    </a>
    <div className="header"> 새로 등록할래? </div>
    <div className="content">
      <Button component={Link} to="/Register" size="large" color="secondary" variant="contained">
        {" "}
        YES{" "}
      </Button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Button component={Link} to="/order" size="large" color="secondary" variant="contained">
        {" "}
        NO{" "}
      </Button>
    </div>
  </div>
);
