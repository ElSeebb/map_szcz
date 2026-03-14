import { toggleHistoricalLayer } from './historicalLayers.js';

document
	.getElementById('kataster')
	.addEventListener('click', () => toggleHistoricalLayer('kataster'));

document
	.getElementById('first-military-survey')
	.addEventListener('click', () => toggleHistoricalLayer('firstSurvey'));

document
	.getElementById('second-military-survey')
	.addEventListener('click', () => toggleHistoricalLayer('secondSurvey'));

document
	.getElementById('third-military-survey')
	.addEventListener('click', () => toggleHistoricalLayer('thirdSurvey'));
