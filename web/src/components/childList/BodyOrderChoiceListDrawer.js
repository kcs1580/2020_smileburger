import React, { useState } from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import BodyOrderChoiceList from "./BodyOrderChoiceList";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";

const BodyOrderChoiceListDrawer = ({ orderList, setOrderList, waitingNum }) => {
  const [state, setState] = useState({ bottom: false });

  const toggleDrawer = (side, open) => event => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  return (
    <Grid container>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <Grid justify="flex-end" container>
        <div style={{ marginRight: 70, fontSize: 40 }}>
          장바구니 열기
          <Icon style={{ fontSize: 100 }} onClick={toggleDrawer("bottom", true)}>
            add_circle
          </Icon>
        </div>
      </Grid>

      <SwipeableDrawer
        anchor="bottom"
        open={state.bottom}
        onOpen={toggleDrawer("bottom", true)}
        onClose={toggleDrawer("bottom", false)}
      >
        <BodyOrderChoiceList
          orderList={orderList}
          setOrderList={setOrderList}
          setState={setState}
          waitingNum={waitingNum}
        />
      </SwipeableDrawer>
    </Grid>
  );
};
export default BodyOrderChoiceListDrawer;
