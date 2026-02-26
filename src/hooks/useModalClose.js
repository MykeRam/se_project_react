import { useEffect } from "react";

export default function useModalClose(isOpen, onClose) {
  useEffect(() => {
    if (!isOpen) return;

    function handleEscape(evt) {
      if (evt.key === "Escape") onClose();
    }

    function handleOverlayClick(evt) {
      if (evt.target.classList.contains("modal")) onClose();
    }

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleOverlayClick);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOverlayClick);
    };
  }, [isOpen, onClose]);
}