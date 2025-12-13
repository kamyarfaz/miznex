"use client";

import { useEffect, useState } from "react";

interface ModalProps {
  onClose: () => void;
  modalContent: any;
  color: string;
  position?: "center" | "bottom";
}

export default function Modal({
  onClose,
  modalContent,
  color,
  position,
}: ModalProps) {
  const [isVisible, setIsVisible] = useState(false);

useEffect(() => {
  setIsVisible(true);
  document.body.style.overflow = "hidden";

  return () => {
    document.body.style.overflow = "";
  };
}, []);

  return (
    <>
      {position == "bottom" ? (
        <>
          <div
            className="fixed top-0 bottom-0 right-0 left-0 z-40 bg-black bg-blend-overlay opacity-50"
            onClick={onClose}
          />
          <div className="fixed inset-0 flex items-end justify-center pointer-events-none z-50">
            <div
              className={`${color} w-full max-w-lg rounded-t-3xl shadow-2xl pointer-events-auto transition-all duration-700 ease-out transform ${
                isVisible ? "translate-y-0" : "translate-y-[500px]"
              }`}
            >
              <div className="flex justify-center pt-3 pb-6">
                <div className="w-12 h-1 bg-i-primary rounded-full" />
              </div>

              {modalContent}
            </div>
          </div>
        </>
      ) : position == "center" ? (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          onClick={onClose}
        >
          <div
            className="bg-white rounded-xl p-4 m-4"
            onClick={(e) => e.stopPropagation()}
          >
            {modalContent}
          </div>
        </div>
      ) : null}
    </>
  );
}
