import React from "react";
import { X } from "lucide-react";

interface ErrorPopupProps {
  message: string;
  onClose: () => void;
}

const ErrorPopup: React.FC<ErrorPopupProps> = ({ message, onClose }) => {
  return (
    <div className="fixed top-4 right-4 max-w-md w-full bg-red-50 border-l-4 border-red-500 rounded-md shadow-lg">
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-1">
            <h3 className="text-red-800 font-medium mb-1">Error</h3>
            <div className="text-red-700 text-sm whitespace-pre-line">
              {message}
            </div>
          </div>
          <button
            onClick={onClose}
            className="ml-4 text-red-400 hover:text-red-500 focus:outline-none"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPopup;
