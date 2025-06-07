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
	});
});
