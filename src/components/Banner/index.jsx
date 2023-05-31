import React, { useState, useRef ,useEffect } from "react";
import ImgContainer from './ImgContainer/index'
import DoSwitchDot from './SwitchDot/index'
import './index.scss'
// type bannerProps = {
//   imgSrc: string[]; // 图片数组
//   imgWidth: number; //图片宽度
//   imgHeight: number; // 图片高度
// };
let  timer=0;

export default function Index(props) {
  const { imgSrc, imgWidth, imgHeight ,duration,autoTimer} = props;
  const [currentIndex, setCurrentIndex] = useState(0)
 // const [imgRef, setImgRef] = useState(null)
 const imgRef=useRef(null)
 const handleToImg = (index) => {
  setCurrentIndex(index)
  imgRef.current.switchTo(index)
  // console.log(index, "+===index",imgRef)
}

 useEffect(()=>{
  clearInterval(timer)
    timer= setInterval(()=>{
       const cur=(currentIndex+1)%(imgSrc.length+1)
      
       handleToImg(cur) // 3
    },autoTimer)
 },[currentIndex,handleToImg])
 

  // const getImgRef = (el) => {
  //   console.log(el,"===el")
  //   setImgRef(el)
  // }
  return <div
    className="banner-container"
    style={{
      width: imgWidth,
      height: imgHeight
    }}
  >
    <ImgContainer
      ref={imgRef}
      imgSrc={imgSrc}
      imgWidth={imgWidth}
      imgHeight={imgHeight}
      duration={duration}
      setCurrentIndex={setCurrentIndex}
    />
    <DoSwitchDot
      total={imgSrc.length}
      curIndex={currentIndex}
      onChange={handleToImg}
    />
   {/* <div  onClick={()=>{
        handleToImg(3)
   }}>
    dsdsd
   </div> */}
  </div>
}
