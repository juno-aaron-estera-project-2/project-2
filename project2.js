const url = new URL('https://api.edamam.com/api/recipes/v2');
url.search = new URLSearchParams({
	app_key: '4edb99f7b221f09869fdba1a5d964a3a',
	app_id: 'eec7cd68',
	type: 'any',
	q: 'jamaican',
});

fetch(url)
	.then((res) => res.json())
	.then((jsonData) => {
		console.log(jsonData.hits);
	});
