import { useState, useEffect } from "react";
import throttle from "lodash.throttle";
//
export default function useWindowSize() {
  const [deviceType, setDeviceType] = useState<"desktop" | "mobile" | "tablet">(
    "desktop"
  );

  const handleResize = () => {
    if (window.matchMedia("(max-width: 743px)").matches) {
      setDeviceType("mobile");
    } else if (window.matchMedia("(max-width: 1023px)").matches) {
      setDeviceType("tablet");
    } else {
      setDeviceType("desktop");
    }
  };

  const throttledResize = throttle(handleResize, 2000);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", throttledResize);
    return () => {
      window.removeEventListener("resize", throttledResize);
    };
  }, []);
  return deviceType;
}
