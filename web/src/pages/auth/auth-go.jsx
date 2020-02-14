import React, { useState, useMemo } from "react";
import { Redirect, Route } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Layout from "../../layout/Layout";
import Webcam from "react-webcam";
import Popup from "reactjs-popup";
import Content from "../../content/content";
import Order from "../../pages/customer/kiosk-order";
var AWS = require("aws-sdk");
const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};
const cfg = {
  region: "us-west-2",
  upload_bucket_name: "rekognition-stack-demo-s3upload-1gezpp4hs4cul",
  identity_pool_id: "us-west-2:811ae595-f007-467f-919f-0056e4a81b3b",
  face_collection: "rekognition-demo-go",
  ddb_table: "rekognition-demo-go"
};
var bucketName = cfg.upload_bucket_name;
var face_collection = cfg.face_collection;
var table = cfg.ddb_table;
// Define AWS Resources
var region = cfg.region;
var creds = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: cfg.identity_pool_id
});

AWS.config.update({
  region: region,
  credentials: creds
});

var rekognition = new AWS.Rekognition({ apiVersion: "2016-06-27" });
var docClient = new AWS.DynamoDB.DocumentClient();

var identityId = AWS.config.credentials.identityId;
var fill_metadata = function(FaceMatches) {
  var temp_faces = [];
  var i;
};
var s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket: bucketName }
});
const AuthPage = props => {
  const [isMatched, setIsMatched] = useState(false);
  const [isSmile, setIssmile] = useState(false);
  const index = 0;
  var imageSrc;
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(() => {
    imageSrc = getBinary(webcamRef.current.getScreenshot());
    console.log(imageSrc);
    trackEmotions();
  }, [webcamRef]);
  function registerUser() {}
  function getBinary(encodedFile) {
    var base64Image = encodedFile.split("data:image/jpeg;base64,")[1];
    var binaryImg = atob(base64Image);
    var length = binaryImg.length;
    var ab = new ArrayBuffer(length);
    var ua = new Uint8Array(ab);
    for (var i = 0; i < length; i++) {
      ua[i] = binaryImg.charCodeAt(i);
    }

    var blob = new Blob([ab], {
      type: "image/jpeg"
    });

    return ab;
  }
  function onTimeout() {
    console.log("얼굴 탐색 시작한다..");

    var paramsForFace = {
      CollectionId: face_collection,
      FaceMatchThreshold: 80,
      Image: {
        Bytes: imageSrc
      },
      MaxFaces: 10
    };
    rekognition.searchFacesByImage(paramsForFace, function(err, data) {
      if (err) {
        //다시 interval가자.
        console.log("error낫디" + err);
      } else {
        console.log(data);
        if (data && data.FaceMatches && data.FaceMatches.length) {
          console.log("속보) Collection에 담긴 FaceID와 면상 일치");
          setIsMatched(true);
          // console.log(fill_metadata(data.FaceMatches));
          console.log(data.FaceMatches);
        }
      }
    });
  }
  const trackEmotions = () => {
    console.log("얼굴 분석 들어갑니다.");
    var params = {
      Attributes: ["ALL"],
      Image: {
        Bytes: imageSrc
      }
    };
    rekognition.detectFaces(params, function(err, data) {
      if (err) {
        console.log("얼굴 인식 ERROR");
        console.log(err);
      } else {
        // console.log(data);
        // console.log(data.FaceDetails[0].Smile);
        var smile = data.FaceDetails[0].Smile;

        // console.log(smile.Value);
        console.log("========매칭 된 얼굴 다 가져와라===========");
        console.log(data.FaceDetails);
        //onTimeout();
        if (smile.Value === true) {
          console.log("너는 웃고 있다..");
          setIssmile(true);
          onTimeout();
        } else {
          console.log("웃어달라고.. 웃어야 그래야 님 주문 할 수 있어 ㅋ");
        }
      }
    });
  };
  // ==========================================================
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewFace(false);
  };
  const [newFace, setNewFace] = useState(false);
  useMemo(() => {
    if (!isMatched && isSmile) {
      setNewFace(true);
      console.log("조건 만족!");
    }
    console.log(newFace);
  }, [newFace, isMatched, isSmile]);
  // ==========================================================
  console.log(newFace);
  return (
    <>
      {!isSmile ? (
        <Layout>
          <Webcam
            audio={false}
            height={720}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={1280}
            videoConstraints={videoConstraints}
          />
          <br></br>
          <Button color="primary" variant="contained" onClick={capture}>
            Capture photo
          </Button>
          <Button color="primary" variant="contained" onClick={registerUser}>
            Capture photo
          </Button>
        </Layout>
      ) : isMatched ? (
        <Route to="/order" component={Order} />
      ) : (
        // <>{() => setOpen(true)}</>
        <Layout>
          <Webcam
            audio={false}
            height={720}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={1280}
            videoConstraints={videoConstraints}
          />
          <br></br>
          <Button color="primary" variant="contained" onClick={capture}>
            Capture photo
          </Button>
          <Button color="primary" variant="contained" onClick={registerUser}>
            Capture photo
          </Button>
        </Layout>
      )}
      {/* <ChangeComp /> */}
      {/* 새로만든 다이얼 */}
      <Dialog
        open={newFace}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      {/* 여기까지 */}
    </>
  );
};

export default AuthPage;
