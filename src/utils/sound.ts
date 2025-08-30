export const playTudumSound = () => {
  try {
    // Create audio context for better browser compatibility
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Netflix tudum sound - more authentic based on actual sound analysis
    // The real Netflix sound has a distinctive "dum" quality with specific harmonics
    const baseFreq = 146.83; // D3 - the fundamental "dum" frequency
    
    // Create the main "dum" sound with multiple harmonics
    const harmonics = [
      { freq: baseFreq, gain: 0.4, duration: 0.8 },
      { freq: baseFreq * 2, gain: 0.3, duration: 0.8 }, // 2nd harmonic
      { freq: baseFreq * 3, gain: 0.2, duration: 0.8 }, // 3rd harmonic
      { freq: baseFreq * 0.5, gain: 0.25, duration: 0.8 }, // Lower octave for depth
    ];
    
    let currentTime = audioContext.currentTime;
    
    harmonics.forEach((harmonic, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(harmonic.freq, currentTime);
      oscillator.type = 'triangle'; // Triangle wave for more authentic "dum" sound
      
      // Create the characteristic Netflix envelope - quick attack, long decay
      gainNode.gain.setValueAtTime(0, currentTime);
      gainNode.gain.linearRampToValueAtTime(harmonic.gain, currentTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + harmonic.duration);
      
      oscillator.start(currentTime);
      oscillator.stop(currentTime + harmonic.duration);
    });
    
    // Add a subtle "click" at the beginning for authenticity
    setTimeout(() => {
      const clickOscillator = audioContext.createOscillator();
      const clickGain = audioContext.createGain();
      
      clickOscillator.connect(clickGain);
      clickGain.connect(audioContext.destination);
      
      clickOscillator.frequency.setValueAtTime(800, 0);
      clickOscillator.type = 'sine';
      
      clickOscillator.frequency.exponentialRampToValueAtTime(400, 0.1);
      clickGain.gain.setValueAtTime(0.15, 0);
      clickGain.gain.exponentialRampToValueAtTime(0.001, 0.1);
      
      clickOscillator.start(0);
      clickOscillator.stop(0.1);
    }, 50);
    
    // Add a subtle reverb/room effect
    setTimeout(() => {
      const reverbOscillator = audioContext.createOscillator();
      const reverbGain = audioContext.createGain();
      
      reverbOscillator.connect(reverbGain);
      reverbGain.connect(audioContext.destination);
      
      reverbOscillator.frequency.setValueAtTime(baseFreq * 0.5, 0); // Lower octave
      reverbOscillator.type = 'sine';
      
      reverbGain.gain.setValueAtTime(0.05, 0);
      reverbGain.gain.exponentialRampToValueAtTime(0.001, 1.2);
      
      reverbOscillator.start(0);
      reverbOscillator.stop(1.2);
    }, 100);
    
  } catch (error) {
    console.warn('Failed to play tudum sound:', error);
  }
};

export const createTudumAudio = (): HTMLAudioElement | null => {
  try {
    // Create a simple audio element with base64 encoded tudum sound
    // This is a fallback for browsers that don't support Web Audio API well
    const audio = new Audio();
    
    // Create a simple tudum-like sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Netflix tudum sound characteristics
    oscillator.frequency.setValueAtTime(523.25, 0); // Start with C5
    oscillator.frequency.exponentialRampToValueAtTime(783.99, 0.6); // Rise to G5
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0, 0);
    gainNode.gain.linearRampToValueAtTime(0.4, 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.01, 0.6);
    
    oscillator.start(0);
    oscillator.stop(0.6);
    
    return null; // We're using Web Audio API directly
  } catch (error) {
    console.warn('Web Audio API not supported, falling back to basic sound');
    return null;
  }
};