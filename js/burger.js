const burgerBtn = document.getElementById('burger-btn');
const listBox = document.getElementById('emblem-list');
const panel = document.getElementById('panel');

burgerBtn.addEventListener('click', () => {
	// otwieranie/zamykanie listy
	listBox.classList.toggle('active');

	// jeśli panel jest otwarty — zamknij
	if (panel.classList.contains('aktywny')) {
		panel.classList.remove('aktywny');
	}
});