import React, { useState, useRef ,useEffect, useCallback } from "react";
import ImgContainer from './ImgContainer/index'
import DoSwitchDot from './SwitchDot/index'
import type {BannerProps} from './bannerType'
import './index.scss'

let  timer: any=0;

export default function Index(props:BannerProps) {
  const { imgSrc, imgWidth, imgHeight ,duration,autoTimer} = props;
  const [currentIndex, setCurrentIndex] = useState<number>(0)
 const imgRef=useRef<any>(null)
 
 /**
  * 调用子组件 移动到哪张图片
  */
 const handleToImg = useCallback((index:number) => {
  setCurrentIndex(index)
  imgRef.current.switchTo(index)
},[imgRef?.current?.switchTo])

 useEffect(()=>{
  clearInterval(timer)
    timer= setInterval(()=>{
       const cur=(currentIndex+1)%(imgSrc.length+1) 
       handleToImg(cur) 
    },autoTimer)
 },[currentIndex,handleToImg,autoTimer])
 

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
  </div>
}
