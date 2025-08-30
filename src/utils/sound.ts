export const playTudumSound = () => {
  try {
    // Create audio context for better browser compatibility
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Netflix tudum sound - more authentic frequencies and timing
    // The actual Netflix sound is more complex, but this captures the essence
    const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const durations = [0.2, 0.2, 0.3, 0.4]; // Shorter, more punchy notes
    
    let currentTime = audioContext.currentTime;
    
    frequencies.forEach((frequency, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(frequency, currentTime);
      oscillator.type = 'sine';
      
      // Create a more punchy envelope for the Netflix feel
      gainNode.gain.setValueAtTime(0, currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, currentTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + durations[index]);
      
      oscillator.start(currentTime);
      oscillator.stop(currentTime + durations[index]);
      
      currentTime += durations[index];
    });
    
    // Add a subtle echo/reverb effect that's characteristic of the Netflix sound
    setTimeout(() => {
      const echoOscillator = audioContext.createOscillator();
      const echoGain = audioContext.createGain();
      
      echoOscillator.connect(echoGain);
      echoGain.connect(audioContext.destination);
      
      echoOscillator.frequency.setValueAtTime(783.99, 0); // G5
      echoOscillator.type = 'sine';
      
      echoGain.gain.setValueAtTime(0.08, 0);
      echoGain.gain.exponentialRampToValueAtTime(0.001, 0.6);
      
      echoOscillator.start(0);
      echoOscillator.stop(0.6);
    }, 500);
    
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