const fs = require('fs');
const path = require('path');

const filesFolderPath = path.join(__dirname, 'Files');

document.addEventListener('DOMContentLoaded', () => {
    const mealDetails = JSON.parse(localStorage.getItem('mealDetails'));
    
    if (mealDetails) {
        // Displaying meal details in editable fields
        document.getElementById('mealName').value = mealDetails.name;
        document.getElementById('mealCategory').value = mealDetails.category;
        document.getElementById('mealArea').value = mealDetails.area;
        document.getElementById('mealInstructions').value = mealDetails.instructions;
        document.getElementById('mealIngredients').value = mealDetails.ingredients.join(', ');
    } else {
        document.getElementById('fileOutput').innerText = 'No meal details found.';
    }
});

function goBack() {
    window.location.href = 'Ingredientdetail.html';
}

function createFile() {
    const mealDetails = {
        name: document.getElementById('mealName').value,
        category: document.getElementById('mealCategory').value,
        area: document.getElementById('mealArea').value,
        instructions: document.getElementById('mealInstructions').value,
        ingredients: document.getElementById('mealIngredients').value.split(',').map(item => item.trim())
    };

    const fileName = document.getElementById('fileName').value || 'meal_details';
    const mealContent = `
${mealDetails.name}
${mealDetails.category}
${mealDetails.area}

Instructions:   ${mealDetails.instructions}

Ingredients:
${mealDetails.ingredients.join('\n')}
    `;

    const filePath = path.join(filesFolderPath, `${fileName}.txt`);

    fs.writeFile(filePath, mealContent, (err) => {
        if (err) {
            console.error('Error saving file:', err);
            alert('Failed to create file.');
        } else {
            alert(`File '${fileName}.txt' created successfully in the Files folder!`);
        }
    });
}

function readFile() {
    const fileName = document.getElementById('fileName').value;
    
    if (fileName) {
        const filePath = path.join(filesFolderPath, `${fileName}.txt`);
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                alert('Error reading file: ' + err.message);
            } else {
                document.getElementById('fileOutput').innerText = data;
            }
        });
    } else {
        alert('Please enter the file name.');
    }
}

function updateFile() {
    const mealDetails = {
        name: document.getElementById('mealName').value,
        category: document.getElementById('mealCategory').value,
        area: document.getElementById('mealArea').value,
        instructions: document.getElementById('mealInstructions').value,
        ingredients: document.getElementById('mealIngredients').value.split(',').map(item => item.trim())
    };

    const fileName = document.getElementById('fileName').value;
    const fileContent = `
${mealDetails.name}
${mealDetails.category}
${mealDetails.area}

Instructions: ${mealDetails.instructions}

Ingredients:
${mealDetails.ingredients.join('\n')}
    `;

    const filePath = path.join(filesFolderPath, `${fileName}.txt`);

    if (fs.existsSync(filePath)) {
        fs.writeFile(filePath, fileContent, (err) => {
            if (err) {
                alert('Error updating file: ' + err.message);
            } else {
                alert(`File '${fileName}.txt' updated successfully!`);
            }
        });
    } else {
        alert('File not found.');
    }
}

function deleteFile() {
    const fileName = document.getElementById('fileName').value;
    
    if (fileName) {
        const filePath = path.join(filesFolderPath, `${fileName}.txt`);
        if (fs.existsSync(filePath)) {
            fs.unlink(filePath, (err) => {
                if (err) {
                    alert('Error deleting file: ' + err.message);
                } else {
                    alert(`File '${fileName}.txt' deleted successfully!`);
                    document.getElementById('fileOutput').innerText = '';
                }
            });
        } else {
            alert('File not found.');
        }
    } else {
        alert('Please enter the file name.');
    }
}
