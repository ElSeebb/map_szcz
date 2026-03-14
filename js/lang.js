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
		switchLangBtn: 'Switch language',
		infoPanelTitle: 'Aktualne plany rozwojowe (stan: marzec 2026)',
		infoPanelText:
			`Witaj na Geoportalu poświęconym tzw. Godłom Szalayowskim! Znajdziesz tu mapę z aktualnymi lokalizacjami, opisami i zdjęciami zachowanych tablic, które stanowią unikatowy element historycznej tożsamości Szczawnicy. </br>
Projekt ma charakter hobbystyczny i tworzony jest w wolnym czasie – dlatego rozwija się stopniowo, ale regularnie. <br>Jeśli posiadasz informacje, zdjęcia lub lokalizacje godeł, których tutaj brakuje, możesz je zgłosić za pomocą czerwonego przycisku z wykrzyknikiem w prawym dolnym rogu <img src="./img/icon/alert-triangle.svg" class="inline-icons">. </br>
Każda taka pomoc przyczynia się do odtworzenia historii uzdrowiska i zachowania pamięci o tych wyjątkowych znakach. </br><hr>
			Strona została rozszerzona o pierwszą warstwę historyczną — Kataster Galicyjski z 1846 r. pt. „Wyżnia Szczawnica sammt Ortschaft Nyżnia Szczawnica in Galizien Sandecer Kreis Bezirk Szczawnica”.
Warstwę można włączyć, klikając przycisk w prawym dolnym rogu <img src="./img/icon/layers.svg" class="inline-icons"> i wybierając odpowiednią pozycję. Jakość mapy zależy od przybliżenia. 
 <br>
<i>Georeferencja mapy została wykonana samodzielnie. Mogą występować błędy i niedokładności ze współczesnym układem ulic i budynków.</br> Źródło: Archiwum Narodowe w Krakowie, Kataster galicyjski, sygn. 29/280/2695.
Wykorzystano zgodnie z ustawą z dnia 11 sierpnia 2021 r. o otwartych danych i ponownym wykorzystywaniu informacji sektora publicznego.</i> 
`,
		plansTitleCur: 'W trakcie realizacji:',
		plansCurrent: `<li>aktualizacja adresów tablic (82/112)</li>
					<li>aktualizacja zdjęć (33/82)</li>
					<li>aktualizacja opisów</li>
					<li>aktualizacja angielskiej wersji</li>
					<li>historia odwiedzonych tablic</li>
					<li>dodanie warstw historycznych</li>`,
		plansTitleFut: 'Plany na przyszłość',
		plansFuture: `<li>wersja mapy dla dzieci</li>
					<li>system komentarzy</li>
					<li>warstwy z innymi atrakcjami</li>`,
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
		switchLangBtn: 'Zmień język',
		infoPanelTitle: 'Current development plans (as of March 2026)',
		infoPanelText: `Welcome to the Geoportal dedicated to the Szalay emblems!
Here you will find a map with the current locations, descriptions, and photographs of preserved plaques, which form a unique element of Szczawnica’s historical identity. <br>
This is a non-commercial, hobby project developed in the author’s spare time, which is why it evolves gradually but consistently. <br>
If you have information, photographs, or locations of emblems that are missing here, you can submit them using the red exclamation mark button in the bottom-right corner. <br>
Every contribution helps to reconstruct the history of the spa town and preserve the memory of these unique symbols. <br><hr>
The website has been expanded with its first historical map layer — the Galician Cadastre (1846) titled “Wyżnia Szczawnica sammt Ortschaft Nyżnia Szczawnica in Galizien Sandecer Kreis Bezirk Szczawnica.”
You can enable it by clicking the button in the bottom-right corner <img src="./img/icon/layers.svg" class="inline-icons"> and selecting the appropriate layer.<br>
<i>The map was georeferenced by myself. Errors and inaccuracies may occur due to the current street and building layout.<br>
Source: National Archives in Kraków, Galician Cadastre, ref. no. 29/280/2695.
Used in accordance with the Polish Act of 11 August 2021 on open data and the re-use of public sector information.</i>`,
		plansTitleCur: 'Currently in progress:',
		plansCurrent: `<li>updating emblems addresses (82/112)</li>
              <li>updating photos (33/82)</li>
              <li>updating descriptions</li>
              <li>updating the English version</li>
              <li>visited emblems history</li>
              <li>adding historical map layers</li>`,
		plansTitleFut: 'Future plans',
		plansFuture: `<li>child-friendly map version</li>
             <li>comment system</li>
             <li>layers with other attractions</li>`,

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

	const infoPanelTitleTr = document.getElementById('info-panel-title');
	if (infoPanelTitleTr) infoPanelTitleTr.textContent = t.infoPanelTitle;

	const infoPanelTextTr = document.getElementById('info-panel-text');
	if (infoPanelTextTr) infoPanelTextTr.innerHTML = t.infoPanelText;

	const plansTitleCurTr = document.getElementById('plans-title-cur');
	if (plansTitleCurTr) plansTitleCurTr.textContent = t.plansTitleCur;

	const plansCurrentTr = document.getElementById('plans-current');
	if (plansCurrentTr) plansCurrentTr.innerHTML = t.plansCurrent;
	
	const plansTitleFutTr = document.getElementById('plans-title-fut');
	if (plansTitleFutTr) plansTitleFutTr.textContent = t.plansTitleFut;
	
	const plansFutureTr = document.getElementById('plans-future');
	if (plansFutureTr) plansFutureTr.innerHTML = t.plansFuture;
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
					`.emblem-btn[data-id="${currentOpenPlace.id}"]`,
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

function setLanguage(lang) {
	if (!translations[lang]) return;

	currentLang = lang;
	localStorage.setItem('lang', currentLang);

	if (langToggle) {
		langToggle.textContent = currentLang === 'pl' ? 'EN' : 'PL';
	}

	reloadLanguage();
}

if (langToggle) {
	langToggle.addEventListener('click', () => {
		setLanguage(currentLang === 'pl' ? 'en' : 'pl');
	});
}

document.querySelectorAll('.lang-btn').forEach((btn) => {
	btn.addEventListener('click', () => {
		if (btn.classList.contains('pol-btn')) {
			setLanguage('pl');
		}
		if (btn.classList.contains('eng-btn')) {
			setLanguage('en');
		}
	});
});


export function getCloseBtnText() {
	return translations[currentLang].closeBtn;
}
export function getTranslation(key) {
	return translations[currentLang][key];
}

// uruchomienie
reloadLanguage();
