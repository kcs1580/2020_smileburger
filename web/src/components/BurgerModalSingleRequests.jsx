import React from "react";
import { red } from "@material-ui/core/colors";
import { Grid, Typography } from "@material-ui/core";
const BurgerModalSingleRequests = props => {
  return (
    <div>
      <Grid container>
        <Grid item xs={1} style={{ background: red[500] }}></Grid>
        <Grid item xs={11} style={{ background: red[100] }}>
          요청사항
        </Grid>
      </Grid>
      <Grid container style={{ margin: 0, width: 900, padding: 20 }}>
        <Grid item xs={3} style={{ margin: 0, textAlign: "center" }}>
          <Typography gutterBottom variant="h5" component="h2">
            <p>요청없음</p>
          </Typography>
        </Grid>
        <Grid item xs={3} style={{ margin: 0, textAlign: "center" }}>
          <Typography gutterBottom variant="h5" component="h2">
            <p>피클제거</p>
          </Typography>
        </Grid>
        <Grid item xs={3} style={{ margin: 0, textAlign: "center" }}>
          <Typography gutterBottom variant="h5" component="h2">
            <p>양파제거</p>
          </Typography>
        </Grid>
        <Grid item xs={3} style={{ margin: 0, textAlign: "center" }}>
          <Typography gutterBottom variant="h5" component="h2">
            <p>피클,양파제거</p>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default BurgerModalSingleRequests;
