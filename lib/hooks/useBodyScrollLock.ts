"use client";

import { useEffect } from "react";

export function useBodyScrollLockWithPendingScroll(isLocked: boolean, pendingScrollRef: { current: string | null }): void {
  useEffect(() => {
    if (isLocked) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      window.dispatchEvent(new Event("mobileMenuOpen"));
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      window.dispatchEvent(new Event("mobileMenuClose"));

      if (pendingScrollRef.current) {
        const href = pendingScrollRef.current;
        pendingScrollRef.current = null;
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent("smoothScrollTo", { detail: href }));
        }, 200);
      }
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      window.dispatchEvent(new Event("mobileMenuClose"));
    };
  }, [isLocked, pendingScrollRef]);
}
