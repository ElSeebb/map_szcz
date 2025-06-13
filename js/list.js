//import { places } from '../date/marker.js';
import { handlePlaceClick } from './markerGen.js';
import { getSortedPlacesWithId } from './sort.js';
const places = getSortedPlacesWithId();

function generateList(filter = '') {
	const filtered = places.filter((place) => {
		const title = (place.title || '').toLowerCase();
		return title.includes(filter.toLowerCase().trim());
	});

	let emblemsHTML = '';

	if (filtered.length === 0) {
		emblemsHTML = '<p class="no-results">Brak wyników.</p>';
	} else {
		filtered.forEach((place) => {
			emblemsHTML += `
				<button class="emblem-btn" data-id="${place.id}">
					<div class="emblem-btn-symbol">
						<img src="${place.symbol}" style="width: 100%;" />
					</div>
					<div class="emblem-btn-name"><p>${place.title}</p></div>
				</button>
			`;
		});
	}

	document.querySelector('.emblem-list-box').innerHTML = emblemsHTML;

	// przypięcie kliknięć
	document.querySelectorAll('.emblem-btn').forEach((btn) => {
		btn.addEventListener('click', () => {
			const id = parseInt(btn.dataset.id);
			const place = places.find((p) => p.id === id);
			if (place) handlePlaceClick(place);
		});
	});

	
}

document.getElementById('search-input').addEventListener('input', (e) => {
	const query = e.target.value;
	generateList(query);
});

generateList()


//zamykanie listy po kliknięciu przycisku
document.querySelectorAll('.emblem-btn').forEach((btn) => {
	btn.addEventListener('click', () => {
		const id = parseInt(btn.dataset.id);
		const place = places.find((p) => p.id === id);
		if (place) handlePlaceClick(place);

		const listBox = document.getElementById('emblem-list');
		if (listBox && listBox.classList.contains('active')) {
			listBox.classList.remove('active');
		}
	});
});

// zamykanie listy po kliknięciu poza
document.addEventListener('click', (e) => {
	const listBox = document.getElementById('emblem-list');
	const burgerBtn = document.getElementById('burger-btn');

	const clickedOutsideList = !listBox.contains(e.target);
	const clickedOutsideBurger = !burgerBtn.contains(e.target);

	if (listBox.classList.contains('active') && clickedOutsideList && clickedOutsideBurger) {
		listBox.classList.remove('active');
	}
});