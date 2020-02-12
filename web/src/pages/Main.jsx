import React from "react";
import Layout from "../layout/Layout";
import Popup from "reactjs-popup";
import Content from "../content/content";

// C:\Users\multicampus\webmobile3-skeleton\web\src\pages\Main.jsx
// C:\Users\multicampus\webmobile3-skeleton\web\src\content\content.js
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";

import SectionCarousel from "../components/slick/SectionCarousel"

const Main = props => {
  const index = 0;

  return (
    <>
      <Layout>
        <div>SMILE</div>
        <Button
          component={Link}
          to="/auth"
          style={{ height: "200px", width: "200px" }}
          color="secondary"
          variant="contained"
        >
          {" "}
          Member{" "}
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Popup
          modal
          trigger={
            <Button
              style={{ height: "200px", width: "200px" }}
              color="secondary"
              variant="contained"
              onClick={() => console.log("Register click!")}
            >
              {" "}
              Register{" "}
            </Button>
          }
        >
          {close => <Content close={close} />}
        </Popup>
        <br></br> <br></br> <br></br>
        <Button size="medium" color="secondary" variant="contained">
          {" "}
          클릭하면 DB에 데이터 저장된다.{" "}
        </Button>
        <br></br>
        <Button size="medium" color="secondary" variant="contained" disabled>
          {" "}
          Disabled{" "}
        </Button>
        <SectionCarousel />
      </Layout>
    </>
  );
};

export default Main;
