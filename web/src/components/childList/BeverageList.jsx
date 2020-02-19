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

const BeverageList = ({ setOrder, beverages }) => {
  const classes = useStyles();

  return (
    <Container
      className={classes.cardGrid}
      maxWidth="md"
      style={{ height: "1400px", overflow: "auto" }}
    >
      <Grid container spacing={4}>
        {/* Server 에 저장된 버거 정보만큼 반복하며 생성 */}
        {beverages.map(beverage => (
          <Grid item xs={12} sm={6} md={6} key={beverage.pid}>
            <Card className={classes.card}>
              <ProductModal product={beverage} setOrder={setOrder} />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h3" component="h2">
                  {beverage.pname}
                </Typography>
                <Typography variant="h3">
                  <span style={{ marginRight: "10px" }}>단품: {beverage.pprice}</span>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BeverageList;
