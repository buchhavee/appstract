"use client";

import { useEffect } from "react";

interface UseBodyScrollLockOptions {
  isLocked: boolean;
  onOpenEvent?: string;
  onCloseEvent?: string;
  onUnlock?: () => void;
}

export function useBodyScrollLock({ isLocked, onOpenEvent = "mobileMenuOpen", onCloseEvent = "mobileMenuClose", onUnlock }: UseBodyScrollLockOptions): void {
  useEffect(() => {
    if (isLocked) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      window.dispatchEvent(new Event(onOpenEvent));
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      window.dispatchEvent(new Event(onCloseEvent));
      onUnlock?.();
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      window.dispatchEvent(new Event(onCloseEvent));
    };
  }, [isLocked, onOpenEvent, onCloseEvent, onUnlock]);
}

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

      // If there's a pending scroll target, dispatch after Lenis restarts
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
