let userInput = document.querySelector('.container .search-box input');
let foodImg = document.querySelector('.container .info-box .food-img img');
let foodName = document.querySelector('.container .mealName');
let foodArea = document.querySelector('.container .area');
let ingridientsBox = document.querySelector('.container .ingredients-box');
let viewRecipeBtn = document.querySelector('.container .view-recipe');
let instructions = document.querySelector('.container .instructions');
let closeBtn = document.querySelector('.container .close-btn');
let instructionsBox = document.querySelector('.container .instructions-box');
let infoBox = document.querySelector('.container .info-box');
let displayMsg = document.querySelector('.container .display-recipe');

userInput.addEventListener('keyup', (e) => {
    if (e.key == 'Enter') {
        if (userInput.value != '') {
            getFood(userInput.value);
        }
    }
})

let getFood = (mealName) => {
    ingridientsBox.innerHTML = '';
    infoBox.style.display = 'block';
    displayMsg.style.display = 'none';
    let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
    fetch(url + mealName)
        .then(res => res.json())
        .then(meal => {
            let myMeal = meal.meals[0];
            foodImg.src = myMeal.strMealThumb;
            foodName.innerHTML = myMeal.strMeal;
            foodArea.innerHTML = myMeal.strArea;
            instructions.innerHTML = myMeal.strInstructions;

            let count = 1;
            let ingridients = [];

            for (let i in myMeal) {
                let ingridient = '';
                let measure = '';
                if (i.startsWith('strIngredient') && myMeal[i]) {
                    ingridient = myMeal[i];
                    measure = myMeal['strMeasure' + count];
                    count += 1;
                    ingridients.push(`${measure} ${ingridient}`);
                }
            }

            let ul = document.createElement('ul');
            ingridients.forEach((ingrie) => {
                let child = document.createElement('li');
                child.innerHTML = ingrie;
                ul.appendChild(child);
                ingridientsBox.appendChild(child);
            });
        });
};

viewRecipeBtn.addEventListener('click', () => {
    instructionsBox.style.left = '0px';
});

closeBtn.addEventListener('click', () => {
    instructionsBox.style.left = '-100%';
});