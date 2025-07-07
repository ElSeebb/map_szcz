//import { places } from '../date/marker.js';
import { map } from '../js/map.js';

export let currentOpenPlace = null;

function centerMapWithOffset(latlng, offsetX = 0, offsetY = 0) {
	const point = map.project(latlng, map.getZoom()).subtract([offsetX, offsetY]);
	const newLatLng = map.unproject(point, map.getZoom());
	map.panTo(newLatLng, { animate: true });
}

//console.log('places:', places);
const markers = {};
let activeMarker = null;

//ikony markerów

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

//generator markerów

function generateMarkers(places) {
	places.forEach((place) => {
		const marker = L.marker(place.coords, { icon: defaultIcon }).addTo(map);
		markers[place.id] = marker;

		marker.on('click', () => {
			handlePlaceClick(place);
		});

		marker.bindTooltip(place.title, {
			permanent: false,
			direction: 'top',
			offset: [0, -30],
			opacity: 0.7,
		});
	});
}

//panel

export function openPanel(panel, place) {
	
	panel.classList.add('aktywny');
	
	let currentImg = 0;
	const images = Array.isArray(place.img)
	? place.img
	: [{ src: place.img, author: place.author || 'brak danych' }];
	
	currentOpenPlace = place;

	panel.innerHTML = `
		<div class="image-carousel">
    		${
					images.length > 1
						? '<button class="arrow left"><img src="./img/icon/chevron-left.svg" alt=""></button>'
						: ''
				}
    
    		<div class="img-wrapper">
      			<img class="carousel-img" src="${images[0].src}" />
				  </div>
				  
				  ${
						images.length > 1
							? '<button class="arrow right"><img src="./img/icon/chevron-right.svg" alt=""></button>'
							: ''
					}
				  </div>
      			<p class="img-author">autor: ${images[0].author}</p>

		<h2>${place.title}</h2> 
		<p>${place.address}</p>
		<p>${place.description}</p>
		<button id="zamknij-btn">Zamknij</button>
	`;

	// zmiana zdjęć - karuzela
	if (images.length > 1) {
		const imgEl = panel.querySelector('.carousel-img');
		const authorEl = panel.querySelector('.img-author');

		panel.querySelector('.arrow.left').addEventListener('click', () => {
			currentImg = (currentImg - 1 + images.length) % images.length;
			imgEl.src = images[currentImg].src;
			authorEl.textContent = `autor: ${images[currentImg].author}`;
		});

		panel.querySelector('.arrow.right').addEventListener('click', () => {
			currentImg = (currentImg + 1) % images.length;
			imgEl.src = images[currentImg].src;
			authorEl.textContent = `autor: ${images[currentImg].author}`;
		});
	}

	// zamykanie panelu
	document.getElementById('zamknij-btn').addEventListener('click', () => {
		panel.classList.remove('aktywny');
		if (activeMarker) {
			activeMarker.setIcon(defaultIcon);
			activeMarker.setZIndexOffset(0);
			activeMarker = null;
		}
		currentOpenPlace = null;
	});
}

function handlePlaceClick(place) {
	const panel = document.getElementById('panel');
	const marker = markers[place.id];

	if (!marker) return;

	// widok mapy
	const isMobile = window.innerWidth < 768;

	if (isMobile) {
		centerMapWithOffset(place.coords, -110, 0);
	} else {
		map.setView(place.coords);
	}

	// reset markera
	if (activeMarker && activeMarker !== marker) {
		activeMarker.setIcon(defaultIcon);
		activeMarker.setZIndexOffset(0);
	}

	// aktywny marker
	marker.setIcon(activeIcon);
	marker.setZIndexOffset(1000);
	activeMarker = marker;

	// podświetlanie przycisku z listy
	document.querySelectorAll('.emblem-btn').forEach((btn) => {
		const id = parseInt(btn.dataset.id);
		const isActive = id === place.id;
		btn.classList.toggle('active', isActive);

		if (isActive) {
			btn.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
				inline: 'nearest',
			});
		}
	});

	// otwarcie panelu
	if (panel.classList.contains('aktywny')) {
		panel.classList.remove('aktywny');
		setTimeout(() => openPanel(panel, place), 200);
	} else {
		openPanel(panel, place);
	}
}

export { generateMarkers, markers, defaultIcon, activeIcon, handlePlaceClick };
