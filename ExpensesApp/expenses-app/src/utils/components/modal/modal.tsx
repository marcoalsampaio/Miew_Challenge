import React, { ReactNode } from "react";
import styles from "./modal.module.css"; // Add some basic styling for your modal

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          X
        </button>
        <div className={styles.modalContent}>{children}</div>
      </div>
    </div>
  );
}
