// const marker = L.marker([49.426272, 20.476756]).addTo(map).bindPopup('<img src="./img/tablica/zdj/pod_gackiem.jpg" alt=""><br><b>Tablica:</b> Pod gackiem <br><b>Adres:</b> Główna 25');
// L.marker([49.426782, 20.474926]).addTo(map).bindPopup('<img src="./img/tablica/zdj/pod_aniołem_strozem.jpg" alt=""><br><b>Tablica:</b> Pod Aniołem Stróżem <br><b>Adres:</b> Główna 29');
// L.marker([49.427002, 20.474226]).addTo(map).bindPopup('<img src="./img/tablica/zdj/pod_matka_boska.jpg" alt=""><br><b>Tablica:</b> Pod Matką Boską <br><b>Adres:</b> Główna 38');
// L.marker([49.426272, 20.470356]).addTo(map);

// marker.on('click', () => {
//     const panel = document.getElementById('panel');
//     panel.innerHTML = `
//       <h2>Szczegóły lokalizacji</h2>
//       <p>To jest przykładowy opis klikniętego markera.</p>
//       <button onclick="zamknijPanel()">Zamknij</button>
//     `;
//     panel.style.display = 'block';
//   });

//   // Funkcja do zamykania panelu
//   function zamknijPanel() {
//     document.getElementById('panel').style.display = 'none';
//   }

const miejsca = [
    {
      coords: [49.426272, 20.476756],
      obraz: 'img/tablica/zdj/pod_gackiem2.jpg',
      tytul: "Pod gackiem",
      adres: '<b>Adres:</b> Główna 25',
      opis: 'Tablica nadana w 2023r dla budynku Hotel Szczawnica Park '
    },
    {
      coords: [49.426782, 20.474926],
      obraz: 'img/tablica/zdj/pod_aniołem_strozem.jpg',
      tytul: "Pod Aniołem Stróżem",
      adres: 'Glówna 29',
      opis: "Orginał znajduje się w Muzeum Pienińskim"
    },
    {
      coords: [49.427002, 20.474226],
      obraz: 'img/tablica/zdj/pod_matka_boska.jpg',
      tytul: "Pod Matką Boską",
      adres: 'Glówna 38',
      opis: "..."
    }
  ];

  // Funkcja do tworzenia markera i obsługi kliknięcia
  miejsca.forEach(miejsce => {
    const marker = L.marker(miejsce.coords).addTo(map);
    marker.on('click', () => {
      const panel = document.getElementById('panel');
      panel.innerHTML = `
        <img src="${miejsce.obraz}" alt="Tablica ${miejsce.tytul}" style="width: 100%; height: auto; border-radius: 8px; margin-bottom: 10px;">
        <h2>${miejsce.tytul}</h2>
        <p>${miejsce.adres}</p>
        <p>${miejsce.opis}</p>
        <button onclick="zamknijPanel()">Zamknij</button>
      `;
      panel.classList.add('aktywny');
    });
  });

  function zamknijPanel() {
    document.getElementById('panel').classList.remove('aktywny');
  }
