export function playTudumSound(volume: number = 0.5) {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') return;

  try {
    // Create audio context
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Create oscillator for the main tone
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Set frequency and type for a tudum-like sound
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.3);
    oscillator.type = 'sine';
    
    // Set volume
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
    
    // Start and stop
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
    
    // Add a second harmonic for richness
    setTimeout(() => {
      const harmonic = audioContext.createOscillator();
      const harmonicGain = audioContext.createGain();
      
      harmonic.connect(harmonicGain);
      harmonicGain.connect(audioContext.destination);
      
      harmonic.frequency.setValueAtTime(1200, audioContext.currentTime);
      harmonic.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.2);
      harmonic.type = 'sine';
      
      harmonicGain.gain.setValueAtTime(0, audioContext.currentTime);
      harmonicGain.gain.linearRampToValueAtTime(volume * 0.3, audioContext.currentTime + 0.05);
      harmonicGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2);
      
      harmonic.start(audioContext.currentTime);
      harmonic.stop(audioContext.currentTime + 0.2);
    }, 50);
    
  } catch (error) {
    console.warn('Could not play tudum sound:', error);
  }
}