import { places } from '../date/marker.js';
import { map } from '../js/map.js';

const defaultIcon = L.icon({
	iconUrl: './img/icon/inactive-pin.svg',
	iconSize: [25, 35],
 	iconAnchor: [12, 35],
	popupAnchor: [1, -34],
	
});

const activeIcon = L.icon({
	iconUrl: './img/icon/active-pin.svg',
	iconSize: [28, 38],
	iconAnchor: [12, 35],
	popupAnchor: [1, -34],
	
});



const markers = {}; // przechowuje wszystkie markery
let activeMarker = null;

places.forEach((place) => {
	const marker = L.marker(place.coords, { icon: defaultIcon }).addTo(map);
	markers[place.id] = marker;

	marker.on('click', () => {
		const panel = document.getElementById('panel');

		// zmiana ikony aktywnego markera
		if (activeMarker && activeMarker !== marker) {
			activeMarker.setIcon(defaultIcon);
		}
		marker.setIcon(activeIcon);
		activeMarker = marker;

		// animacja zamykania i otwierania panelu
		if (panel.classList.contains('aktywny')) {
			panel.classList.remove('aktywny');
			setTimeout(() => {
				openPanel(panel, place);
			}, 200);
		} else {
			openPanel(panel, place);
		}
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
			activeMarker = null;
		}
	});
}

// kliknięcie poza panelem
document.addEventListener('click', (e) => {
	const panel = document.getElementById('panel');
	const isMarker = e.target.closest('.leaflet-marker-icon, .leaflet-interactive');
	const isPanel = panel.contains(e.target);

	if (panel.classList.contains('aktywny') && !isMarker && !isPanel) {
		panel.classList.remove('aktywny');
		if (activeMarker) {
			activeMarker.setIcon(defaultIcon);
			activeMarker = null;
		}
	}
});

export { markers, activeMarker, defaultIcon, activeIcon, openPanel };

