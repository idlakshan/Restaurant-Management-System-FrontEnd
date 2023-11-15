const alphabetArea = document.querySelector(".alphabetArea");
const categoryCardListArea = document.querySelector(".category-items-area");
const dishCardListArea = document.querySelector(".dishes-area");
const backTocategoryList = document.querySelector(".backButtonArea");
const letterButtons = document.querySelectorAll(".letter-btn");

const dishContentArea = document.querySelector(".dishes-area");


document.addEventListener("DOMContentLoaded", function () {
    loadAllCategory();
    loadDishes();

});

async function loadAllCategory() {
    try {
        const response = await fetch("../json/categoryList.json");
        const categories = await response.json();

        let categoryList = "";

        for (let i = 0; i < categories.length; i++) {
            categoryList += `
            <div class="catergory-card">
            <h3 class="catergory-card-title">${categories[i].name}</h3>
            </div>
            `;

            categoryCardListArea.innerHTML = categoryList;
        }

        const categoryCardList = document.querySelectorAll(".catergory-card");
        selectCategoryCardEvent(categoryCardList);

    } catch (error) {
        console.error("Error fetching category data:", error);
    }


}

function selectCategoryCardEvent(categoryCardList) {
    categoryCardList.forEach((categoryCard) => {
        categoryCard.addEventListener("click", function () {
            categoryCardListArea.style.display = "none"
            dishCardListArea.style.display = "flex"
            alphabetArea.style.display = "flex"

        })
    })

    backTocategoryList.addEventListener('click', function () {
        categoryCardListArea.style.display = "flex"
        dishCardListArea.style.display = "none"
        alphabetArea.style.display = "none"
    })

}

// =============Load All dishes=============
async function loadDishes() {
    try {
        const response = await fetch("../json/disehs.json");
        const dishes = await response.json();
        console.log(dishes);

        let dishCardsList = "";

        for (let i = 0; i < dishes.length; i++) {
            dishCardsList += `
                 <div class="dishcard" data-index="${i}" data-name="${dishes[i].dishName.toLowerCase()}" data-category="${dishes[i].category.toLowerCase()}"  data-acategory="${dishes[i].category.toLowerCase()}"    >
                     <div class="dishcard-image">
                         <img src="${dishes[i].img}" width="150px" style="margin-bottom: 3px; border-radius: 100px;" alt="">
                     </div>
                     <div class="dishcard-title">
                         <h3 class="dish-title">${dishes[i].dishName}</h3>
                     </div>
                 </div> 
                 
                 `;

            dishContentArea.innerHTML = dishCardsList;
        }
        const dishCards = document.querySelectorAll(".dishcard");
        // selectedDishPopup(dishes, dishCards);
        // searchDishByLetter(dishCards)

    } catch (error) {
        console.error("Error fetching category data:", error);
    }
}
