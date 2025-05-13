import { useEffect } from "react";
import { createPortal } from "react-dom";

interface BackDropProps {
  onClose: () => void;
}

const BackDrop = ({ onClose }: BackDropProps) => {
  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 z-10"
      onClick={onClose}
    ></div>
  );
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  });

  if (!isOpen) return null;
  return createPortal(
    <>
      <BackDrop onClose={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        {children}
      </div>
    </>,
    document.getElementById("modal") as HTMLElement
  );
};

export default Modal;
