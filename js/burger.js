const burgerBtn = document.getElementById('burger-btn');
const listBox = document.getElementById('emblem-list');
const panel = document.getElementById('panel');

//list
burgerBtn.addEventListener('click', () => {
	// otwieranie/zamykanie listy
	listBox.classList.toggle('active');

	// jeśli panel jest otwarty — zamknij
	if (panel.classList.contains('aktywny')) {
		panel.classList.remove('aktywny');
	}
});

//layers 
const layersBtn = document.getElementById('layers-btn');
const layersList = document.getElementById('layers-list')

layersBtn.addEventListener('click', () => {
	layersList.classList.toggle('active');
	
	if (panel.classList.contains('aktywny')) {
		panel.classList.remove('aktywny');
	}
})



//ARCANIUM WMTS
const thirdSurvey = L.tileLayer.wmts(
    'https://maps.arcanum.com/wmts/thirdsurvey75000/{TileMatrix}/{TileRow}/{TileCol}.jpeg',
    {
        layer: 'thirdsurvey75000',
        style: '',
        tilematrixSet: 'GoogleMapsCompatible',
        format: 'image/jpeg',
        tileSize: 256,
        opacity: 0.6,
        attribution: '&copy; Arcanum'
    }
);

const secondSurvey = L.tileLayer.wmts(
    'https://maps.arcanum.com/wmts/secondsurvey-galicia/{TileMatrix}/{TileRow}/{TileCol}.jpeg',
    {
        layer: 'secondsurvey-galicia',
        style: '',
        tilematrixSet: 'GoogleMapsCompatible',
        format: 'image/jpeg',
        tileSize: 256,
        opacity: 0.6,
        attribution: '&copy; Arcanum'
    }
);

const firstSurvey = L.tileLayer.wmts(
    'https://maps.arcanum.com/wmts/firstsurvey-galicia/{TileMatrix}/{TileRow}/{TileCol}.jpeg',
    {
        layer: 'firstsurvey-galicia',
        style: '',
        tilematrixSet: 'GoogleMapsCompatible',
        format: 'image/jpeg',
        tileSize: 256,
        opacity: 0.6,
        attribution: '&copy; Arcanum'
    }
);

// przełączanie warstwy
function toggleArcanumLayer(layer) {
    if (map.hasLayer(layer)) {
        map.removeLayer(layer);
    } else {
        [thirdSurvey, secondSurvey, firstSurvey].forEach(l => {
            if (map.hasLayer(l)) map.removeLayer(l);
        });
        map.addLayer(layer);
    }
}


document.getElementById('third-military-survey').addEventListener('click', () => toggleArcanumLayer(thirdSurvey));
document.getElementById('second-military-survey').addEventListener('click', () => toggleArcanumLayer(secondSurvey));
document.getElementById('first-military-survey').addEventListener('click', () => toggleArcanumLayer(firstSurvey));
