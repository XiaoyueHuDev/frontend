let timer: any = null;
type Options = {
  from: number; // 从哪里开始移动
  to: number; // 最终到哪里
  time: number; // 需要多长时间
  onMove: (index: number) => void; //移动时候调用函数
  onEnd: () => void; // 动画结束
  tick: number;
 //  onStart:()=>void
};
/**
 *
 * @param options
 *  封装一个动画效果，在{time} 时间内 从from 到to 
 *  onEnd  动画结束后 调用该方法
 */
const animate = (options: Options) => {
  const { from, to, time, onMove, onEnd, tick } = options;
  console.log(options, "+==");
  const times = Math.ceil(time / tick);
  let curTimes = 0;
  const totalDis = from - to;
  // 每次移动距离
  const dis = totalDis / times;
  clearInterval(timer);
  let currentFrom = from;
  timer = setInterval(() => {
    curTimes++;
    currentFrom = currentFrom - dis;
    onMove && onMove(currentFrom);
    if (curTimes === times) {
      onMove && onMove(to);
      onEnd && onEnd();
      clearInterval(timer);
    }
  }, tick);
};

export { animate };
