import { latlngs } from '../date/border.js';

const key = 'mnZ4thQ7dlWpRjiHX5FU';
let initialCoords;
let initialZoom;

if (window.innerWidth < 768) {
	//Widok mobilny
	initialCoords = [49.4348, 20.48];
	initialZoom = 13;
} else {
	//Widok desktopowy
	initialCoords = [49.422978, 20.524778];
	initialZoom = 13;
}

export const map = L.map('map').setView(initialCoords, initialZoom);
L.tileLayer(
	`https://api.maptiler.com/maps/openstreetmap/{z}/{x}/{y}.jpg?key=${key}`,
	{
		tileSize: 512,
		zoomOffset: -1,
		minZoom: 1,
		maxZoom: 22,
		attribution:
			'\u003ca href="https://www.maptiler.com/copyright/" target="_blank"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href="https://www.openstreetmap.org/copyright" target="_blank"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e',
		crossOrigin: true,
	}
).addTo(map);

//geolokalizacja
const LocateControl = L.Control.extend({
	onAdd: function (map) {
		const btn = L.DomUtil.create('button', 'locate-btn');
		btn.innerHTML = '<img src="./img/icon/crosshair.svg" />';
		btn.title = 'Znajdź moją lokalizację';

		L.DomEvent.on(btn, 'click', function (e) {
			e.stopPropagation();
			map.locate({ setView: true, maxZoom: 18 });

			map.on('locationfound', (e) => {
				L.marker(e.latlng).addTo(map).bindPopup('Tu jesteś!').openPopup();
			});

			map.on('locationerror', (e) => {
				alert('Nie udało się uzyskać lokalizacji: ' + e.message);
			});
		});

		return btn;
	},

	onRemove: function (map) {},
});

map.addControl(new LocateControl({ position: 'topleft' })); // poniżej zoom
//border

const polyline = L.polyline(latlngs, {
	color: 'red',
	weight: 4,
	opacity: 0.8,
	dashArray: '10, 8',
	lineJoin: 'round',
}).addTo(map);
