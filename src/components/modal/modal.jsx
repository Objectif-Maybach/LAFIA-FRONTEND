import React, { useState } from 'react';
import { X } from "lucide-react";

const Modal = ({ title, discribe, onClose, children }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md md:max-w-xl mx-4 overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b">
                    <div>
                        <h3 className="text-lg font-medium">{title}  </h3>
                        <p className="text-sm text-gray-500">{discribe} </p>
                    </div>
                    <button onClick={() => onClose()} className="text-gray-500 hover:text-gray-700">
                        <X size={20} />
                    </button>
                </div>
                
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    )
}
export default Modal;