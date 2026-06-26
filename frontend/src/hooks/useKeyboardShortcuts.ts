"use client";

import { useEffect } from "react";

interface KeyboardShortcuts {
  onCreateLedger?: () => void;
  onEditLedger?: () => void;
  onHome?: () => void;
  onLogout?: () => void;
}

export default function useKeyboardShortcuts({
  onCreateLedger,
  onEditLedger,
  onHome,
  onLogout,
}: KeyboardShortcuts) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {

      // Ignore shortcuts while typing
      const target = event.target as HTMLElement;

      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT"
      ) {
        return;
      }

      if (event.altKey && event.key.toLowerCase() === "l") {
        event.preventDefault();
        onCreateLedger?.();
      }

      if (event.altKey && event.key.toLowerCase() === "a") {
        event.preventDefault();
        onEditLedger?.();
      }

      if (event.ctrlKey && event.key.toLowerCase() === "h") {
        event.preventDefault();
        onHome?.();
      }

      if (event.ctrlKey && event.key.toLowerCase() === "q") {
        event.preventDefault();
        onLogout?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    onCreateLedger,
    onEditLedger,
    onHome,
    onLogout,
  ]);
}