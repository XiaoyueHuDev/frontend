import React, {
  useMemo,
  useState,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from "react";
import type { ImgContainerProps } from "../bannerType";
import {animate} from '../util/comon'

import "./index.scss";

function Index(
  props: ImgContainerProps & {
    setCurrentIndex: any;
  },
  ref: any
) {
  const {
    imgSrc,
    duration = 3000,
    setCurrentIndex,
    bannerLayout,
    bannerLayout:{
      bannerWidth,
      bannerHeight
    }
  } = props;

  const [cuttentDistance, setCuttentDistance] = useState(0);
  useImperativeHandle(ref, () => ({
    switchTo: switchTo,
    setCuttentDistance:setCuttentDistance
  }));

  const getImgSrc = useMemo(() => {
    return imgSrc.map((item) => (
      <img
        src={item}
        alt=""
        key={item}
        style={{
          width: bannerWidth,
          height: bannerHeight,
          //float:'left'
        }}
      />
    ));
  }, [imgSrc,bannerLayout]);
  /**
   *
   * @param {*} index
   * 切换到第几张图片  经过一段时间动画完成
   */
  const switchTo = useCallback((index: number) => {

   
    const targetLeft = -index * bannerWidth;
    animate({
      from:cuttentDistance, 
      to:targetLeft, 
      time:duration, 
      onMove:(val:number)=>{
        setCuttentDistance(val)
      }, 

      onEnd:()=>{
        setCuttentDistance(targetLeft)
        if(index===imgSrc.length){
           setCurrentIndex(0)
           setCuttentDistance(0)
        }
       
      }, 
      tick:13, 
    })
    // let curTimes = 0;
    // let curLeft = imgMR;
    // const totalDis = targetLeft - imgMR;
    // // 3. 每次移动的距离
    // const dis = totalDis / times;
  
    // console.log(curLeft, "====curLeft")
    
  }, [cuttentDistance,animate,bannerLayout,setCurrentIndex,setCuttentDistance,imgSrc]);


  return (
    <div
      className="img-container"
      style={{
        width: (imgSrc.length + 1) * bannerWidth ,
        height: bannerHeight,
        marginLeft: cuttentDistance + "px",
      }}
    >
      {getImgSrc}
      {
        <img
          src={imgSrc[0]}
          key={imgSrc.length + 1}
          style={{
            width: bannerWidth,
            height: bannerHeight,
            //float:'left'
          }}
        />
      }
    </div>
  );
}

export default forwardRef(Index);
