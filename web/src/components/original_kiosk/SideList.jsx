import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles, Container, Grid, Card, CardContent, Typography } from "@material-ui/core";
import ProductModal from "./ProductModal";

const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1,
    textAlign: "center"
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

const SideList = ({ setOrder, sides }) => {
  const classes = useStyles();

  return (
    <Container
      className={classes.cardGrid}
      maxWidth="md"
      style={{ height: "1060px", overflow: "auto" }}
    >
      <Grid container spacing={4}>
        {/* Server 에 저장된 버거 정보만큼 반복하며 생성 */}
        {sides.map(side => (
          <Grid item xs={12} sm={6} md={4} key={side.pid}>
            <Card className={classes.card}>
              <ProductModal product={side} setOrder={setOrder} />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h4" component="h2">
                  {side.pname}
                </Typography>
                <Typography variant="h4">가격: {side.pprice}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SideList;
