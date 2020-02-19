import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles, Container, Grid, Card, CardContent, Typography } from "@material-ui/core";
import ProductModal from "./ProductModal";

const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },

  gridList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "auto",
    backgroundColor: theme.palette.background.paper,
    height: "900px"
  },
  cardContent: {
    flexGrow: 1,
    textAlign: "center",
    overflow: "hidden"
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

const SideList = ({ setOrder, sides }) => {
  const classes = useStyles();

  return (
    <Container
      className={classes.cardGrid}
      maxWidth="md"
      style={{ height: "1400px", overflow: "auto" }}
    >
      <Grid container spacing={4}>
        {/* Server 에 저장된 버거 정보만큼 반복하며 생성 */}
        {sides.map(side => (
          <Grid item xs={12} sm={6} md={6} key={side.pid}>
            <Card className={classes.card}>
              <ProductModal product={side} setOrder={setOrder} />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h3">
                  {side.pname}
                </Typography>
                <Typography variant="h3">
                  <span style={{ marginRight: "10px" }}>단품: {side.pprice}</span>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SideList;
