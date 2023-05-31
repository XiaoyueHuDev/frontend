import React, { useMemo, useState, useImperativeHandle, forwardRef } from "react";
import './index.scss'
// type imgProps = {
//   imgSrc: string[]; // 图片数组
//   imgWidth: number; //图片宽度
//   imgHeight: number; // 图片高度
// };

const tick = 16
let timer = null
function Index(props, ref) {
  const {
    imgSrc,
    imgWidth,
    imgHeight,
    duration = 3000,
    setCurrentIndex
  } = props;

  useImperativeHandle(ref, () => ({
    switchTo: switchTo
  }
  ))
  const [imgMR, setImgMR] = useState(0)
  const getImgSrc = useMemo(() => {
    return imgSrc.map((item) => (
      <img src={item} alt="" key={item}

        style={{
          width: imgWidth,
          height: imgHeight,
          //float:'left'
        }}
      />
    ))
  }, []);
  /**
   * 
   * @param {*} index 
   * 切换到第几张图片  经过一段时间动画完成
   */
  const switchTo = (index) => {

    // 点的是第几张
    if (index < 0) {
      index = 0;
    } else if (index > imgSrc.length) {
      index = imgSrc.length - 1
    }
    // 1. 根据index 计算div 的最终margetLeft
    const targetLeft = -index * imgWidth;
    // 
    const times = Math.ceil(duration / tick)
    let curTimes = 0
    let curLeft = imgMR
    const totalDis = targetLeft - imgMR
    const dis = totalDis / times
    clearInterval(timer)
    // console.log(curLeft, "====curLeft")
    timer = setInterval(() => {
      curTimes++;
      curLeft += dis
      setImgMR(curLeft)

      if (curTimes === times) {
        console.log(index,"+==index==",imgSrc.length)
        if(index===imgSrc.length){
        //  setCurrentIndex(0)
          setImgMR(0)
          setCurrentIndex(0)
        }else {
          setImgMR(targetLeft)
        }
        clearInterval(timer)
      }
    }, tick)



  }
 // console.log(imgMR,"===imgMR==")
  return <div
    className="img-container"
    style={{
      width: (imgSrc.length +1)* imgWidth,
      height: imgHeight,
      marginLeft: imgMR + 'px'
    }}
  >
    {getImgSrc}
    {
      <img src={imgSrc[0]}
        key={imgSrc.length + 1}
        style={{
          width: imgWidth,
          height: imgHeight,
          //float:'left'
        }}
      />
    }
  </div>;
}

export default forwardRef(Index)
