import { getSortedPlacesWithId } from './sort.js';
import { generateMarkers } from './markerGen.js';
import {
	generateList,
	setupStreetAccordions,
	setCurrentPlaces,
	getCurrentPlaces,
} from './list.js';

const langToggle = document.getElementById('lang-btn');

//tłumaczenia
const translations = {
	pl: {
		title: 'Godła Szalayowskie',
        author: 'Autor mapy: ',
		describ: `Są to szyldy na drewnianych tablicach, których tradycja sięga XIXw,
				przedstawiają malowidła i podpisy okreslające nazwę domu, na cześć
				twórcy i właściciela uzdrowiska w Szczawnicy, któremu przypisuje się
				pomysł tych szyldów oraz pierwotne ich wykonanie. W tamtych czasach
				oznaczały one domu w których wynajmowano kwatery kuracjuszom. Dziś
				również przyznawane są godła włascicielom nieuchomości wynajmującym
				kwatery, obiektom gastronomicznym, szczególnie dbającym o wygląd swojej
				nieruchomości lub zasłużonym dla Miasta i Gminy Szczawnica.`,
        listTitle: 'Lista Godeł',
		sortAlph: 'sortuj alfabetycznie',
		sortStreet: 'sortuj wg ulic',
		formTitle: 'Znalazłeś błąd, brakujące dane? Podziel się',
		formName: 'Imię:',
		formMsg: 'Wiadomość:',
		formPriv:
			'Podając swoje dane, wyrażasz zgodę na ich przetwarzanie wyłącznie w celu udzielenia odpowiedzi na przesłane zgłoszenie. Dane nie będą udostępniane innym podmiotom.',
        
	},

	en: {
        title: '',
		author: 'Map author: ',
		describ: ``,
        listTitle:'',
		sortAlph: 'sort alphabetically',
		sortStreet: 'sort by street',
		formTitle: 'Found an error, missing data? Share',
		formName: 'Name:',
		formMsg: 'Message:',
		formPriv:
			'By providing your data, you consent to their processing solely for the purpose of responding to the submitted application. The data will not be shared with other entities.',
    },
};

// sprawdzenie aktualnego języka
let currentLang = localStorage.getItem('lang') || 'pl';
langToggle.textContent = currentLang === 'pl' ? 'EN' : 'PL';

// ładowanie tłumaczenia
function applyTranslation(lang){
    const t = translations[lang];

    if(!t) return;

    const titleEl = document.getElementById('page-title');
    if (titleEl) titleEl.textContent=t.title;

    const descEl = document.getElementById('emblem-descr');
    if (descEl) descEl.textContent=t.describ;


}

// przeładownaie języka
function reloadLanguage() {
	import(`../date/marker_${currentLang}.js`).then((module) => {
		const rawPlaces = module.places;

		const places = getSortedPlacesWithId(rawPlaces);
        
		generateMarkers(places);
		setCurrentPlaces(places);
		generateList(getCurrentPlaces(), { sortMode: 'title', filter: '' });
		setupStreetAccordions();
	});
}



// obsługa przycisku
langToggle.addEventListener('click', () => {
	currentLang = currentLang === 'pl' ? 'en' : 'pl';
	localStorage.setItem('lang', currentLang);
	langToggle.textContent = currentLang === 'pl' ? 'EN' : 'PL';
	reloadLanguage();
});

// uruchomienie
reloadLanguage();
