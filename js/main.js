const modal = document.getElementById('info-panel');
const closeBtn = document.getElementById('info-close-btn');


if (!localStorage.getItem('infoModalSeen')) {
    modal.classList.remove('hidden');
    localStorage.setItem('infoModalSeen', 'true');
}

closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
});