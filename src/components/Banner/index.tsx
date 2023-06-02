import React, { useState, useRef, useEffect, useCallback } from "react";
import ImgContainer from "./ImgContainer/index";
import DoSwitchDot from "./SwitchDot/index";
import type { BannerProps, BannerLayoutProps } from "./bannerType";
import Arrow from "./Arrow/index";
import "./index.scss";

let timer: any = 0;

export default function Index(props: BannerProps) {
  const {
    imgSrc,
    imgWidth,
    imgHeight,
    isArrow = false,
    duration = 800,
    autoTimer = 3000,
  } = props;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [bannerLayout, setBannerLayout] = useState<BannerLayoutProps>({
    bannerWidth: 0,
    bannerHeight: 0,
  });
  const imgRef = useRef<any>(null);
  const bannerContiner = useRef<any>(null);
  /**
   * 调用子组件 移动到哪张图片
   */
  const handleToImg = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      imgRef.current.switchTo(index);
    },
    [setCurrentIndex,]
  );

  const next = useCallback(() => {
    let index = currentIndex + 1;
   // console.log(index,"+==index==")
    handleToImg(index);
  }, [currentIndex,handleToImg]);


  /**
   * 开启自动轮播
   */
  const autoStart = useCallback(() => {
    timer = setInterval(() => {
      next()
    }, autoTimer);
  }, [next, autoTimer,]);

  useEffect(() => {
     autoStart()
    return () => {
      clearInterval(timer);
    };
  }, [autoStart]);

  /**
   *  计算图片的高度 宽度
   */
  useEffect(() => {
    if (bannerContiner.current) {
      const { clientWidth, clientHeight } = bannerContiner.current;
      if (imgWidth && imgHeight) {
        setBannerLayout({
          bannerWidth: imgWidth,
          bannerHeight: imgHeight,
        });
      } else {
        setBannerLayout({
          bannerWidth: clientWidth,
          bannerHeight: clientHeight,
        });
      }
    }
  }, [bannerContiner.current?.clientWidth, imgWidth, imgHeight]);

  const prev = useCallback(() => {
    let index = currentIndex - 1;
 
    if (index < 0) {
      index=imgSrc.length-1;
      setCurrentIndex(index)
      imgRef.current.setCuttentDistance(bannerLayout.bannerWidth*imgSrc.length)
    }
    handleToImg(index);

  }, [currentIndex, imgSrc,handleToImg,bannerLayout]);


  return (
    <div
      className="banner-container"
      ref={bannerContiner}
      style={{
        width: imgWidth,
        height: imgHeight,
      }}
      onMouseEnter={(e) => {
        e.stopPropagation()
        console.log(timer, "==timer");
        clearInterval(timer);
      }}
      onMouseLeave={(e) => {
        e.stopPropagation()
        timer = null;
         autoStart()
      }}
    >
      {/* 渲染图片 */}
      <ImgContainer
        bannerLayout={bannerLayout}
        ref={imgRef}
        imgSrc={imgSrc}
        duration={duration}
        setCurrentIndex={setCurrentIndex}
      />
      {/* 底部 块 */}
      <DoSwitchDot
        total={imgSrc.length}
        curIndex={currentIndex}
        onChange={handleToImg}
      />
      {/*  左右箭头  */}
      {isArrow && <Arrow prev={prev} next={next} />}
    </div>
  );
}
