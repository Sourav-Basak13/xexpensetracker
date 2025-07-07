import React, { useEffect, useState } from "react";

function useDimension() {
  const hasWindow = typeof window !== "undefined";

  const getWindowDimensions = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    return {
      width,
      height,
    };
  };

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  const handleResize = () => setWindowDimensions(getWindowDimensions());

  useEffect(() => {
    if (hasWindow) {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [hasWindow]);

  return windowDimensions;
}

export default useDimension;
