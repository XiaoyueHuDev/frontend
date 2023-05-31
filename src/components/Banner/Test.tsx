import React, { useMemo } from "react";
import Banner from "./index";
import airpods from "../../assets/airpods.png";
import iphone from "../../assets/iphone.png";
import tablet from "../../assets/tablet.png";

function App() {
  // const getImgSrc = useMemo(() => {
  //   const srcString=[airpods,iphone,tablet]
  //    return srcString.map((item)=>(
  //       <img src={item} alt="" />
  //    ))
  // }, []);
  return (
    <div>
      <Banner 
      imgSrc={[airpods,iphone,tablet]} 
      imgWidth={520} 
      imgHeight={300} 
      duration={2000}  
      autoTimer={3000}   
      />
    </div>
  );
}

export default App;
