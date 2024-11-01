function searchByIngredient() {
    const ingredient = document.getElementById('ingredientInput').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
        .then((response) => response.json())
        .then((data1) => {
            const ingredientResults = document.getElementById('ingredient-results');
            ingredientResults.innerHTML = '';
            
            // Check if meal data exists
            if (data1.meals) {
                data1.meals.forEach(meal => {
                    const mealBox1 = document.createElement('div');
                    mealBox1.className = 'meal-box';
                    mealBox1.innerHTML = `
                        <h3>${meal.strMeal}</h3>
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="meal-thumbnail" />
                        <p>Meal ID: ${meal.idMeal}</p>
                        <button onclick="goToMealDetails(${meal.idMeal})" class="meal-details-button">View Details</button>
                    `;
                    ingredientResults.appendChild(mealBox1);
                });
            } else {
                ingredientResults.innerHTML = '<p>No meals found for this category.</p>';
            }
        })
        .catch((error) => {
            console.error("Error fetching meals by category:", error);
        });
  }
  
  function goToMealDetails(idMeal) {
    // Store the meal ID in localStorage and navigate to the meal details page
    localStorage.setItem('selectedMealId', idMeal);
    window.location.href = 'Ingredientdetail.html';
  }

  function goToCategories(){
    window.location.href = 'index.html';
  }