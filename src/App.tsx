import React, { useCallback } from 'react';
import { Scene } from './components/Scene';
import { Controls } from './components/Controls';

function App() {
  const handleSave = useCallback(() => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'zenauth-hologram.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  }, []);

  return (
    <div className="w-full h-screen bg-black text-white">
      <Scene />
      <Controls onSave={handleSave} />
      
      <div className="fixed top-6 left-1/2 -translate-x-1/2 text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-blue-500 
                     bg-clip-text text-transparent">
          ZENAuth Dynamic 3D Holographic Key Visualizer
        </h1>
      </div>
    </div>
  );
}

export default App;