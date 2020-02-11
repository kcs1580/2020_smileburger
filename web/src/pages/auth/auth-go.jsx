import React, { useState, useMemo } from "react";
import { Route } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Layout from "../../layout/Layout";
import Webcam from "react-webcam";
import Order from "../../pages/customer/kiosk-order";
var AWS = require("aws-sdk");
const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};
// Define AWS Resources ================================================
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

var region = cfg.region;
var creds = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: cfg.identity_pool_id
});

AWS.config.update({
  region: region,
  credentials: creds
});
// Define AWS Resources ==================================================
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

  var imageSrc;
  const webcamRef = React.useRef(null);
  var curImg;
  async function capture() {
    curImg = webcamRef.current.getScreenshot();
    imageSrc = getBinary(curImg);
    console.log(imageSrc);
    await trackEmotions();
  }

  async function registerUser() {
    curImg = webcamRef.current.getScreenshot();
    imageSrc = getBinary(curImg);

    var params = {
      CollectionId: face_collection,
      Image: {
        Bytes: imageSrc
      }
    
    await 
  };

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
  async function onTimeout() {
    console.log("얼굴 탐색 시작한다..");

    var paramsForFace = {
      CollectionId: face_collection,
      FaceMatchThreshold: 80,
      Image: {
        Bytes: imageSrc
      },
      MaxFaces: 10
    };

    try {
      const data = await rekognition.searchFacesByImage(paramsForFace).promise();
      // await >> try/catch
      console.log(data);
      if (data.FaceMatches && data.FaceMatches.length) {
        console.log("속보) Collection에 담긴 FaceID와 면상 일치");
        try {
          await setIsMatched(true).promise();
        } catch (e) {
          console.log(e);
        }
      } else {
        //interval
      }
    } catch (e) {
      console.log(e);
      //interval
    }
  }

  async function trackEmotions() {
    console.log("얼굴 분석 들어갑니다.");
    var params = {
      Attributes: ["ALL"],
      Image: {
        Bytes: imageSrc
      }
    };
    await rekognition.detectFaces(params, function(err, data) {
      if (err) {
        console.log("얼굴 인식 ERROR");
        console.log(err);
      } else {
        // console.log(data.FaceDetails[0].Smile);
        var smile = data.FaceDetails[0].Smile;

        // console.log(smile.Value);
        console.log("========인식된 얼굴 다 가져와라===========");
        console.log(data.FaceDetails);
        //반복문 전부 돌면서 한명이라도 웃고 있으면 이제 faceSearchByImage.
        data.FaceDetails.some(p => {
          console.log(p);
          if (p.Smile.Value === true) {
            setIssmile(true);
            onTimeout();
            return p.Smile.Value === true;
          } else {
            console.log("웃어달라고.. 웃어야 그래야 님 주문 할 수 있어 ㅋ");
          }
        });
      }
    });
  }
  // ==========================================================
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewFace(false);
  };

  const registerUser = () => {
    curImg = webcamRef.current.getScreenshot();
    imageSrc = getBinary(curImg);
    console.log(imageSrc);
  };
  const [newFace, setNewFace] = useState(false);
  useMemo(() => {
    if (!isMatched && isSmile) {
      setNewFace(true);
      console.log("조건 만족!");
    }
  }, [isMatched, isSmile]);
  // ==========================================================

  return (
    <>
      {!isSmile ? (
        <body>
          <Webcam
            audio={false}
            height={620}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={1080}
            videoConstraints={videoConstraints}
          />
          <br></br>
          <div style={{ textAlign: "center" }}>
            <Button color="primary" variant="contained" onClick={capture}>
              Capture photo
            </Button>
            <Button color="primary" variant="contained" onClick={registerUser}>
              Capture photo
            </Button>
          </div>
        </body>
      ) : isMatched ? (
        <Route to="/order" component={Order} />
      ) : (
        // <>{() => setOpen(true)}</>
        <Layout>
          <Webcam
            audio={false}
            height={360}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={720}
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
        <DialogTitle id="alert-dialog-title">{"얼굴 등록 하시겠어요?"}</DialogTitle>
        <DialogContent>
          <Webcam
            audio={false}
            height={200}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={400}
            videoConstraints={videoConstraints}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={registerUser} color="primary">
            회원 등록
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            비회원 주문
          </Button>
        </DialogActions>
      </Dialog>
      {/* 여기까지 */}
    </>
  );
};

export default AuthPage;
