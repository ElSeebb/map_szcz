const places = [
	{
    id: 1,
		coords: [49.426272, 20.476756],
		img: 'img/tablica/zdj/pod_gackiem2.jpg',
		title: 'Pod gackiem',
		address: '<b>Adres:</b> Główna 25',
		description: 'Tablica nadana w 2023r dla budynku Hotel Szczawnica Park ',
	},
	{
    id: 2,
		coords: [49.426782, 20.474926],
		img: 'img/tablica/zdj/pod_aniołem_strozem.jpg',
		title: 'Pod Aniołem Stróżem',
		address: '<b>Adres:</b> Glówna 29',
		description: 'Orginał znajduje się w Muzeum Pienińskim',
	},
	{
    id: 3,
		coords: [49.427002, 20.474226],
		img: 'img/tablica/zdj/pod_matka_boska.jpg',
		title: 'Pod Matką Boską',
		address: '<b>Adres:</b> Glówna 38',
		description: '...',
	},
];

// Funkcja do tworzenia markera i obsługi kliknięcia

places.forEach((place) => {
	const marker = L.marker(place.coords).addTo(map);
	marker.on('click', () => {
		const panel = document.getElementById('panel');
		panel.innerHTML = `
        <img src="${place.img}" alt="Tablica ${place.title}" style="width: 100%; height: auto; border-radius: 8px;">
        <h2>${place.title}</h2> 
        <p>${place.address}</p>
        <p>${place.description}</p>
        <button onclick="zamknijPanel()">Zamknij</button>
      `;
		panel.classList.add('aktywny');
	});
});

function zamknijPanel() {
	document.getElementById('panel').classList.remove('aktywny');
}
