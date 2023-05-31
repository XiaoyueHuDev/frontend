import React, { useMemo } from "react";
import Banner from "./index";
import airpods from "../../assets/airpods.png";
import iphone from "../../assets/iphone.png";
import tablet from "../../assets/tablet.png";

function App() {
  return (
      <Banner 
      imgSrc={[airpods,iphone,tablet]} 
      imgWidth={520} 
      imgHeight={300} 
      duration={2000}  
      autoTimer={3000}   
      />
  );
}

export default App;
