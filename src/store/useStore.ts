import { create } from 'zustand';

interface HologramState {
  currentKey: string;
  currentPhrase: string;
  hologramColor: string;
  particleCount: number;
  hologramOpacity: number;
  rotationSpeed: number;
  generateKey: () => void;
  setHologramColor: (color: string) => void;
  setParticleCount: (count: number) => void;
  setHologramOpacity: (opacity: number) => void;
  setRotationSpeed: (speed: number) => void;
}

const generateAlphanumericPhrase = (key: string): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let phrase = '';
  for (let i = 0; i < 12; i++) {
    const index = parseInt(key.substr(i * 2, 2), 36) % chars.length;
    phrase += chars[index];
  }
  return phrase;
};

export const useStore = create<HologramState>((set) => ({
  currentKey: '',
  currentPhrase: '',
  hologramColor: '#00ffff',
  particleCount: 10000,
  hologramOpacity: 0.5,
  rotationSpeed: 0.001,

  generateKey: () => {
    const newKey = Math.random().toString(36).substring(2, 15) + 
                  Math.random().toString(36).substring(2, 15);
    const newPhrase = generateAlphanumericPhrase(newKey);
    
    const color = `#${newKey.substr(0, 6)}`;
    
    set({
      currentKey: newKey,
      currentPhrase: newPhrase,
      hologramColor: color,
    });
  },

  setHologramColor: (color: string) => set({ hologramColor: color }),
  setParticleCount: (count: number) => set({ particleCount: count }),
  setHologramOpacity: (opacity: number) => set({ hologramOpacity: opacity }),
  setRotationSpeed: (speed: number) => set({ rotationSpeed: speed }),
}));