import React from "react";
import backvid from "../assests/backVid.webm";

const TEst = () => {
  return (
    <div>
      <video playsInline autoPlay muted loop poster="cake.jpg">
        <source src={backvid} type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default TEst;
