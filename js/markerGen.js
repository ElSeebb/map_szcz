//import { places } from '../date/marker.js';
import { map } from '../js/map.js';
import { getCloseBtnText } from './lang.js';
import { getTranslation } from './lang.js';

const closeBtnText = getCloseBtnText();
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
	const panelContent = document.getElementById('panel-content');
	panelContent.innerHTML = `
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
      			<p class="img-author">${images[0].author}</p>

		<h2>${place.title}</h2> 
		<p>${place.address}</p>
		<p class="panel-descr">${place.description}</p>
		
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

	// odzwiedzone
	const visitedBtn = document.getElementById('visited-btn');
	const visitedIcon = document.getElementById('visited-icon');

	if (visitedBtn && visitedIcon) {
		const visitedPlaces = JSON.parse(
			localStorage.getItem('visitedPlaces') || '[]'
		);
		const idStr = String(place.id);
		const isVisited = visitedPlaces.includes(idStr);

		visitedBtn.setAttribute('aria-pressed', String(isVisited));
		visitedIcon.src = isVisited
			? 'img/icon/check-circle-full.svg'
			: 'img/icon/check-circle.svg';

		// dodanie nowego listenera po przerenderowaniu panelu
		visitedBtn.replaceWith(visitedBtn.cloneNode(true));
		const newVisitedBtn = document.getElementById('visited-btn');
		const newVisitedIcon = document.getElementById('visited-icon');

		newVisitedBtn.addEventListener('click', () => {
			let visited = JSON.parse(localStorage.getItem('visitedPlaces') || '[]');
			const currentlyVisited = visited.includes(idStr);

			if (currentlyVisited) {
				visited = visited.filter((id) => id !== idStr);
			} else {
				visited.push(idStr);
			}
			localStorage.setItem('visitedPlaces', JSON.stringify(visited));

			
			newVisitedBtn.setAttribute('aria-pressed', String(!currentlyVisited));
			newVisitedIcon.src = !currentlyVisited
				? 'img/icon/check-circle-full.svg'
				: 'img/icon/check-circle.svg';
		});
	} else {
		console.error('Brak visited-btn lub visited-icon w panelu');
	}

	//ulubiuone
	const favoriteBtn = document.getElementById('fav-btn');
	const favoriteIcon = document.getElementById('fav-icon');

	if (favoriteBtn && favoriteIcon) {
		const favoritePlaces = JSON.parse(
			localStorage.getItem('favoritePlaces') || '[]'
		);
		const idStr = String(place.id);
		const isFavorite = favoritePlaces.includes(idStr);

		favoriteBtn.setAttribute('aria-pressed', String(isFavorite));
		favoriteIcon.src = isFavorite
			? 'img/icon/heart-full.svg'
			: 'img/icon/heart.svg';

		// dodanie nowego listenera po przerenderowaniu panelu
		favoriteBtn.replaceWith(favoriteBtn.cloneNode(true));
		const newFavoriteBtn = document.getElementById('fav-btn');
		const newFavoriteIcon = document.getElementById('fav-icon');

		newFavoriteBtn.addEventListener('click', () => {
			let favorite = JSON.parse(localStorage.getItem('favoritePlaces') || '[]');
			const currentlyFavorite = favorite.includes(idStr);

			if (currentlyFavorite) {
				favorite = favorite.filter((id) => id !== idStr);
			} else {
				favorite.push(idStr);
			}
			localStorage.setItem('favoritePlaces', JSON.stringify(favorite));

			
			newFavoriteBtn.setAttribute('aria-pressed', String(!currentlyFavorite));
			newFavoriteIcon.src = !currentlyFavorite
				? 'img/icon/heart-full.svg'
				: 'img/icon/heart.svg';
		});
	} else {
		console.error('Brak fav-btn lub fav-icon w panelu');
	}
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
		const id = btn.dataset.id;
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

// przycisk zamykania
document.getElementById('close-btn').addEventListener('click', () => {
	panel.classList.remove('aktywny');
	if (activeMarker) {
		activeMarker.setIcon(defaultIcon);
		activeMarker.setZIndexOffset(0);
		activeMarker = null;
	}
	currentOpenPlace = null;
});

// przycisk nawigacji
const navigateBtn = document.getElementById('navigate-btn');
navigateBtn.addEventListener('click', (e) => {
	if (!currentOpenPlace) {
		e.preventDefault();
		return;
	}
	const [lat, lng] = currentOpenPlace.coords;
	const isIOS =
		/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
	navigateBtn.href = isIOS
		? `http://maps.apple.com/?daddr=${lat},${lng}`
		: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
});

// przycisk ulubione
/*document.getElementById('fav-btn').addEventListener('click', () => {
    if (!currentOpenPlace) return;
    // obsługa dodania do ulubionych
});

// przycisk odwiedzone
/*document.getElementById('visited-btn').addEventListener('click', () => {
    if (!currentOpenPlace) return;
    // obsługa dodania do odziwdzonych
});

// przycisk udostępniania
document.getElementById('share-btn').addEventListener('click', async () => {
    if (!currentOpenPlace) return;
    const shareData = {
        title: currentOpenPlace.title,
        text: currentOpenPlace.description,
        url: window.location.href
    };
    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (err) {
            console.error(err);
        }
    } else {
        alert('Udostępnianie nie jest obsługiwane w tej przeglądarce.');
    }
});*/

document.addEventListener('DOMContentLoaded', () => {
	const panel = document.getElementById('info-panel');
	const closeBtn = document.getElementById('info-close-btn');

	const lastClosed = localStorage.getItem('infoPanelClosed');
	const now = new Date().getTime();
	const oneDay = 24 * 60 * 60 * 1000;

	if (!lastClosed || now - parseInt(lastClosed) > oneDay) {
		panel.classList.remove('hidden');
	}

	closeBtn.addEventListener('click', () => {
		panel.classList.add('hidden');
		localStorage.setItem('infoPanelClosed', now.toString());
	});
});
