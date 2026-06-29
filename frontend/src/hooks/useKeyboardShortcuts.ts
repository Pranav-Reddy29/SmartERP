"use client";

import { useEffect } from "react";

interface KeyboardShortcuts {
  onCreateLedger?: () => void;
  onCreateGroup?: () => void;
  onEditLedger?: () => void;
  onHome?: () => void;
  onLogout?: () => void;
  onCreateCategory?: () => void;
  onCreateUnit?: () => void;
  onCreateProduct?: () => void;
  onCreatePurchase?: () => void;
}

export default function useKeyboardShortcuts({
  onCreateLedger,
  onCreateGroup,
  onEditLedger,
  onHome,
  onLogout,
  onCreateCategory,
  onCreateUnit,
  onCreateProduct,
  onCreatePurchase,
}: KeyboardShortcuts) {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;

      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT"
      ) return;

      if (event.altKey && event.key.toLowerCase() === "l") {
        event.preventDefault();
        onCreateLedger?.();
      }

      if (event.altKey && event.key.toLowerCase() === "g") {
        event.preventDefault();
        onCreateGroup?.();
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

      if (event.altKey && event.key.toLowerCase() === "c") {
        event.preventDefault();
        onCreateCategory?.();
      }

      if (event.altKey && event.key.toLowerCase() === "u") {
        event.preventDefault();
        onCreateUnit?.();
      }

      if (event.altKey && event.key.toLowerCase() === "p") {
        event.preventDefault();
        onCreateProduct?.();
      }

      if (event.altKey && event.shiftKey && event.key.toLowerCase() === "p") {
        event.preventDefault();
        onCreatePurchase?.();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [
    onCreateLedger,
    onCreateGroup,
    onEditLedger,
    onHome,
    onLogout,
    onCreateCategory,
    onCreateUnit,
    onCreateProduct,
    onCreatePurchase,
  ]);
}
