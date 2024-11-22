import React from 'react';
import { Download, Key } from 'lucide-react';
import { useStore } from '../store/useStore';

interface ControlsProps {
  onSave: () => void;
}

export const Controls: React.FC<ControlsProps> = ({ onSave }) => {
  const { generateKey, currentKey, currentPhrase } = useStore();

  return (
    <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
      <div className="max-w-4xl mx-auto">
        {currentKey && (
          <div className="mb-4 text-center">
            <p className="text-cyan-300 font-mono">
              Key: {currentKey}
            </p>
            <p className="text-cyan-400 font-mono text-xl mt-1">
              Phrase: {currentPhrase}
            </p>
          </div>
        )}
        
        <div className="flex justify-center gap-4">
          <button
            onClick={generateKey}
            className="flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 
                     text-black font-semibold rounded-lg transition-colors"
          >
            <Key size={20} />
            Generate Key
          </button>
          
          <button
            onClick={onSave}
            className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 
                     text-white font-semibold rounded-lg transition-colors"
          >
            <Download size={20} />
            Save Image
          </button>
        </div>
      </div>
    </div>
  );
};