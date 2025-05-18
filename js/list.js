const emblems = [
	{
		symbol: '/img/symbol/pod-gackiem.avif',
		nazwa: 'abc',
	},
	{
		symbol: '',
		nazwa: 'sss',
	},
];

//generator HTML

let emblemsHTML = '';

emblems.forEach((embelm) => {
	emblemsHTML += `
        <button class="emblem-box">
				<div class="emblem-box-symbol">
					<img src="${emblems.symbol}" style="width: 100%;"/>
				</div>
				<div class="emblem-box-name"><p>${emblems.nazwa}</p></div>
		</button>
    `;
});

//document.querySelector('.js-emblem-list').innerHTML = emblemsHTML;
