import React from "react";
import Banner from "./index";
import airpods from "../../assets/airpods.png";
import iphone from "../../assets/iphone.png";
import tablet from "../../assets/tablet.png";

function App() {
  return (
    <div
      style={{
        height: "400px",
      }}
    >
      <Banner
       imgSrc={[airpods, iphone, tablet]} 
      />
    </div>
  );
}

export default App;
