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

const btnPay = document.querySelector(".btn-pay");
const orderConfrimPanel = document.querySelector(".confrim-orderPanel");
const orderConfrimPanelClose = document.querySelector(".close_icon_orderConfrim");
const container = document.querySelector(".container");









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

        //************popup box dishes-Size-buttons click event************
        const sizeBtnContainers = document.querySelectorAll(".size-input-container");
        const sizeBtns = document.querySelectorAll(".size-btn");
        const sizeInput = document.querySelector(".qty-input");
        const btnDinein = document.querySelector(".btn-addItem-dinein");
        const btnTakeaway = document.querySelector(".btn-addItem-takeaway");
        const btnInputNumbers = document.querySelectorAll(".btn-number");
        const btnPlus = document.querySelector("#qty-input-btn-plus");
        const btnMinus = document.querySelector("#qty-input-btn-minus");
        const dishBoxTitle = document.querySelector(".dishesBox-title");
        const selectedItemType = document.querySelector(".selectItemType")
        let clickedNumbers = '';



        //============dishes-Size-buttons disabled-enabled============
        sizeBtns.forEach((sizeBtn) => {
            sizeBtn.addEventListener("click", function () {
                sizeBtn.style.border = "none";
                sizeBtn.style.outline = "none";
                sizeBtn.disabled = false;

                disableOtherButtons(sizeBtn);
            });
        });

        function disableOtherButtons(clickedBtn) {
            sizeBtns.forEach((sizeBtn) => {
                if (sizeBtn !== clickedBtn) {
                    sizeBtn.disabled = true;
                    // sizeBtnsPrice.style.display="none";
                    // sizeBtnContainers.disabled=true;
                }
            });
        }

        sizeBtnContainers.forEach((sizeBtnContainer) => {
            const sizeBtnImg = sizeBtnContainer.querySelector(".size-btn-img");
            let isClicked = false;

            sizeBtnContainer.addEventListener("click", function () {
                isClicked = !isClicked

                if (isClicked) {

                    btnPlus.disabled = false;
                    btnMinus.disabled = false;

                    //============change popupBox sizebtn colored and icon by clicked it============
                    sizeBtnContainer.style.border = "2px solid var(--text-field-success)";
                    sizeBtnImg.src = "../icons/correct.png";
                    sizeBtnImg.style.width = "40px";
                    sizeBtnImg.style.height = "40px";
                    sizeInput.value = "1";
                    btnDinein.disabled = false;
                    btnTakeaway.disabled = false;


                    btnInputNumbers.forEach((btnInputNumber) => {
                        btnInputNumber.disabled = false;

                        //============change qtyInput value by clicked Numbers============
                        btnInputNumber.addEventListener("click", function () {
                            const clickedNumber = btnInputNumber.innerHTML;
                            clickedNumbers += clickedNumber;
                            //console.log(clickedNumbers);
                            sizeInput.value = clickedNumbers;

                        });
                    });

                    //============change qtyInput value by clicked plus Minus Buttons============
                    btnPlus.addEventListener('click', function () {
                        const currentValue = parseInt(sizeInput.value);
                        sizeInput.value = currentValue + 1;
                    });

                    btnMinus.addEventListener('click', function () {
                        const currentValue = parseInt(sizeInput.value);
                        if (currentValue === 1) {
                            sizeInput.value = "1";
                        } else {
                            sizeInput.value = currentValue - 1;
                        }
                    });


                    //============added cart to selected items============

                    btnDinein.addEventListener("click", function () {
                        addItemToOrderItems("Dine-In");

                    });

                    btnTakeaway.addEventListener("click", function () {
                        addItemToOrderItems("Take-Away");

                    });

                    function addItemToOrderItems(itemType) {
                        const orderItemsContainer = document.querySelector(".cashier-dinein-right-inner-content-body-middle");
                        const orderItemtitleName = dishBoxTitle.innerText;
                        const orderItemInputQty = sizeInput.value;
                        const orderItemInputSizenName = sizeBtnContainer.innerText;
                        const orderValues = orderItemInputSizenName.split('\n');
                        const orderType = itemType

                        var total = orderItemInputQty * parseFloat(orderValues[1]);

                        const selectItemCards = document.querySelectorAll(".selectItemCard");
                        let itemExists = false;

                        for (let i = 0; i < selectItemCards.length; i++) {
                            const selectItemCard = selectItemCards[i];
                            const selectItemCardName = selectItemCard.querySelector(".selectItemName").innerText;
                            const selectItemCardSize = selectItemCard.querySelector(".selectItemSize").innerText;
                            const selectItemCardType = selectItemCard.querySelector(".selectItemType").innerText;
                            const selectItemCardQty = selectItemCard.querySelector(".selectItemQty");


                            if (selectItemCardName === orderItemtitleName && selectItemCardSize === orderValues[0] && selectItemCardType === orderType) {


                                const priceElement = selectItemCard.querySelector(".selectItemPrice");

                                const currentQty = parseInt(selectItemCardQty.innerText);
                                var newQty = currentQty + parseInt(orderItemInputQty);
                                selectItemCardQty.innerText = newQty;


                                const currentPrice = parseFloat(priceElement.innerText);
                                const newPrice = currentPrice + total;
                                priceElement.innerText = newPrice;

                                itemExists = true;
                                popupArea.style.display = "none";

                                break;
                            }
                        }

                        if (!itemExists) {
                            const selectOrderItemCards = document.createElement("div");
                            selectOrderItemCards.classList.add("selectItemCard");
                            selectOrderItemCards.innerHTML = ` 
                                    <div class="selectItemCard-left">
                                        <div class="selectItemCard-head">
                                            <h5 class="selectItemName">${orderItemtitleName}</h5>
                                            <h5 class="selectItemSize">${orderValues[0]}</h5>
                                            <h5 class="selectItemPrice">${total}</h5>
                                        </div>
    
                                        <div class="selectItemCard-bottom">
                                            <h5 class="selectItemType">${itemType}</h5>
                                            <h5 class="selectItemQty">${orderItemInputQty}</h5> 
                                        </div>
                                    </div>
                                    <div class="selectItemCard-right">
                                        <img class="imgDustbin" src="../icons/dustbin.png"  width="50%"
                                        alt="">
                                    </div>
                                `;
                            selectOrderItemCards.style.display = "flex";
                            orderItemsContainer.appendChild(selectOrderItemCards);
                            popupArea.style.display = "none";


                        }

                        //============delete selected items from the order cart============
                        const selectedOrderItemsDelete = document.querySelectorAll(".imgDustbin");
                        selectedOrderItemsDelete.forEach((selectedOrderItemDelete) => {
                            selectedOrderItemDelete.addEventListener("click", function () {
                                //console.log("delete");
                                const selectItemCard = selectedOrderItemDelete.closest(".selectItemCard");
                                if (selectItemCard) {
                                    selectItemCard.remove();
                                    CalculateFullTotal();
                                }
                            });
                        });

                        //============calcutale full total============
                        function CalculateFullTotal() {
                            let fullTakeawayTotal = parseFloat(0.00);
                            let fullDineinTotal = parseFloat(0.00);

                            const fullTakeawayTotalElement = document.querySelector(".tk-total");
                            const fullDineinTotalElement = document.querySelector(".di-total");
                            const selectedOrderItemsTotal = document.querySelectorAll(".selectItemPrice");
                            const subTotal = document.querySelector(".subTotal");

                            selectedOrderItemsTotal.forEach((selectedOrderItemTotal) => {
                                const selectItemCard = selectedOrderItemTotal.closest(".selectItemCard");
                                const selectItemCardType = selectItemCard.querySelector(".selectItemType").innerText;
                                const value = parseFloat(selectedOrderItemTotal.innerText);

                                if (selectItemCardType === "Take-Away") {
                                    fullTakeawayTotal += value;

                                } else if (selectItemCardType === "Dine-In") {
                                    fullDineinTotal += value;

                                }
                            });

                            //console.log(fullTakeawayTotal.toFixed(2));
                            fullTakeawayTotalElement.value = fullTakeawayTotal.toFixed(2);
                            fullDineinTotalElement.value = fullDineinTotal.toFixed(2);


                            subTotal.innerText = (fullTakeawayTotal + fullDineinTotal).toFixed(2);
                        }

                        CalculateFullTotal();



                        popupArea.style.display = "none";

                        var orderPanelContent = document.querySelector(".cashier-dinein-right-inner-content-body-middle");

                        if (orderPanelContent) {
                            var selectItemCardElements = orderPanelContent.querySelectorAll(".selectItemCard");

                            for (var i = 0; i < selectItemCardElements.length; i++) {
                                var childElement = selectItemCardElements[i];
                                var selectedQtyElement = childElement.querySelector(".selectItemQty");
                                var selectedPriceElement = childElement.querySelector(".selectItemPrice");
                                var selectedQty = selectedQtyElement.innerText;
                                var selectedPrice = selectedPriceElement.innerText;
                                console.log("Qty for card " + (i + 1) + ": " + selectedQty);
                                console.log("Price for card " + (i + 1) + ": " + selectedPrice);
                            }
                        }




                    }

                } else {
                    sizeBtnContainer.style.border = "none";
                    sizeBtnImg.src = "../assets/icons/plusicon.png";
                    sizeBtnImg.style.width = "50px";
                    sizeBtnImg.style.height = "50px";
                    sizeInput.value = "";
                    btnAddItem.disabled = true;

                    btnInputNumbers.forEach((btnInputNumber) => {
                        btnInputNumber.disabled = true;
                    });

                    btnPlus.disabled = true;
                    btnMinus.disabled = true;

                    sizeBtns.forEach((btn) => {
                        btn.disabled = false;
                    });
                }

            });

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


btnPay.addEventListener("click", function () {
    orderConfrimPanel.style.display = "flex"
    container.classList.add("container-disabled")

})

orderConfrimPanelClose.addEventListener("click", function () {
    orderConfrimPanel.style.display = "none"
    container.classList.remove("container-disabled")
})