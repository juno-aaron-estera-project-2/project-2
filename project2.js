const app = {};
app.init = () => {
	document
		.querySelector('button[type="submit"')
		.addEventListener('click', (event) => {
			event.preventDefault();
			app.getRecipes();
		});
};

// Function to get recipes
app.getRecipes = () => {
	console.log('hello');
	const query = document.querySelector('input[name=cuisine]:checked').value;

	const url = new URL('https://api.edamam.com/api/recipes/v2');
	url.search = new URLSearchParams({
		app_key: '4edb99f7b221f09869fdba1a5d964a3a',
		app_id: 'eec7cd68',
		type: 'any',
		q: query,
	});

	fetch(url)
		.then((res) => res.json())
		.then((jsonData) => {
			app.displayRecipes(jsonData.hits);
		});
};

app.displayRecipes = (recipes) => {
	recipes.forEach((recipe) => {
		const recipeCard = `<li class="card">
				<img src="${recipe.recipe.images.REGULAR.url}" alt="${recipe.recipe.label}">
				<h3>${recipe.recipe.label}</h3>
				<p>calories:${recipe.recipe.calories}, cook time:${recipe.recipe.totalTime}</p>
				<h4>Ingredients</h4>
				<ol>

				</ol>
				<a class="button" href="${recipe.recipe.url}">Instructions</a>
		</li>`;
		document.querySelector('ul.recipes').innerHTML += recipeCard;
	});
};

// Initilize our app
app.init();

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
		// app.displayRecipes(jsonData.hits);
		console.log(jsonData.hits);
	});
