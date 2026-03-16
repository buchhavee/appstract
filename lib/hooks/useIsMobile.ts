"use client";

import { useState, useEffect } from "react";

/**
 * Hook that returns true when the viewport width is below the given breakpoint.
 * Uses a resize listener and defaults to 768 px (md breakpoint).
 */
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}
