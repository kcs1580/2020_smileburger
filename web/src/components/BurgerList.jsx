import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  makeStyles,
  Container,
  Grid,
  Card,
  CardContent,
  Typography
} from "@material-ui/core";
import BurgerModal from "./BurgerModal";

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

const BurgerList = ({ setTemp }) => {
  const classes = useStyles();
  const [burgers, setBurgers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/test")
      .then(({ data }) => setBurgers(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {burgers.map(burger => (
          <Grid item xs={12} sm={6} md={4} key={"burger" + burger.id}>
            <Card className={classes.card} key={burger.title}>
              <BurgerModal burger={burger} setTemp={setTemp} />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {burger.title}
                </Typography>
                <Typography>
                  <span style={{ marginRight: "10px" }}>
                    단품: {burger.price_single}
                  </span>
                  <span>세트: {burger.price_set}</span>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BurgerList;
