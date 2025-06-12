const toggleBtn = document.getElementById('theme-toggle');
const overlay = document.getElementById('night-overlay');

// przywrócenie stanu z localStorage
if (localStorage.getItem('theme') === 'night') {
	overlay.classList.remove('day');
	toggleBtn.textContent = 'Tryb dzienny';
}

toggleBtn.addEventListener('click', () => {
	const isActive = !overlay.classList.contains('day');

	if (isActive) {
		overlay.classList.add('day');
		toggleBtn.textContent = 'Tryb nocny';
		localStorage.setItem('theme', 'light');
	} else {
		overlay.classList.remove('day');
		toggleBtn.textContent = 'Tryb dzienny';
		localStorage.setItem('theme', 'night');
	}
});