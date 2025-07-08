import { getTranslation } from './lang.js';

const toggleBtn = document.getElementById('theme-toggle');
const toggleBtnLabel = document.getElementById('dark-mode-btn');
const overlay = document.getElementById('night-overlay');
const body = document.body;

// przywraca stan z localStorage
if (localStorage.getItem('theme') === 'night') {
    overlay.classList.add('visible');
    overlay.classList.remove('hidden');
    body.classList.add('dark-mode');
    toggleBtnLabel.textContent = getTranslation('darkModeOff');
} else {
    toggleBtnLabel.textContent = getTranslation('darkModeOn');
}

toggleBtn.addEventListener('click', () => {
    const isNight = overlay.classList.contains('visible');

    if (isNight) {
        overlay.classList.remove('visible');
        overlay.classList.add('hidden');
        body.classList.remove('dark-mode');
        toggleBtnLabel.textContent = getTranslation('darkModeOn');
        localStorage.setItem('theme', 'light');
    } else {
        overlay.classList.add('visible');
        overlay.classList.remove('hidden');
        body.classList.add('dark-mode');
        toggleBtnLabel.textContent = getTranslation('darkModeOff');
        localStorage.setItem('theme', 'night');
    }
});