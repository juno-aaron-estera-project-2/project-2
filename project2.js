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
			console.log("jvnnf");
			app.displayRecipes(jsonData.hits);
			
		});
};

app.displayRecipes = (recipes) => {
	recipes.forEach((recipe) => {
		// Create li and add class of .card
		const liContainer = document.createElement('li');
		liContainer.classList.add('.card');

		// Create image element and add src and alt attributes
		const recipeImage = document.createElement('img');
		recipeImage.src = recipe.recipe.image;
		recipeImage.alt = recipe.recipe.label;

		// Create h3 and add recipe title
		const recipeHeader = document.createElement('h3');
		recipeHeader.innerText = recipe.recipe.label;

		// Create a h4 with generic title
		const ingredientLabel = document.createElement('h4');
		ingredientLabel.innerText = "Ingredients";

		// Create anchor tag with link to recipe instructions
		const recipeLink = document.createElement('a');
		recipeLink.href = recipe.recipe.url;

		// Create ul element to hold ingredients
		const ingredientList = document.createElement('ul');
		
		// Loop through ingredientsLines array
		recipe.recipe.ingredientLines.forEach( (ingredient) => {
			const ingredientLi = document.createElement('li');
			ingredientLi.innerText = ingredient
			ingredientList.append(ingredientLi);
		})
		liContainer.append(recipeImage, recipeHeader, ingredientLabel, ingredientList, recipeLink);
	});
};

// app.displayRecipes = (recipes) => {
// 	recipes.forEach((recipe) => {
// 		const recipeCard = `<li class="card">
// 				<img src="${recipe.recipe.images.REGULAR.url}" alt="${recipe.recipe.label}">
// 				<h3>${recipe.recipe.label}</h3>
// 				<p>calories:${recipe.recipe.calories}, cook time:${recipe.recipe.totalTime}</p>
// 				<h4>Ingredients</h4>
// 				<ol>

// 				</ol>
// 				<a class="button" href="${recipe.recipe.url}">Instructions</a>
// 		</li>`;
// 		document.querySelector('ul.recipes').innerHTML += recipeCard;
// 	});
// };

// Initilize our app
app.init();


