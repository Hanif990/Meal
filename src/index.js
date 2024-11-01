const { app, BrowserWindow } = require('electron');
const path = require('node:path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
    preload: path.join(__dirname, 'preload.js'),
    nodeIntegration: true,       // Enable Node integration
    contextIsolation: false,     // Disable context isolation to allow node modules
    enableRemoteModule: true 
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
 
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

function searchByCategory() {
  const category = document.getElementById('categoryInput').value;
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((response) => response.json())
      .then((data) => {
          const categoryResults = document.getElementById('category-results');
          categoryResults.innerHTML = '';
          
          // Check if meal data exists
          if (data.meals) {
              data.meals.forEach(meal => {
                  const mealBox = document.createElement('div');
                  mealBox.className = 'meal-box';
                  mealBox.innerHTML = `
                      <h3>${meal.strMeal}</h3>
                      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="meal-thumbnail" />
                      <p>Meal ID: ${meal.idMeal}</p>
                      <button onclick="goToMealDetails(${meal.idMeal})" class="meal-details-button">View Details</button>
                  `;
                  categoryResults.appendChild(mealBox);
              });
          } else {
              categoryResults.innerHTML = '<p>No meals found for this category.</p>';
          }
      })
      .catch((error) => {
          console.error("Error fetching meals by category:", error);
      });
}

function goToMealDetails(idMeal) {
  // Store the meal ID in localStorage and navigate to the meal details page
  localStorage.setItem('selectedMealId', idMeal);
  window.location.href = 'Mealdetail.html';
}

function goToIngredient(){
  window.location.href = 'Ingredient.html';
}





