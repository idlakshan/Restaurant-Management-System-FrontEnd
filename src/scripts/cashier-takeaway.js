const takeawayPayOrderPanelOne=document.querySelector("#payOrder-panelOne");
const takeawayPayOrderPaneTwo=document.querySelector("#payOrder-panelTwo");
const takeawayPayOrderPanelThree=document.querySelector("#payOrder-panelThree");
const tabOne=document.getElementById("tab1");
const tabTwo=document.getElementById("tab2");
const tabThree=document.getElementById("tab3");

const alphabetArea = document.querySelector(".alphabetArea");
const categoryCardListArea = document.querySelector(".category-items-area");
const dishCardListArea = document.querySelector(".dishes-area");
const backTocategoryList = document.querySelector(".backButtonArea");
const letterButtons = document.querySelectorAll(".letter-btn");

const dishContentArea = document.querySelector(".dishes-area");


document.addEventListener("DOMContentLoaded", function () {
  
    tabEvenet();
    loadAllCategory();
    loadDishes();
   

});


function togglePanels(panelToShow) {
    const panels = ["payOrder-panelOne", "payOrder-panelTwo", "payOrder-panelThree"];
  
    panels.forEach(panel => {
      const displayStyle = panel === panelToShow ? "block" : "none";
      document.getElementById(panel).style.display = displayStyle;
    });
  
  }
  // =============Tab Move Events=============
  function tabEvenet(){
    takeawayPayOrderPanelOne.style.display='block'
    takeawayPayOrderPaneTwo.style.display='none';
    takeawayPayOrderPanelThree.style.display='none';

    tabOne.addEventListener("click", function () {
        togglePanels("payOrder-panelOne");
        tabOne.classList.add('active')
        tabTwo.classList.remove('active')
        tabThree.classList.remove('active')
      });
      
      tabTwo.addEventListener("click", function () {
        togglePanels("payOrder-panelTwo");
        tabTwo.classList.add('active')
        tabOne.classList.remove('active')
        tabThree.classList.remove('active')
      });
      
      tabThree.addEventListener("click", function () {
        togglePanels("payOrder-panelThree");
        tabThree.classList.add('active')
        tabTwo.classList.remove('active')
        tabOne.classList.remove('active')
      });
      
  }
 


// =============Load All Categories=============
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


// =============selectCategoryCardEvent=============
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
