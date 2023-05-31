export  type BannerProps = {
  imgSrc: string[]; // 图片数组
  imgWidth: number; //图片宽度
  imgHeight: number; // 图片高度
  duration:number; // 模拟图片动画效果 多长时间展示完毕
  autoTimer?:number;  // 自动切换图片 时间
};

export  type DotProps = {
  total: number; // 
  curIndex : number;
  onChange:(index:number)=>void;
};