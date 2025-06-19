import { handlePlaceClick } from './markerGen.js';
import { getSortedPlacesWithId } from './sort.js';
const places = getSortedPlacesWithId();

let currentSortMode = 'title';
let currentSearchQuery = '';

//porównanie nuumerów
function compareHouseNumbers(a, b) {
	const aNum = extractHouseNumber(a.address);
	const bNum = extractHouseNumber(b.address);
	return aNum.localeCompare(bNum, undefined, {
		numeric: true,
		sensitivity: 'base',
	});
}

//wyciągnaie numerów
function extractHouseNumber(addressHTML) {
	const match = addressHTML.match(/<b>Adres:<\/b>\s*[^<]*?(\d+[a-zA-Z]?)/i);
	return match ? match[1].toLowerCase() : '';
}

///wyciągniae ulic
function extractStreet(addressHTML) {
	const match = addressHTML.match(/<b>Adres:<\/b>\s*([^0-9<]+)/i);
	return match ? match[1].trim() : 'Inna ulica';
}

//generator listy
function generateList({ sortMode = 'title', filter = '' } = {}) {
	let html = '';

	//wyszukiwarka
	const filtered = places.filter((place) =>
		place.title.toLowerCase().includes(filter.toLowerCase())
	);

	//sortowanie
	if (sortMode === 'title') {
		const sorted = [...filtered].sort((a, b) => a.title.localeCompare(b.title));

		sorted.forEach((place) => {
			html += `
				<button class="emblem-btn" data-id="${place.id}">
					<div class="emblem-btn-symbol">
						<img src="${place.symbol}" style="width: 100%;" />
					</div>
					<div class="emblem-btn-name"><p>${place.title}</p></div>
				</button>
			`;
		});
	} else if (sortMode === 'street') {
		const groupedByStreet = {};

		filtered.forEach((place) => {
			const street = extractStreet(place.address);
			if (!groupedByStreet[street]) {
				groupedByStreet[street] = [];
			}
			groupedByStreet[street].push(place);
		});

		Object.keys(groupedByStreet)
			.sort((a, b) => a.localeCompare(b))
			.forEach((street) => {
				html += `
					<div class="street-group">
						<h3 class="street-heading" data-street="${street}">
							<span class="arrow-icon">+</span> ${street}
						</h3>
					<div class="street-list hidden" data-list="${street}">
					`;

				groupedByStreet[street].sort(compareHouseNumbers).forEach((place) => {
					html += `
					<button class="emblem-btn" data-id="${place.id}">
						<div class="emblem-btn-number">${extractHouseNumber(place.address)}</div>
						<div class="emblem-btn-symbol">
							<img src="${place.symbol}" style="width: 100%;" />
						</div>
						<div class="emblem-btn-name"><p>${place.title}</p></div>
					</button>
				`;
				});

				html += `</div></div>`; // zamykamy .street-list i .street-group
			});
	}

	document.querySelector('.emblem-list-box').innerHTML = html;

	// chowanie listy po kliknięciu na przycisk
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
	// obsługa rozwijania grup ulic
	document.querySelectorAll('.street-heading').forEach((heading) => {
		heading.addEventListener('click', () => {
			const street = heading.dataset.street;
			const list = document.querySelector(
				`.street-list[data-list="${street}"]`
			);
			const icon = heading.querySelector('.arrow-icon');

			const isHidden = list.classList.contains('hidden');
			list.classList.toggle('hidden');

			// zmień ikonę + −
			icon.textContent = isHidden ? '−' : '+';
		});
	});

}

// obsługa sortowania
document.querySelectorAll('input[name="sort-mode"]').forEach((input) => {
	input.addEventListener('change', () => {
		currentSortMode = input.value;
		generateList({ sortMode: currentSortMode, filter: currentSearchQuery });
	});
});

// obsługa wyszukiwania
document.getElementById('search-input').addEventListener('input', (e) => {
	currentSearchQuery = e.target.value;
	generateList({ sortMode: currentSortMode, filter: currentSearchQuery });
});

// start funkcji
generateList({ sortMode: currentSortMode, filter: currentSearchQuery });

// chowanie listy po kliknięciu poza
document.addEventListener('click', (e) => {
	const listBox = document.getElementById('emblem-list');
	const burgerBtn = document.getElementById('burger-btn');

	const clickedOutsideList = !listBox.contains(e.target);
	const clickedOutsideBurger = !burgerBtn.contains(e.target);

	if (
		listBox.classList.contains('active') &&
		clickedOutsideList &&
		clickedOutsideBurger
	) {
		listBox.classList.remove('active');
	}
});
