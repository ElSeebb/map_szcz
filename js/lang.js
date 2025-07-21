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
		//author: 'Autor mapy: ',
		describ: `Godła Szalayowskie są to szyldy na drewnianych tablicach, których tradycja sięga XIX wieku. Przedstawiają malowidła oraz podpisy określające nazwę domu. Często związane też z charakterem lub talentem właściciela. Zostały nazwane tak na cześć twórcy i właściciela uzdrowiska w Szczawnicy, któremu przypisuje się pomysł tych szyldów oraz ich pierwotne wykonanie. W tamtych czasach oznaczały domy, w których wynajmowano kwatery kuracjuszom. Dodatkowym celem było ułatwienie gościom odszukania właściwego domu pośród wielu podobnych do siebie. Dziś również przyznawane są godła właścicielom nieruchomości spełniającym określone warunki.`,
		linkConditions: 'Sposób uzyskania tablicy na stronie CKSiP',
		navLink: 'Nawiguj',
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
		darkModeOn: 'Tryb nocny',
		darkModeOff: 'Tryb dzienny',
		submitErrorBtn: 'Zgłoś błąd',
		darkModeBtn: 'Tryb nocny',
		switchLangBtn: 'Przełącz język',
	},

	en: {
		title: `Szalay's emblems`,
		//author: 'Map author: ',
		describ: `Szalay emblems are signs on wooden boards dating back to the 19th century. They depict paintings and inscriptions identifying the house's name, often also linked to the owner's character or talent. It was named after the creator and owner of the Szczawnica spa, who is credited with inventing these signs and creating their original design. At that time, they designated houses where accommodations were rented to spa guests. An additional purpose was to make it easier for guests to find the right house among many similar ones. Today, coats of arms are also awarded to property owners who meet certain criteria.`,
		linkConditions: 'How to obtain a emblem on the CKSiP website (pl)',
		navLink: 'Navigate',
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
		darkModeOn: 'Dark mode',
		darkModeOff: 'Light mode',
		submitErrorBtn: 'Submit error',
		darkModeBtn: 'Dark mode',
		switchLangBtn: 'Switch language',
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

	const linkTr = document.getElementById('link-conditions');
	if (linkTr) linkTr.textContent = t.linkConditions;

	const navLinkTr = document.getElementById('nav-link');
	if (navLinkTr) navLinkTr.textContent = t.navLink;

	const closeBtnTr = document.getElementById('close-btn');
	if (closeBtnTr) closeBtnTr.textContent = t.closeBtn;

	// const authorTr = document.getElementById('map-author');
	// if (authorTr) authorTr.textContent = t.author;

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

	const themeToggleLabel = document.getElementById('dark-mode-btn');
	if (themeToggleLabel) {
		const isNight = document.body.classList.contains('dark-mode');
		themeToggleLabel.textContent = isNight ? t.darkModeOff : t.darkModeOn;
	}

	const submitErrorBtnTr = document.getElementById('submit-error-btn');
	if (submitErrorBtnTr) submitErrorBtnTr.title = t.submitErrorBtn;

	const darkModeBtnTr = document.getElementById('theme-toggle');
	if (darkModeBtnTr) darkModeBtnTr.title = t.darkModeBtn;

	const switchLangBtnTr = document.getElementById('lang-btn');
	if (switchLangBtnTr) switchLangBtnTr.title = t.switchLangBtn;
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
