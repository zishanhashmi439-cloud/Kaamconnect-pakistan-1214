// Audio Voice Helper for Low-Literacy Pakistani Users (بول کر رہنمائی)

export const speakUrduOrEnglish = (textEn: string, textUr: string, currentLang: 'en' | 'ur' = 'ur') => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const textToSpeak = currentLang === 'ur' ? textUr : textEn;
  const utterance = new SpeechSynthesisUtterance(textToSpeak);

  // Set Urdu or Hindi/Arabic locale for natural pronunciation
  utterance.lang = currentLang === 'ur' ? 'ur-PK' : 'en-US';
  utterance.rate = 0.9; // Slightly slower for clear comprehension
  utterance.pitch = 1.0;

  window.speechSynthesis.speak(utterance);
};
