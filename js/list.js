//import { places } from '../date/marker.js';
import { handlePlaceClick } from './markerGen.js';
import { getSortedPlacesWithId } from './sort.js';
const places = getSortedPlacesWithId();
console.log('places:', places);

let emblemsHTML = '';

places.forEach((place) => {
	emblemsHTML += `
        <button class="emblem-btn" data-id="${place.id}">
			<div class="emblem-btn-symbol">
				<img src="${place.symbol}" style="width: 100%;" />
			</div>
			<div class="emblem-btn-name"><p>${place.title}</p></div>
		</button>
    `;
});

document.querySelector('.emblem-list-box').innerHTML = emblemsHTML;

document.querySelectorAll('.emblem-btn').forEach((btn) => {
	btn.addEventListener('click', () => {
		const id = parseInt(btn.dataset.id);
		const place = places.find((p) => p.id === id);
		if (place) handlePlaceClick(place);

		//zamykanie menu
		const listBox = document.getElementById('emblem-list');
		if (listBox && listBox.classList.contains('active')) {
			listBox.classList.remove('active');
		}
	});
});

document.addEventListener('click', (e) => {
	const listBox = document.getElementById('emblem-list');
	const burgerBtn = document.getElementById('burger-btn');

	const clickedOutsideList = !listBox.contains(e.target);
	const clickedOutsideBurger = !burgerBtn.contains(e.target);

	if (listBox.classList.contains('active') && clickedOutsideList && clickedOutsideBurger) {
		listBox.classList.remove('active');
	}
});
