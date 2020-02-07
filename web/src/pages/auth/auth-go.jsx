import React from "react";
import Layout from "../../layout/Layout";

const AuthPage = props => {
  const index = 0;

  return (
    <Layout>
      <div class="btn-group  clearfix" style="position:absolute; z-index:1040;"></div>
      <video
        class="card-img-top sticky-top"
        id="video"
        style="object-position:0px;"
        autoplay
        playsinline
      ></video>
      <div>Auth....... 진행중...</div>
    </Layout>
  );
};

export default AuthPage;
