import { useState, useEffect, useCallback } from "react";
import throttle from "lodash.throttle";
//
const getCssVariable = (variable: string) => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim();
};
export default function useWindowSize() {
  const [deviceType, setDeviceType] = useState<
    "desktop" | "laptop" | "tablet" | "mobile"
  >("desktop");

  const handleResize = useCallback(() => {
    const tabletBreakpoint = getCssVariable("--breakpoint-tablet"); //744px
    const laptopBreakpoint = getCssVariable("--breakpoint-laptop"); //1024px
    const desktopBreakpoint = getCssVariable("--breakpoint-laptop"); //1921px

    if (window.matchMedia(`(max-width: ${tabletBreakpoint})`).matches) {
      setDeviceType("tablet");
    } else if (window.matchMedia(`(max-width: ${laptopBreakpoint})`).matches) {
      setDeviceType("laptop");
    } else if (window.matchMedia(`(max-width: ${desktopBreakpoint})`).matches) {
      setDeviceType("desktop");
    } else {
      setDeviceType("mobile");
    }
  }, []);

  const throttledResize = useCallback(throttle(handleResize, 2000), [
    handleResize,
  ]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", throttledResize);
    return () => {
      window.removeEventListener("resize", throttledResize);
    };
  }, [throttledResize]);
  return deviceType;
}
