

const emblems = [
	{
		id: 1,
		symbol: '/img/symbol/pod-gackiem.avif',
		nazwa: 'Pod gackiem',
	},
	{
		id: 2,
		symbol: '',
		nazwa: 'Pod Aniołem Stróżem',
	},
	{
		id: 3,
		symbol: '',
		nazwa: 'Pod Matką Boską',
	},
	{
		symbol: '',
		nazwa: 'sss',
	},
	{
		symbol: '',
		nazwa: 'sss',
	},
	{
		symbol: '',
		nazwa: 'sss',
	},
	{
		symbol: '',
		nazwa: 'sss',
	},
	{
		symbol: '',
		nazwa: 'sss',
	},
	{
		symbol: '',
		nazwa: 'sss',
	},
	{
		symbol: '',
		nazwa: 'sss',
	},
	{
		symbol: '',
		nazwa: 'sss',
	},
	{
		symbol: '',
		nazwa: 'sss',
	},
	{
		symbol: '',
		nazwa: 'sss',
	},
	{
		symbol: '',
		nazwa: 'sss',
	},
	{
		symbol: '',
		nazwa: 'sss',
	},
	{
		symbol: '',
		nazwa: 'sss',
	},
	{
		symbol: '',
		nazwa: 'sss',
	},
	{
		symbol: '',
		nazwa: 'sss',
	},
	{
		symbol: '',
		nazwa: 'sss',
	},
];

//generator HTML

let emblemsHTML = '';

emblems.forEach((emblem) => {
	emblemsHTML += `
        <button class="emblem-btn">
				<div class="emblem-btn-symbol">
					<img src="${emblem.symbol}" style="width: 100%;"/>
				</div>
				<div class="emblem-btn-name"><p>${emblem.nazwa}</p></div>
		</button>
    `;
});

document.querySelector('.emblem-list-box').innerHTML = emblemsHTML;
