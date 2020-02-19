import React from "react";
import { makeStyles, Container, Grid, Card, CardContent, Typography } from "@material-ui/core";
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

const BurgerList = ({ setOrder, burgers, burgerSets, sides, beverages, requests }) => {
  const classes = useStyles();

  let burgerSetId = [];
  let burgerSetName = [];
  let burgerSetPrice = [];
  let burgerSetDesc = [];
  let burgerSetImgurl = [];

  burgerSets.map(burgerSet => {
    burgerSetId.push(burgerSet.pid);
    burgerSetName.push(burgerSet.pname);
    burgerSetPrice.push(burgerSet.pprice);
    burgerSetDesc.push(burgerSet.pdesc);
    burgerSetImgurl.push(burgerSet.pimgurl);
  });

  return (
    <Container
      className={classes.cardGrid}
      maxWidth="md"
      style={{ height: "1060px", overflow: "auto" }}
    >
      <Grid container spacing={4}>
        {/* Server 에 저장된 버거 정보만큼 반복하며 생성 */}
        {burgers.map((burger, idx) => (
          <Grid item xs={12} sm={6} md={4} key={burger.pid}>
            <Card className={classes.card}>
              <BurgerModal
                burger={burger}
                burgerSetId={burgerSetId[idx]}
                burgerSetName={burgerSetName[idx]}
                burgerSetPrice={burgerSetPrice[idx]}
                burgerSetDesc={burgerSetDesc[idx]}
                burgerSetImgurl={burgerSetImgurl[idx]}
                sides={sides}
                beverages={beverages}
                requests={requests}
                setOrder={setOrder}
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h4" component="h2">
                  {burger.pname}
                </Typography>
                <Typography variant="h4" component="h2" style={{ marginRight: "10px" }}>
                  단품: {burger.pprice}
                  <br />
                  세트: {burgerSetPrice[idx]}
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
