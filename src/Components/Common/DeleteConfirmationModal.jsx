import React from 'react';
import { AlertTriangle } from 'lucide-react';

function DeleteConfirmationModal({ isOpen, onClose, onConfirm, itemType }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center mb-4 text-amber-600">
          <AlertTriangle size={24} className="mr-2" />
          <h3 className="text-lg font-bold">Confirm Deletion</h3>
        </div>
        
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete this {itemType}? This action cannot be undone.
        </p>
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md transition-colors text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
