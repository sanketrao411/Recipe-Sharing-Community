// Event listener for recipe form submission
document.getElementById('recipe-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get input values from the form
    const name = document.getElementById('name').value;
    const ingredients = document.getElementById('ingredients').value;
    const instructions = document.getElementById('instructions').value;

    // Create a new recipe object
    const newRecipe = { name, ingredients, instructions };

    // Send the new recipe to the backend (POST request)
    fetch('http://localhost:5000/api/recipes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRecipe)
    })
    .then(response => {
        if (response.ok) {
            // Show success alert
            alert('Recipe added successfully!');
            
            // Hide modal
            $('#addRecipeModal').modal('hide');
            
            // Redirect to home page
            window.location.href = 'index.html';
        } else {
            throw new Error('Failed to add recipe');
        }
    })
    .catch(error => {
        // Handle any errors
        console.error('Error:', error);
        alert('There was an error adding the recipe. Please try again later.');
    });
});

// Load recipes on page load
window.onload = function() {
    fetch('http://localhost:5000/api/recipes')
    .then(response => response.json())
    .then(data => {
        const recipeList = document.getElementById('recipe-list');
        recipeList.innerHTML = ""; // Clear any existing content

        // Check if there are no recipes
        if (data.length === 0) {
            recipeList.innerHTML = `<p>No recipes found. Add your first recipe!</p>`;
        }

        // Create recipe cards dynamically
        data.forEach(recipe => {
            const recipeItem = document.createElement('div');
            recipeItem.className = 'col-md-4'; // Bootstrap grid column
            recipeItem.innerHTML = `
                <div class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title">${recipe.name}</h5>
                        <p class="card-text"><strong>Ingredients:</strong> ${recipe.ingredients}</p>
                        <p class="card-text"><strong>Instructions:</strong> ${recipe.instructions}</p>
                    </div>
                </div>
            `;
            recipeList.appendChild(recipeItem);
        });
    })
    .catch(error => console.error('Error:', error));
};
