"use client"

import { useEffect, useState } from "react"

interface ModalProps {
  onClose: () => void
  modalContent: any
  color: string
}

export default function Modal({ onClose, modalContent, color }: ModalProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <>
      <div className="fixed top-0 bottom-0 right-0 left-0 z-40 bg-black bg-blend-overlay opacity-50 cursor-pointer" onClick={onClose} />
      <div className="fixed inset-0 flex items-end justify-center pointer-events-none z-50">
        <div
          className={`${color} w-full max-w-md rounded-t-3xl shadow-2xl pointer-events-auto transition-all duration-700 ease-out transform ${
            isVisible ? "translate-y-0" : "translate-y-96"
          }`}
        >
          {/* Top Handle Indicator */}
          <div className="flex justify-center pt-3 pb-6">
            <div className="w-12 h-1 bg-gray-800 rounded-full" />
          </div>

          {/* Content */}
          {modalContent}
      </div>
    </div>
    </>
  )
}
