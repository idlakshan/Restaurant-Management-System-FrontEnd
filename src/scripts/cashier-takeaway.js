const alphabetArea = document.querySelector(".alphabetArea");


document.addEventListener("DOMContentLoaded", function () {
    selectCategoryCardEvent();
 
});

function selectCategoryCardEvent() {
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
