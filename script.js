// Get elements
const inputText = document.getElementById("inputText");
const voiceSelect = document.getElementById("voiceSelect");
const rate = document.getElementById("rate");
const pitch = document.getElementById("pitch");
const rateVal = document.getElementById("rateVal");
const pitchVal = document.getElementById("pitchVal");

const speakBtn = document.getElementById("speakBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resumeBtn = document.getElementById("resumeBtn");
const cancelBtn = document.getElementById("cancelBtn");

let voices = [];

// Load voices
function populateVoices() {
  voices = speechSynthesis.getVoices();
  voiceSelect.innerHTML = "";
  voices.forEach((voice, i) => {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });
}

speechSynthesis.onvoiceschanged = populateVoices;

// Update display values
rate.addEventListener("input", () => (rateVal.textContent = rate.value));
pitch.addEventListener("input", () => (pitchVal.textContent = pitch.value));

// Speak function
function speakText() {
  const text = inputText.value.trim();
  if (!text) {
    alert("Please enter some text to speak.");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  const selectedVoice = voices[voiceSelect.value];
  if (selectedVoice) utterance.voice = selectedVoice;
  utterance.rate = parseFloat(rate.value);
  utterance.pitch = parseFloat(pitch.value);

  utterance.onstart = () => (speakBtn.textContent = "Speaking...");
  utterance.onend = () => (speakBtn.textContent = "🔊 Speak");

  speechSynthesis.speak(utterance);
}

// Buttons
speakBtn.addEventListener("click", speakText);
pauseBtn.addEventListener("click", () => {
  if (speechSynthesis.speaking && !speechSynthesis.paused) {
    speechSynthesis.pause();
  }
});
resumeBtn.addEventListener("click", () => {
  if (speechSynthesis.paused) {
    speechSynthesis.resume();
  }
});
cancelBtn.addEventListener("click", () => {
  speechSynthesis.cancel();
});
