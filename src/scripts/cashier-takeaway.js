const alphabetArea = document.querySelector(".alphabetArea");
const categoryCardListArea = document.querySelector(".category-items-area");


document.addEventListener("DOMContentLoaded", function () {
    loadAllCategory();
 
});

async function loadAllCategory(){
    try {
        const response=await fetch("../json/categoryList.json");
        const categories=await response.json();

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
            // categoryCardListArea.style.display = "none"
            // tableArea.style.display = "none"
            // dishCardListArea.style.display = "flex"
            alphabetArea.style.display = "flex"

        })
})

backTocategoryList.addEventListener('click', function () {
    // categoryCardListArea.style.display = "flex"
    // tableArea.style.display = "flex"
    // dishCardListArea.style.display = "none"
    alphabetArea.style.display = "none"
})

}
