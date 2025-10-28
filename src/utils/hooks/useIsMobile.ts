import { useState, useEffect } from "react";

/**
 * 检测是否为移动端设备
 * @param breakpoint 断点宽度，默认 768px
 */
export default function useIsMobile(breakpoint: number = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // 初始检查
    checkIsMobile();

    // 监听窗口大小变化
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, [breakpoint]);

  return isMobile;
}

