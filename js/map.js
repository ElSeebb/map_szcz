const key = 'mnZ4thQ7dlWpRjiHX5FU';
const map = L.map('map').setView([49.422978, 20.524778], 13);
L.tileLayer(
	`https://api.maptiler.com/maps/openstreetmap/{z}/{x}/{y}.jpg?key=${key}`,
	{
		tileSize: 512,
		zoomOffset: -1,
		minZoom: 1,
		attribution:
			'\u003ca href="https://www.maptiler.com/copyright/" target="_blank"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href="https://www.openstreetmap.org/copyright" target="_blank"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e',
		crossOrigin: true,
	}
).addTo(map);
