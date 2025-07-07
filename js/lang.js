import { getSortedPlacesWithId } from './sort.js';
import { generateMarkers, currentOpenPlace, openPanel } from './markerGen.js';
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
		describ: `Są to szyldy na drewnianych tablicach, których tradycja sięga XIXw, przedstawiają malowidła i podpisy okreslające nazwę domu. Nazwane na cześć twórcy i właściciela uzdrowiska w Szczawnicy, któremu przypisuje się pomysł tych szyldów oraz pierwotne ich wykonanie. W tamtych czasach oznaczały one domu w których wynajmowano kwatery kuracjuszom. Dziś również przyznawane są godła włascicielom nieuchomości wynajmującym kwatery, obiektom gastronomicznym, szczególnie dbającym o wygląd swojej nieruchomości lub zasłużonym dla Miasta i Gminy Szczawnica.`,
		closeBtn: 'Zamknij',
		listTitle: 'Lista Godeł',
		searchInput: 'Szukaj godła',
		sortTitle: 'sortuj alfabetycznie',
		sortStreet: 'sortuj wg ulic',
		formTitle: 'Znalazłeś błąd, brakujące dane? Podziel się!',
		formName: 'Imię:',
		formMsg: 'Wiadomość:',
		formPriv:
			'Podając swoje dane, wyrażasz zgodę na ich przetwarzanie wyłącznie w celu udzielenia odpowiedzi na przesłane zgłoszenie. Dane nie będą udostępniane innym podmiotom.',
		formBtn: 'Wyślij',
		darkModeBtn: 'Tryb nocny',
	},

	en: {
		title: `Szalay's emblems`,
		author: 'Map author: ',
		describ: `These are signs on wooden boards, the tradition of which dates back to the 19th century, present paintings and signatures specifying the name of the house. Named in honour of the creator and owner of the health resort in Szczawnica, who is credited with the idea for these signs and their original execution. In those times, they marked houses in which quarters were rented to spa guests. Today, emblems are also awarded to property owners who rent quarters, catering facilities, who take special care of the appearance of their property or those who have made outstanding contributions to the City and Commune of Szczawnica.`,
		closeBtn: 'Close',
		listTitle: 'List of emblems',
		searchInput: 'Search emblem',
		sortTitle: 'Sort by title',
		sortStreet: 'Sort by street',
		formTitle: 'Found an error, missing data? Share!',
		formName: 'Name:',
		formMsg: 'Message:',
		formPriv:
			'By providing your data, you consent to their processing solely for the purpose of responding to the submitted application. The data will not be shared with other entities.',
		formBtn: 'Send',
		darkModeBtn: 'Dark mode',
	},
};

// sprawdzenie aktualnego języka
let currentLang = localStorage.getItem('lang') || 'pl';
langToggle.textContent = currentLang === 'pl' ? 'EN' : 'PL';

// ładowanie tłumaczenia elementóew
function applyTranslation(lang) {
	const t = translations[lang];

	if (!t) return;

	const titleTr = document.getElementById('page-title');
	if (titleTr) titleTr.textContent = t.title;

	const descTr = document.getElementById('emblem-descr');
	if (descTr) descTr.textContent = t.describ;

	const closeBtnTr = document.getElementById('zamknij-btn');
	if (closeBtnTr) closeBtnTr.textContent = t.closeBtn;

	const authorTr = document.getElementById('map-author');
	if (authorTr) authorTr.textContent = t.author;

	const listTitleTr = document.getElementById('list-title');
	if (listTitleTr) listTitleTr.textContent = t.listTitle;

	const searchInputTr = document.getElementById('search-input');
	if (searchInputTr) searchInputTr.placeholder = t.searchInput;

	const sortTitleTr = document.getElementById('sort-label-title');
	if (sortTitleTr) sortTitleTr.textContent = t.sortTitle;

	const sortStreetTr = document.getElementById('sort-label-street');
	if (sortStreetTr) sortStreetTr.textContent = t.sortStreet;

	const formTitleTr = document.getElementById('form-title');
	if (formTitleTr) formTitleTr.textContent = t.formTitle;

	const formNameTr = document.getElementById('form-name');
	if (formNameTr) formNameTr.textContent = t.formName;

	const formMsgTr = document.getElementById('form-msg');
	if (formMsgTr) formMsgTr.textContent = t.formMsg;

	const formPrivTr = document.getElementById('form-privacy');
	if (formPrivTr) formPrivTr.textContent = t.formPriv;

	const formBtnTr = document.getElementById('form-btn');
	if (formBtnTr) formBtnTr.value = t.formBtn;

	const darkModeBtnTr = document.getElementById('dark-mode-btn');
	if (darkModeBtnTr) darkModeBtnTr.textContent = t.darkModeBtn;
}

// przeładownaie języka i markerów
function reloadLanguage() {
	import(`../date/marker_${currentLang}.js`).then((module) => {
		const rawPlaces = module.places;

		const places = getSortedPlacesWithId(rawPlaces);

		const closeBtnText = translations[currentLang].closeBtn;
		generateMarkers(places, closeBtnText);
		setCurrentPlaces(places);
		generateList(getCurrentPlaces(), { sortMode: 'title', filter: '' });
		setupStreetAccordions();

		applyTranslation(currentLang);
		

		if (panel && panel.classList.contains('aktywny') && currentOpenPlace) {
			const updatedPlace = places.find((p) => p.id === currentOpenPlace.id);
			if (updatedPlace) {
				openPanel(panel, updatedPlace, closeBtnText);
				const activeButton = document.querySelector(
					`.emblem-btn[data-id="${currentOpenPlace.id}"]`
				);
				if (activeButton) {
					activeButton.classList.add('active');
					activeButton.scrollIntoView({ block: 'center', behavior: 'smooth' });
				}
			}
		}
	});
}

// obsługa przycisku
langToggle.addEventListener('click', () => {
	currentLang = currentLang === 'pl' ? 'en' : 'pl';
	localStorage.setItem('lang', currentLang);
	langToggle.textContent = currentLang === 'pl' ? 'EN' : 'PL';
	reloadLanguage();
});

export function getCloseBtnText() {
	return translations[currentLang].closeBtn;
}
export function getTranslation(key) {
    return translations[currentLang][key];
}

// uruchomienie
reloadLanguage();
