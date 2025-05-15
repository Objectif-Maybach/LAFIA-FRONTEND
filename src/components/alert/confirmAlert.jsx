import { X } from 'lucide-react';
import React, { useState } from 'react';
const ConfirAlert = ({ message, onConfirm, onCancel, id }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md md:max-w-xl mx-4 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h3 className="text-lg font-medium">
                {message}
                </h3>
              </div>
              <button onClick={() =>  onCancel() } className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <p>Êtes-vous sûr de vouloir supprimer cet élément ?</p>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => onCancel()}
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                >
                  <X size={18} className="mr-2" />
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={() => {onConfirm(id), onCancel()
                  }}
                  className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-700 transition-colors shadow-sm"
                >
                  Confirmer
                </button>
              </div>
            </div>
          </div>
        </div>
    );
}
export default ConfirAlert;