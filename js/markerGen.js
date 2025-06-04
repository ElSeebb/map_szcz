import { places } from '../date/marker.js';
import { map } from '../js/map.js';

const markers = {};
let activeMarker = null;

const defaultIcon = L.icon({
	iconUrl: './img/icon/inactive-pin.svg',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
});

const activeIcon = L.icon({
	iconUrl: './img/icon/active-pin.svg',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
});

places.forEach((place) => {
	const marker = L.marker(place.coords, { icon: defaultIcon }).addTo(map);
	markers[place.id] = marker;

	marker.on('click', () => {
		handlePlaceClick(place);
	});
});

function openPanel(panel, place) {
	panel.innerHTML = `
		<img src="${place.img}" alt="Tablica ${place.title}" style="width: 100%; height: auto; border-radius: 8px;">
		<h2>${place.title}</h2> 
		<p>${place.address}</p>
		<p>${place.description}</p>
		<button id="zamknij-btn">Zamknij</button>
	`;
	panel.classList.add('aktywny');

	document.getElementById('zamknij-btn').addEventListener('click', () => {
		panel.classList.remove('aktywny');
		if (activeMarker) {
			activeMarker.setIcon(defaultIcon);
			activeMarker.setZIndexOffset(0);
			activeMarker = null;
		}
	});
}

function handlePlaceClick(place) {
	const panel = document.getElementById('panel');
	const marker = markers[place.id];

	if (!marker) return;

	// widok mapy
	map.setView(place.coords, 15);

	// reset markera
	if (activeMarker && activeMarker !== marker) {
		activeMarker.setIcon(defaultIcon);
		activeMarker.setZIndexOffset(0);
	}

	// aktywny marker
	marker.setIcon(activeIcon);
	marker.setZIndexOffset(1000);
	activeMarker = marker;

	//podświetlanie przycisku z listy
	document.querySelectorAll('.emblem-btn').forEach((btn) => {
		const id = parseInt(btn.dataset.id);
		btn.classList.toggle('active', id === place.id);
	});

	// otwarcie panelu
	if (panel.classList.contains('aktywny')) {
		panel.classList.remove('aktywny');
		setTimeout(() => openPanel(panel, place), 200);
	} else {
		openPanel(panel, place);
	}
}

export { markers, defaultIcon, activeIcon, handlePlaceClick };
