const categoryCardList = document.querySelectorAll(".catergory-card");
const categoryCardListArea = document.querySelector(".category-items-area");
const dishCardListArea = document.querySelector(".dishes-area");
const alphabetArea = document.querySelector(".alphabetArea");
const tableArea = document.querySelector(".tableArea");
const backTocategoryList = document.querySelector(".backButtonArea");
const letterButtons = document.querySelectorAll(".letter-btn");



const customerMobile = document.querySelector(".customer-mobile-input");
const numbericKeypad = document.querySelector(".numberic-keypad");
const numberkeys = document.querySelectorAll('.letter');
const keyEnter = document.querySelector(".enter");
const keyBackspace = document.querySelector(".delete");
const customerMobileDataList = document.getElementById('customer-mobile');
const customerName = document.getElementById('customer-name');

const dishContentArea = document.querySelector(".dishes-area");
const popupArea = document.querySelector(".selectedDishPopup");


document.addEventListener("DOMContentLoaded", function () {
    selectCategoryCardEvent();
    selectCustomerMobileEvent();
    loadDishes();
    searchCustomers();

});



// =============selectCategoryCardEvent=============
function selectCategoryCardEvent() {
    categoryCardList.forEach((categoryCard) => {
        categoryCard.addEventListener("click", function () {
            categoryCardListArea.style.display = "none"
            tableArea.style.display = "none"
            dishCardListArea.style.display = "flex"
            alphabetArea.style.display = "flex"
        })
    })

    backTocategoryList.addEventListener('click', function () {
        categoryCardListArea.style.display = "flex"
        tableArea.style.display = "flex"
        dishCardListArea.style.display = "none"
        alphabetArea.style.display = "none"
    })

}


// =============selectCustomerMobileEvent=============
function selectCustomerMobileEvent() {
    customerMobile.addEventListener("click", function () {
        numbericKeypad.style.display = 'block'

    });
    numberkeys.forEach((numberKey) => {
        numberKey.addEventListener('click', function () {
            customerMobile.value += numberKey.textContent;
        })
    });

    keyBackspace.addEventListener('click', () => {
        customerMobile.value = customerMobile.value.slice(0, -1);
    });

    keyEnter.addEventListener("click", function () {
        numbericKeypad.style.display = 'none'
    })
}




// =============Load All dishes=============
function loadDishes() {
    fetch("../json/disehs.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (dishes) {
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
                const dishCards = document.querySelectorAll(".dishcard");
                selectedDishPopup(dishes, dishCards);
                searchDishByLetter(dishCards)
            }
        })

}

function selectedDishPopup(dishes, dishCards) {

    dishCards.forEach((dishCard) => {
        dishCard.addEventListener("click", function () {
            console.log("hello");
            const index = dishCard.getAttribute("data-index");
            displayPopup(index);

        });
    });

    function displayPopup(index) {
        const clickedDish = dishes[index];
        //console.log(clickedDish.dishId);
        popupArea.innerHTML = `

            <div class="dishesBox-head" data-id="${clickedDish.dishId}">
                <h4 class="dishesBox-title">${clickedDish.dishName}</h4>
                <img class="dishesBox-close-icon" src="../icons/close_icon.png" alt="">
            </div>
            <div class="dishesBox-body">
            <div class="dishesBox-body-left">
            <div class="qty-input-container">
                <button class="qty-input-btn" id="qty-input-btn-minus" disabled>-</button>
                <input class="qty-input" type="text">
                <button class="qty-input-btn" id="qty-input-btn-plus" disabled>+</button>
            </div>

            <div class="size-input-container">
                <button class="size-btn"><span><img class="size-btn-img" src="../icons/plusicon.png"
                            height="50px" alt=""></span>${clickedDish.dishSize.sizeOne}</button>
                <label class="size-input" for="">${clickedDish.dishPrice.small}</label>
            </div>
            <div class="size-input-container">
                <button class="size-btn"><span><img class="size-btn-img" src="../icons/plusicon.png"
                            height="50px" alt=""></span>${clickedDish.dishSize.sizeTwo}</button>
                <label class="size-input" for="">${clickedDish.dishPrice.medium}</label>
            </div>

            <div class="size-input-container">
                <button class="size-btn"><span><img class="size-btn-img" src="../icons/plusicon.png"
                            height="50px" alt=""></span>${clickedDish.dishSize.sizeThree}</button>
                <label class="size-input" for="">${clickedDish.dishPrice.large}</label>
            </div>
            </div>
            <div class="dishesBox-body-right">
            <ul class="number-area">
                <li>
                    <button class="btn-number" disabled>1</button>
                </li>
                <li>
                    <button class="btn-number" disabled>2</button>
                </li>
                <li>
                    <button class="btn-number" disabled>3</button>
                </li>
                <li>
                    <button class="btn-number" disabled>4</button>
                </li>
                <li>
                    <button class="btn-number" disabled>5</button>
                </li>
                <li>
                    <button class="btn-number" disabled>6</button>
                </li>
                <li>
                    <button class="btn-number" disabled>7</button>
                </li>
                <li>
                    <button class="btn-number" disabled>8</button>
                </li>
                <li>
                    <button class="btn-number" disabled>9</button>
                </li>
                <li>
                    <button class="btn-number" disabled>0</button>
                </li>
            </ul>
            </div>
            </div>
            <div class="dishesBox-footer">
                <button class="btn-addItem-takeaway" disabled>Take away</button>
                <button class="btn-addItem-dinein" disabled>Dine-in</button>
            </div>

            `;

        popupArea.style.display = "block";

        //============Display popup box Close============
        const popupBoxClose = document.querySelector(".dishesBox-close-icon");
        popupBoxClose.addEventListener('click', function () {
            popupArea.style.display = "none";
        });

    }
}


function searchDishByLetter(dishCards) {
    letterButtons.forEach(letterButton => {
        letterButton.addEventListener('click', function () {
            const clickedLetter = letterButton.textContent.toLowerCase();
            //console.log("Clicked Letter:", clickedLetter);

            dishCards.forEach(dishCard => {
                const dishName = dishCard.getAttribute("data-name").toLowerCase();
                //console.log("dishName  " + dishName)

                if (dishName.startsWith(clickedLetter)) {
                    dishCard.style.display = "block";
                } else {
                    dishCard.style.display = "none";
                }
            });
        });
    });

    dishContentArea.addEventListener("click", () => {
        dishCards.forEach(dishCard => {
            dishCard.style.display = "block";
        });

        // letterButtons.forEach((letterButton) => {
        //     letterButton.classList.remove("active")
        // })
    });
}

function searchCustomers() {
    fetch("../json/customers.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (customers) {
            const mobileNumbers = customers.map(function (customer) {
                return customer.mobile;
            });

            const customerNames = customers.map(function (customer) {
                return customer.name;
            });

            const customerIds = customers.map(function (customer) {
                return customer.cusId;
            });

            mobileNumbers.forEach(function (number) {
                const option = document.createElement('option');
                option.value = number;
                customerMobileDataList.appendChild(option);
              });

        });
}

