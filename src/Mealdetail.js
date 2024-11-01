// Meal details page logic
document.addEventListener('DOMContentLoaded', () => {
    const idMeal = localStorage.getItem('selectedMealId');
    if (idMeal) {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.meals && data.meals[0]) {
                    const mealData = data.meals[0];
                    
                    // Assign meal properties
                    document.getElementById("Meal").innerHTML = "Meal: " + mealData.strMeal;
                    document.getElementById("MealCategory").innerHTML = "Meal Category: " + mealData.strCategory;
                    document.getElementById("MealArea").innerHTML = "Meal Area: " + mealData.strArea;
                    document.getElementById("MealInstructions").innerHTML = mealData.strInstructions;
                    document.getElementById("mealImage").src = mealData.strMealThumb;

                    // Update ingredients
                    const ingredientList = document.getElementById('ingredient-list');
                    ingredientList.innerHTML = '';
                    for (let i = 1; i <= 20; i++) {
                        const ingredient = mealData[`strIngredient${i}`];
                        const measure = mealData[`strMeasure${i}`];
                        if (ingredient && ingredient.trim() !== '') {
                            const ingredientItem = document.createElement('p');
                            ingredientItem.innerHTML = `${measure} ${ingredient}`;
                            ingredientList.appendChild(ingredientItem);
                        }
                    }

                    // Display YouTube link
                    const youtubeLinkDiv = document.getElementById("youtubeLink");
                    if (mealData.strYoutube) {
                        youtubeLinkDiv.innerHTML = `<a href="${mealData.strYoutube}" target="_blank">Watch on YouTube</a>`;
                    } else {
                        youtubeLinkDiv.innerHTML = 'No video tutorial available.';
                    }
                } else {
                    console.error("No meal data found.");
                }
            })
            .catch((error) => {
                console.error("Error fetching meal details:", error);
            });
    }
});


function goBack(){
    window.location.href = 'Ingredient.html';
}


function displayMeal() {
    const mealDetails = {
        name: document.getElementById("Meal").innerText,
        category: document.getElementById("MealCategory").innerText,
        area: document.getElementById("MealArea").innerText,
        instructions: document.getElementById("MealInstructions").innerText,
        image: document.getElementById("mealImage").src,
        ingredients: []
    };

    // Collecting ingredients
    const ingredientItems = document.querySelectorAll('#ingredient-list p');
    ingredientItems.forEach(item => {
        mealDetails.ingredients.push(item.innerText);
    });

    // Storing meal details in localStorage
    localStorage.setItem('mealDetails', JSON.stringify(mealDetails));

    // Redirecting to Ingredientdisplay.html
    window.location.href = 'Ingredientdisplay.html';
}

