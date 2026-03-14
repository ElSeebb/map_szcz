import { map } from './map.js';

//opacity slider

class OpacityControl extends L.Control {
	onAdd() {
		const container = L.DomUtil.create('div', 'leaflet-control opacity-control');

		const slider = L.DomUtil.create('input', '', container);
		slider.type = 'range';
		slider.min = 0;
		slider.max = 100;
		slider.value = 100;
		slider.title = 'Przezroczystość mapy';

		L.DomEvent.disableClickPropagation(container);
		L.DomEvent.disableScrollPropagation(container);

		this.slider = slider;
		return container;
	}

	setLayer(layer, defaultOpacity = 1) {
		this.slider.value = defaultOpacity * 100;
		this.slider.oninput = e => {
			layer.setOpacity(e.target.value / 100);
		};
	}

	hide() {
		this.getContainer().style.display = 'none';
	}

	show() {
		this.getContainer().style.display = 'block';
	}
}


export const opacityControl = new OpacityControl({ position: 'topleft' });
map.addControl(opacityControl);
opacityControl.hide();

//historyczne

const historicalLayers = {
	kataster: {
		layer: L.tileLayer('./img/kataster/{z}/{x}/{y}.png', {
			minZoom: 12,
			maxZoom: 18,
			opacity: 1,
			attribution:
				'© Archiwum Narodowe w Krakowie, Kataster galicyjski, sygn. 29/280/2695',
			updateWhenIdle: true,
			keepBuffer: 2
		}),
		defaultOpacity: 1
	},

	firstSurvey: {
		layer: L.tileLayer(
			'https://maps.arcanum.com/wmts/firstsurvey-galicia/{TileMatrix}/{TileRow}/{TileCol}.jpeg',
			{ opacity: 0.6, attribution: '&copy; Arcanum' }
		),
		defaultOpacity: 0.6
	},

	secondSurvey: {
		layer: L.tileLayer(
			'https://maps.arcanum.com/wmts/secondsurvey-galicia/{TileMatrix}/{TileRow}/{TileCol}.jpeg',
			{ opacity: 0.6, attribution: '&copy; Arcanum' }
		),
		defaultOpacity: 0.6
	},

	thirdSurvey: {
		layer: L.tileLayer(
			'https://maps.arcanum.com/wmts/thirdsurvey75000/{TileMatrix}/{TileRow}/{TileCol}.jpeg',
			{ opacity: 0.6, attribution: '&copy; Arcanum' }
		),
		defaultOpacity: 0.6
	}
};



let activeKey = null;


// suwak

const opacitySlider = document.getElementById('opacity-slider');

function showSlider(layer, opacity) {
	opacitySlider.style.display = 'block';
	opacitySlider.value = opacity * 100;

	opacitySlider.oninput = e => {
		layer.setOpacity(e.target.value / 100);
	};
}

function hideSlider() {
	opacitySlider.style.display = 'none';
	opacitySlider.oninput = null;
}


// funkcja


export function toggleHistoricalLayer(key) {
	const entry = historicalLayers[key];
	if (!entry) return;

	// wyłączenie tej samej
	if (activeKey === key) {
		map.removeLayer(entry.layer);
		activeKey = null;
		opacityControl.hide();
		return;
	}

	// wyłącz poprzednią
	if (activeKey) {
		map.removeLayer(historicalLayers[activeKey].layer);
	}

	// włącz nową
	entry.layer.setOpacity(entry.defaultOpacity);
	entry.layer.addTo(map).bringToFront();

	activeKey = key;

	// pokaż slider i ustaw warstwę
	opacityControl.show();
	opacityControl.setLayer(entry.layer, entry.defaultOpacity);
}


