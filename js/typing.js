let texts = [];
let currentTextIndex = 0;
let currentCharIndex = 0;
let typingTimeout;

const typingText = document.getElementById('typing-text');

export function setTexts(newTexts) {
  texts = newTexts;
}

function typeWriter() {
  clearTimeout(typingTimeout);

  if (currentCharIndex < texts[currentTextIndex].length) {
    typingText.textContent += texts[currentTextIndex].charAt(currentCharIndex);
    currentCharIndex++;
    typingTimeout = setTimeout(typeWriter, 100);
  } else {
    typingTimeout = setTimeout(deleteText, 2000);
  }
}

function deleteText() {
  clearTimeout(typingTimeout);

  if (currentCharIndex > 0) {
    typingText.textContent = texts[currentTextIndex].substring(0, currentCharIndex - 1);
    currentCharIndex--;
    typingTimeout = setTimeout(deleteText, 50);
  } else {
    currentTextIndex = (currentTextIndex + 1) % texts.length;
    typingTimeout = setTimeout(typeWriter, 500);
  }
}

export function resetTyping() {
  clearTimeout(typingTimeout);
  currentTextIndex = 0;
  currentCharIndex = texts[0].length;

  if (typingText) {
    typingText.textContent = texts[0];
    typingTimeout = setTimeout(deleteText, 2000);
  }
}

export function initTyping(initialTexts) {
  texts = initialTexts;
  typingTimeout = setTimeout(deleteText, 2000);
}