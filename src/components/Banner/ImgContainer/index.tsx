import React, {
  useMemo,
  useState,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from "react";
import type { BannerProps } from "../bannerType";
import "./index.scss";
// type imgProps = {
//   imgSrc: string[]; // 图片数组
//   imgWidth: number; //图片宽度
//   imgHeight: number; // 图片高度
// };

const tick = 16;
let timer: any = null;
function Index(
  props: BannerProps & {
    setCurrentIndex: any;
  },
  ref: any
) {
  const {
    imgSrc,
    imgWidth,
    imgHeight,
    duration = 3000,
    setCurrentIndex,
  } = props;

  useImperativeHandle(ref, () => ({
    switchTo: switchTo,
  }));
  const [imgMR, setImgMR] = useState(0);

  const getImgSrc = useMemo(() => {
    return imgSrc.map((item) => (
      <img
        src={item}
        alt=""
        key={item}
        style={{
          width: imgWidth,
          height: imgHeight,
          //float:'left'
        }}
      />
    ));
  }, [imgSrc]);
  /**
   *
   * @param {*} index
   * 切换到第几张图片  经过一段时间动画完成
   */
  const switchTo = useCallback((index: number) => {
    // 点的是第几张
    if (index < 0) {
      index = 0;
    } else if (index > imgSrc.length) {
      index = imgSrc.length - 1;
    }
    // 1. 根据index 计算div 的最终margetLeft
    const targetLeft = -index * imgWidth;
    // 2. 计算在 一定间隔内 需要移动多少次
    const times = Math.ceil(duration / tick);
    let curTimes = 0;
    let curLeft = imgMR;
    const totalDis = targetLeft - imgMR;
    // 3. 每次移动的距离
    const dis = totalDis / times;
    clearInterval(timer);
    // console.log(curLeft, "====curLeft")
    timer = setInterval(() => {
      curTimes++;
      curLeft += dis;
      setImgMR(curLeft);

      if (curTimes === times) {
      //  console.log(index, "+==index==", imgSrc.length);
        if (index === imgSrc.length) {
          //  setCurrentIndex(0)
          setImgMR(0);
          setCurrentIndex(0);
        } else {
          setImgMR(targetLeft);
        }
        clearInterval(timer);
      }
    }, tick);
  }, [imgMR]);
  // console.log(imgMR,"===imgMR==")
  return (
    <div
      className="img-container"
      style={{
        width: (imgSrc.length + 1) * imgWidth,
        height: imgHeight,
        marginLeft: imgMR + "px",
      }}
    >
      {getImgSrc}
      {
        <img
          src={imgSrc[0]}
          key={imgSrc.length + 1}
          style={{
            width: imgWidth,
            height: imgHeight,
            //float:'left'
          }}
        />
      }
    </div>
  );
}

export default forwardRef(Index);
