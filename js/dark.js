const toggleBtn = document.getElementById('theme-toggle');
const overlay = document.getElementById('night-overlay');
const body = document.body;

// przywraca stan z loclaStorage
if (localStorage.getItem('theme') === 'night') {
	overlay.classList.add('visible');
	overlay.classList.remove('hidden');
	body.classList.add('dark-mode');
	toggleBtn.textContent = 'Tryb dzienny';
}

toggleBtn.addEventListener('click', () => {
	const isNight = overlay.classList.contains('visible');

	if (isNight) {
		overlay.classList.remove('visible');
		overlay.classList.add('hidden');
		body.classList.remove('dark-mode');
		toggleBtn.textContent = 'Tryb nocny';
		localStorage.setItem('theme', 'light');
	} else {
		overlay.classList.add('visible');
		overlay.classList.remove('hidden');
		body.classList.add('dark-mode');
		toggleBtn.textContent = 'Tryb dzienny';
		localStorage.setItem('theme', 'night');
	}
});