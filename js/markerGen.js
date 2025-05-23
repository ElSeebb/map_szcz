import {places} from '../date/marker.js'
import {map} from '../js/map.js'

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