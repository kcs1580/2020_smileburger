import React from "react";
import Layout from "../../layout/Layout";
import Webcam from "react-webcam";
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

var s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket: bucketName }
});
const AuthPage = props => {
  const index = 0;
  var imageSrc;
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(() => {
    imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
  }, [webcamRef]);
  const trackEmotions = () => {
    var params = {
      Attributes: ["ALL"],
      Image: {
        Bytes: imageSrc
      }
    };
    rekognition.detectFaces(params, function(err, data) {
      if (err) {
        console.log("얼굴 인식 ERROR");
      } else {
        console.log(data);
        console.log(data.FaceDetails[0].Emotions);
      }
    });

    return (
      <Layout>
        <Webcam
          audio={false}
          height={720}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={1280}
          videoConstraints={videoConstraints}
        />
        <button onClick={capture}>Capture photo</button>
      </Layout>
    );
  };
};

export default AuthPage;
