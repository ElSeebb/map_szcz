import { toggleHistoricalLayer } from './historicalLayers.js';


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
const layersList = document.getElementById('layers-list');

layersBtn.addEventListener('click', () => {
	layersList.classList.toggle('active');

	if (panel.classList.contains('aktywny')) {
		panel.classList.remove('aktywny');
	}
});


document
	.getElementById('kataster')
	.addEventListener('click', () => {
		toggleHistoricalLayer('kataster');
		layersList.classList.remove('active');
	});

document
	.getElementById('first-military-survey')
	.addEventListener('click', () => {
		toggleHistoricalLayer('firstSurvey');
		layersList.classList.remove('active');
	});

document
	.getElementById('second-military-survey')
	.addEventListener('click', () => {
		toggleHistoricalLayer('secondSurvey');
		layersList.classList.remove('active');
	});

document
	.getElementById('third-military-survey')
	.addEventListener('click', () => {
		toggleHistoricalLayer('thirdSurvey');
		layersList.classList.remove('active');
	});

document
	.getElementById('kataster')
	.addEventListener('click', () => {
		
		toggleHistoricalLayer('kataster');
		layersList.classList.remove('active');
	});

