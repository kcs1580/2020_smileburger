import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import BodyControl from "../../components/manager/BodyControl";
const useBtnStyles = makeStyles(theme => ({
  Button: {
    height: 200,
    width: 300
  }
}));

const BtnLink = ({ idx, name, setState }) => {
  const classes = useBtnStyles(idx);
  return (
    <div>
      <Button
        variant="outlined"
        className={classes.Button}
        onClick={() => {
          setState(idx);
        }}
        color="primary"
      >
        <h3>{name}</h3>
      </Button>
    </div>
  );
};

const ManagerMain = () => {
  const [state, setState] = useState(0);
  const arr = [["주문현황"], ["판매내역"], ["통계"], ["마감"]];

  const btnList = arr.map((name, idx) => {
    return <BtnLink key={idx} idx={idx} name={name} setState={setState} />;
  });

  return (
    <div>
      <br />
      <br />
      <Container>
        <Grid container justify="space-between">
          {btnList}
        </Grid>
      </Container>
      <br />
      <br />
      <br />
      <br />
      <br />
      <BodyControl idx={state} />
    </div>
  );
};

export default ManagerMain;
