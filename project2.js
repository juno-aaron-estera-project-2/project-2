const app = {};
app.init = () => {
	document
		.querySelector('button[type="submit"]')
		.addEventListener('click', (event) => {
			event.preventDefault();
			app.getRecipes();
		});

	document
		.querySelector('input[name="searchbar"]')
		.addEventListener('submit', (event) => {
			event.preventDefault();
			app.getRecipes();
		});
};

// Function to create Url  with users search parameters
app.createURL = () => {
	let query =
		document.querySelector('input[name=searchbar]').value ||
		document.querySelector('input[name=cuisine]:checked').value;

	const url = new URL('https://api.edamam.com/api/recipes/v2');
	url.search = new URLSearchParams({
		app_key: '4edb99f7b221f09869fdba1a5d964a3a',
		app_id: 'eec7cd68',
		type: 'any',
		q: query,
	});

	return url;
};

// Function to get recipes
app.getRecipes = () => {
	const url = app.createURL();
	fetch(url)
		.then((res) => res.json())
		.then((jsonData) => {
			app.displayRecipes(jsonData.hits);
		});
};


// Function to display recipes
app.displayRecipes = (recipes) => {
	document.querySelector('.recipes').innerHTML = '';
	recipes.forEach((recipe) => {
		// create li and add class of 'card'
		const liContainer = document.createElement('li');
		liContainer.classList.add('card');

		// create image element and add src and alt attributes
		const recipeImage = document.createElement('img');
		recipeImage.src = recipe.recipe.image;
		recipeImage.alt = recipe.recipe.label;

		// create h3 and add recipe title
		const recipeHeader = document.createElement('h3');
		recipeHeader.innerText = recipe.recipe.label;

		// create h4 with label for ingredients
		const ingredientsLabel = document.createElement('h4');
		ingredientsLabel.innerText = 'Ingredients:';

		// create anchor tag with link to recipe instructions
		const recipeLink = document.createElement('a');
		recipeLink.href = recipe.recipe.url;
		recipeLink.classList.add('button');
		recipeLink.innerText = 'Full Recipe Here';

		// create ul element for ingredients
		const ingredientList = document.createElement('ul');

		// loop through ingredientLines array
		recipe.recipe.ingredientLines.forEach((ingredient) => {
			const ingredientLi = document.createElement('li');
			ingredientLi.innerText = ingredient;
			ingredientList.append(ingredientLi);
		});

		// append all elements to li
		liContainer.append(
			recipeImage,
			recipeHeader,
			ingredientsLabel,
			ingredientList,
			recipeLink
		);

		// append li to ul
		document.querySelector('.recipes').append(liContainer);
	});
};

// Initalize App
app.init();
