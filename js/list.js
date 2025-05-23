import {places} from '../date/marker.js'


let emblemsHTML = '';

places.forEach((place) => {
	emblemsHTML += `
        <button class="emblem-btn">
				<div class="emblem-btn-symbol">
					<img src="${place.symbol}" style="width: 100%;"/>
				</div>
				<div class="emblem-btn-name"><p>${place.title}</p></div>
		</button>
    `;
});

document.querySelector('.emblem-list-box').innerHTML = emblemsHTML;
