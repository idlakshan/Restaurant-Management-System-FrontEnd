const dateAndTimeElement = document.getElementById("currentDateAndTime");
const takeawayPayOrderPanelOne = document.querySelector("#payOrder-panelOne");
const takeawayPayOrderPaneTwo = document.querySelector("#payOrder-panelTwo");
const takeawayPayOrderPanelThree = document.querySelector("#payOrder-panelThree");
const orderConfrimPanelTabOne = document.querySelector("#confrim-orderPanel-tabOne");
const orderConfrimPanelTabTwo = document.querySelector("#confrim-orderPanel-tabTwo");
const orderConfrimPanelTabThree = document.querySelector("#confrim-orderPanel-tabThree");

const toDineinToToggle = document.querySelector("#toDineinToggle")

const tabOne = document.getElementById("tab1");
const tabTwo = document.getElementById("tab2");
const tabThree = document.getElementById("tab3");

const container = document.querySelector(".container");

const alphabetArea = document.querySelector(".alphabetArea");
const categoryCardListArea = document.querySelector(".category-items-area");
const dishCardListArea = document.querySelector(".dishes-area");
const backTocategoryList = document.querySelector(".backButtonArea");
const letterButtons = document.querySelectorAll(".letter-btn");

const dishContentArea = document.querySelector(".dishes-area");
const popupArea = document.querySelector(".selectedDishPopup");
const orderConfrimPanelClose = document.querySelector(".close_icon_orderConfrim");

const btnPayTabOne = document.querySelector("#btnPayTab1");
const btnPayTabTwo = document.querySelector("#btnPayTab2");
const btnPayTabThree = document.querySelector("#btnPayTab3");

const orderDiscountTabOne = document.querySelector(".orderDiscountTabOne");
const orderNetTotalTabOne = document.querySelector(".orderNetTotalTabOne");
const orderBalanceTabOne = document.querySelector(".orderBalanceTabOne");

const orderDiscountTabTwo = document.querySelector(".orderDiscountTabTwo");
const orderNetTotalTabTwo = document.querySelector(".orderNetTotalTabTwo");
const orderBalanceTabTwo = document.querySelector(".orderBalanceTabTwo");

const orderDiscountTabThree = document.querySelector(".orderDiscountTabThree");
const orderNetTotalTabThree = document.querySelector(".orderNetTotalTabThree");
const orderBalanceTabThree = document.querySelector(".orderBalanceTabThree");

const customerMobile = document.querySelector('#customer-mobile');
const customerNameTab1 = document.querySelector('#customer-name-tab1');
const customerNameTab2 = document.querySelector('#customer-name-tab2');
const customerNameTab3 = document.querySelector('#customer-name-tab3');
const inputMobileElementTab1 = document.querySelector(".inputCustomer-Mobile-tab1");
const inputMobileElementTab2 = document.querySelector(".inputCustomer-Mobile-tab2");
const inputMobileElementTab3 = document.querySelector(".inputCustomer-Mobile-tab3");


const addCustomerBox = document.querySelector(".addCustomer-box");
const btnAddCustomer = document.querySelector(".btn-addcustomer");
const addCustomerBoxClose = document.querySelector(".addCustomer-box-close-icon");
const keypadButtons = document.querySelectorAll('.btns-addCustomer, .btns-addCustomer-number');
const mobileInput = document.getElementById('dnCustomerMobile');
const nameInput = document.getElementById('dnCustomerName');

let selectedInput;


let activeTab = 1;


document.addEventListener("DOMContentLoaded", function () {
    setInterval(updateTime, 1000);

    tabEvenet();
    loadAllCategory();
    loadDishes();
    searchCustomers();
    addCustomerEvent();
    // paymentType();


});


//============date and time============
function updateTime() {
    const months = [
        "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ];
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = months[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const amOrpm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedDate = `${day} ${month} ${year} | ${formattedHours}.${minutes.toString().padStart(2, '0')} ${amOrpm}`;
    dateAndTimeElement.innerHTML = formattedDate;
}



function togglePanels(panelToShow) {
    const panels = ["payOrder-panelOne", "payOrder-panelTwo", "payOrder-panelThree"];

    panels.forEach(panel => {
        const displayStyle = panel === panelToShow ? "block" : "none";
        document.getElementById(panel).style.display = displayStyle;
    });

}
// =============Tab Move Events=============
function tabEvenet() {
    takeawayPayOrderPanelOne.style.display = 'block'
    takeawayPayOrderPaneTwo.style.display = 'none';
    takeawayPayOrderPanelThree.style.display = 'none';

    tabOne.addEventListener("click", function () {
        togglePanels("payOrder-panelOne");
        tabOne.classList.add('active');
        tabTwo.classList.remove('active');
        tabThree.classList.remove('active');
        activeTab = 1;
    });

    tabTwo.addEventListener("click", function () {
        togglePanels("payOrder-panelTwo");
        tabTwo.classList.add('active');
        tabOne.classList.remove('active');
        tabThree.classList.remove('active');
        activeTab = 2;
    });

    tabThree.addEventListener("click", function () {
        togglePanels("payOrder-panelThree");
        tabThree.classList.add('active');
        tabTwo.classList.remove('active');
        tabOne.classList.remove('active');
        activeTab = 3;
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
        selectedDishPopupTab1(dishes, dishCards);
        selectedDishPopupTab2(dishes, dishCards);
        selectedDishPopupTab3(dishes, dishCards);
        searchDishByLetter(dishCards)

    } catch (error) {
        console.error("Error fetching category data:", error);
    }
}
//=======================================tab One Process================================================================

function selectedDishPopupTab1(dishes, dishCards) {
    dishCards.forEach((dishCard) => {
        dishCard.addEventListener("click", function () {
            if (activeTab === 1) {
                console.log("hello");
                const index = dishCard.getAttribute("data-index");
                displayPopupTabOne(dishes, index);
            }
        });
    });
}
function displayPopupTabOne(dishes, index) {
    const clickedDish = dishes[index];

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
            <button class="btn-addItem btn-addItem-dinein" disabled>Add Item</button>
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
    const btnAddItem = document.querySelector(".btn-addItem");
    const btnInputNumbers = document.querySelectorAll(".btn-number");
    const btnPlus = document.querySelector("#qty-input-btn-plus");
    const btnMinus = document.querySelector("#qty-input-btn-minus");
    const dishBoxTitle = document.querySelector(".dishesBox-title");
    // const selectedItemType = document.querySelector(".selectItemType")
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
                btnAddItem.disabled = false;



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

                btnAddItem.addEventListener("click", function () {
                    addItemToOrderItems("Take-Away");

                });

                function addItemToOrderItems(itemType) {
                    const orderItemsContainer = document.querySelector("#takeawayPanelOne-container");
                    const orderItemtitleName = dishBoxTitle.innerText;
                    const orderItemInputQty = sizeInput.value;
                    const orderItemInputSizenName = sizeBtnContainer.innerText;
                    const orderValues = orderItemInputSizenName.split('\n');
                    const orderType = itemType

                    var total = orderItemInputQty * parseFloat(orderValues[1]);

                    const selectItemCards = document.querySelectorAll(".selectItemCardTab1");
                    let itemExists = false;

                    for (let i = 0; i < selectItemCards.length; i++) {
                        const selectItemCard = selectItemCards[i];
                        const selectItemCardName = selectItemCard.querySelector(".selectItemNameTab1").innerText;
                        const selectItemCardSize = selectItemCard.querySelector(".selectItemSizeTab1").innerText;
                        const selectItemCardType = selectItemCard.querySelector(".selectItemTypeTab1").innerText;
                        const selectItemCardQty = selectItemCard.querySelector(".selectItemQtyTab1");


                        if (selectItemCardName === orderItemtitleName && selectItemCardSize === orderValues[0] && selectItemCardType === orderType) {


                            const priceElement = selectItemCard.querySelector(".selectItemPriceTab1");

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
                        selectOrderItemCards.classList.add("selectItemCardTab1");
                        selectOrderItemCards.innerHTML = ` 
                                        <div class="selectItemCard-left">
                                            <div class="selectItemCard-head">
                                                <h5 class="selectItemName selectItemNameTab1">${orderItemtitleName}</h5>
                                                <h5 class="selectItemSize selectItemSizeTab1">${orderValues[0]}</h5>
                                                <h5 class="selectItemPrice selectItemPriceTab1">${total}</h5>
                                            </div>
        
                                            <div class="selectItemCard-bottom">
                                                <h5 class="selectItemType selectItemTypeTab1">${itemType}</h5>
                                                <h5 class="selectItemQty selectItemQtyTab1">${orderItemInputQty}</h5> 
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
                        let fullTotal = parseFloat(0.0);
                        const fullTotalElement = document.querySelector(".totalTab1");
                        const selectedOrderItemsTotal =
                            document.querySelectorAll(".selectItemPriceTab1");
                        const subTotal = document.querySelector("#subTotalTab1");

                        selectedOrderItemsTotal.forEach((selectedOrderItemTotal) => {
                            const value = selectedOrderItemTotal.innerText;
                            fullTotal += parseFloat(value);
                        });

                        // console.log(fullTotal);
                        fullTotalElement.value = fullTotal.toFixed(2);
                        subTotal.innerText = fullTotal.toFixed(2);
                        orderPayEventTabOne(subTotal.innerText)
                    }

                    CalculateFullTotal();

                    popupArea.style.display = "none";

                    //var orderPanelContent = document.querySelector("#takeawayPanelOne-container");

                    // if (orderPanelContent) {
                    //     var selectItemCardElements = orderPanelContent.querySelectorAll(".selectItemCard");

                    //     for (var i = 0; i < selectItemCardElements.length; i++) {
                    //         var childElement = selectItemCardElements[i];
                    //         var selectedQtyElement = childElement.querySelector(".selectItemQty");
                    //         var selectedPriceElement = childElement.querySelector(".selectItemPrice");
                    //         var selectedQty = selectedQtyElement.innerText;
                    //         var selectedPrice = selectedPriceElement.innerText;
                    //         console.log("Qty for card " + (i + 1) + ": " + selectedQty);
                    //         console.log("Price for card " + (i + 1) + ": " + selectedPrice);
                    //     }
                    // }
                }

            } else {
                sizeBtnContainer.style.border = "none";
                sizeBtnImg.src = "../icons/plusicon.png";
                sizeBtnImg.style.width = "50px";
                sizeBtnImg.style.height = "50px";
                sizeInput.value = "";


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

function orderPayEventTabOne(subTotal) {
    btnPayTabOne.addEventListener('click', function () {
        orderConfrimPanelTabOne.style.display = "flex"
        container.classList.add("container-disabled");

        const newSubTotal = subTotal;
        orderNetTotalTabOne.innerText = newSubTotal;
        orderDiscountTabOne.addEventListener("input", function (event) {
            console.log('TOUCH end', event.target.value);

            const discount = orderDiscountTabOne.value;
            var calcNetTotal = (newSubTotal - ((newSubTotal * discount) / 100))
            orderNetTotalTabOne.innerText = calcNetTotal.toFixed(2);
        });
        paymentType("One")

    })
}


//=======================================tab Two Process================================================================
function selectedDishPopupTab2(dishes, dishCards) {
    dishCards.forEach((dishCard) => {
        dishCard.addEventListener("click", function () {
            if (activeTab === 2) {
                console.log("hello tab2");
                const index = dishCard.getAttribute("data-index");
                displayPopupTabTwo(dishes, index);
            }
        });
    });

}

function displayPopupTabTwo(dishes, index) {
    const clickedDish = dishes[index];

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
            <button class="btn-addItem btn-addItem-dinein" disabled>Add Item</button>
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
    const btnAddItem = document.querySelector(".btn-addItem");
    const btnInputNumbers = document.querySelectorAll(".btn-number");
    const btnPlus = document.querySelector("#qty-input-btn-plus");
    const btnMinus = document.querySelector("#qty-input-btn-minus");
    const dishBoxTitle = document.querySelector(".dishesBox-title");
    // const selectedItemType = document.querySelector(".selectItemType")
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
                btnAddItem.disabled = false;



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

                btnAddItem.addEventListener("click", function () {
                    addItemToOrderItems("Take-Away");

                });

                function addItemToOrderItems(itemType) {
                    const orderItemsContainer = document.querySelector("#takeawayPanelTwo-container");
                    const orderItemtitleName = dishBoxTitle.innerText;
                    const orderItemInputQty = sizeInput.value;
                    const orderItemInputSizenName = sizeBtnContainer.innerText;
                    const orderValues = orderItemInputSizenName.split('\n');
                    const orderType = itemType

                    var total = orderItemInputQty * parseFloat(orderValues[1]);

                    const selectItemCards = document.querySelectorAll(".selectItemCardTab2");
                    let itemExists = false;

                    for (let i = 0; i < selectItemCards.length; i++) {
                        const selectItemCard = selectItemCards[i];
                        const selectItemCardName = selectItemCard.querySelector(".selectItemNameTab2").innerText;
                        const selectItemCardSize = selectItemCard.querySelector(".selectItemSizeTab2").innerText;
                        const selectItemCardType = selectItemCard.querySelector(".selectItemTypeTab2").innerText;
                        const selectItemCardQty = selectItemCard.querySelector(".selectItemQtyTab2");


                        if (selectItemCardName === orderItemtitleName && selectItemCardSize === orderValues[0] && selectItemCardType === orderType) {


                            const priceElement = selectItemCard.querySelector(".selectItemPriceTab2");

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
                        selectOrderItemCards.classList.add("selectItemCardTab2");
                        selectOrderItemCards.innerHTML = ` 
                                        <div class="selectItemCard-left">
                                            <div class="selectItemCard-head">
                                                <h5 class="selectItemName selectItemNameTab2">${orderItemtitleName}</h5>
                                                <h5 class="selectItemSize selectItemSizeTab2">${orderValues[0]}</h5>
                                                <h5 class="selectItemPrice selectItemPriceTab2">${total}</h5>
                                            </div>
        
                                            <div class="selectItemCard-bottom">
                                                <h5 class="selectItemType selectItemTypeTab2">${itemType}</h5>
                                                <h5 class="selectItemQty selectItemQtyTab2">${orderItemInputQty}</h5> 
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
                        let fullTotal = parseFloat(0.0);
                        const fullTotalElement = document.querySelector("#totalTab2");
                        const selectedOrderItemsTotal =
                            document.querySelectorAll(".selectItemPriceTab2");
                        const subTotal = document.querySelector("#subTotalTab2");

                        selectedOrderItemsTotal.forEach((selectedOrderItemTotal) => {
                            const value = selectedOrderItemTotal.innerText;
                            fullTotal += parseFloat(value);
                        });

                        // console.log(fullTotal);
                        fullTotalElement.value = fullTotal.toFixed(2);
                        subTotal.innerText = fullTotal.toFixed(2);
                        orderPayEventTabTwo(subTotal.innerText)
                    }

                    CalculateFullTotal();


                    popupArea.style.display = "none";

                    // var orderPanelContent = document.querySelector("#takeawayPanelTwo-container");

                    // if (orderPanelContent) {
                    //     var selectItemCardElements = orderPanelContent.querySelectorAll(".selectItemCard");

                    //     for (var i = 0; i < selectItemCardElements.length; i++) {
                    //         var childElement = selectItemCardElements[i];
                    //         var selectedQtyElement = childElement.querySelector(".selectItemQty");
                    //         var selectedPriceElement = childElement.querySelector(".selectItemPrice");
                    //         var selectedQty = selectedQtyElement.innerText;
                    //         var selectedPrice = selectedPriceElement.innerText;
                    //         console.log("Qty for card " + (i + 1) + ": " + selectedQty);
                    //         console.log("Price for card " + (i + 1) + ": " + selectedPrice);
                    //     }
                    // }
                }

            } else {
                sizeBtnContainer.style.border = "none";
                sizeBtnImg.src = "../icons/plusicon.png";
                sizeBtnImg.style.width = "50px";
                sizeBtnImg.style.height = "50px";
                sizeInput.value = "";


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

function orderPayEventTabTwo(subTotal) {
    btnPayTabTwo.addEventListener('click', function () {
        orderConfrimPanelTabTwo.style.display = "flex"
        container.classList.add("container-disabled");

        const newSubTotal = subTotal;
        orderNetTotalTabTwo.innerText = newSubTotal;
        orderDiscountTabTwo.addEventListener("input", function (event) {
            console.log('TOUCH end', event.target.value);

            const discount = orderDiscountTabTwo.value;
            var calcNetTotal = (newSubTotal - ((newSubTotal * discount) / 100))
            orderNetTotalTabTwo.innerText = calcNetTotal.toFixed(2);
        });
        paymentType("Two");

    })
}




//=======================================tab Three Process================================================================
function selectedDishPopupTab3(dishes, dishCards) {
    dishCards.forEach((dishCard) => {
        dishCard.addEventListener("click", function () {
            if (activeTab === 3) {
                console.log("hello tab3");
                const index = dishCard.getAttribute("data-index");
                displayPopupTabThree(dishes, index);
            }
        });
    });

}

function displayPopupTabThree(dishes, index) {
    const clickedDish = dishes[index];

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
            <button class="btn-addItem btn-addItem-dinein" disabled>Add Item</button>
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
    const btnAddItem = document.querySelector(".btn-addItem");
    const btnInputNumbers = document.querySelectorAll(".btn-number");
    const btnPlus = document.querySelector("#qty-input-btn-plus");
    const btnMinus = document.querySelector("#qty-input-btn-minus");
    const dishBoxTitle = document.querySelector(".dishesBox-title");
    // const selectedItemType = document.querySelector(".selectItemType")
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
                btnAddItem.disabled = false;



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

                btnAddItem.addEventListener("click", function () {
                    addItemToOrderItems("Take-Away");

                });

                function addItemToOrderItems(itemType) {
                    const orderItemsContainer = document.querySelector("#takeawayPanelThree-container");
                    const orderItemtitleName = dishBoxTitle.innerText;
                    const orderItemInputQty = sizeInput.value;
                    const orderItemInputSizenName = sizeBtnContainer.innerText;
                    const orderValues = orderItemInputSizenName.split('\n');
                    const orderType = itemType

                    var total = orderItemInputQty * parseFloat(orderValues[1]);

                    const selectItemCards = document.querySelectorAll(".selectItemCardTab3");
                    let itemExists = false;

                    for (let i = 0; i < selectItemCards.length; i++) {
                        const selectItemCard = selectItemCards[i];
                        const selectItemCardName = selectItemCard.querySelector(".selectItemNameTab3").innerText;
                        const selectItemCardSize = selectItemCard.querySelector(".selectItemSizeTab3").innerText;
                        const selectItemCardType = selectItemCard.querySelector(".selectItemTypeTab3").innerText;
                        const selectItemCardQty = selectItemCard.querySelector(".selectItemQtyTab3");


                        if (selectItemCardName === orderItemtitleName && selectItemCardSize === orderValues[0] && selectItemCardType === orderType) {


                            const priceElement = selectItemCard.querySelector(".selectItemPriceTab3");

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
                        selectOrderItemCards.classList.add("selectItemCardTab3");
                        selectOrderItemCards.innerHTML = ` 
                                        <div class="selectItemCard-left">
                                            <div class="selectItemCard-head">
                                                <h5 class="selectItemName selectItemNameTab3">${orderItemtitleName}</h5>
                                                <h5 class="selectItemSize selectItemSizeTab3">${orderValues[0]}</h5>
                                                <h5 class="selectItemPrice selectItemPriceTab3">${total}</h5>
                                            </div>
        
                                            <div class="selectItemCard-bottom">
                                                <h5 class="selectItemType selectItemTypeTab3">${itemType}</h5>
                                                <h5 class="selectItemQty selectItemQtyTab3">${orderItemInputQty}</h5> 
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
                        let fullTotal = parseFloat(0.0);
                        const fullTotalElement = document.querySelector("#totalTab3");
                        const selectedOrderItemsTotal =
                            document.querySelectorAll(".selectItemPriceTab3");
                        const subTotal = document.querySelector("#subTotalTab3");

                        selectedOrderItemsTotal.forEach((selectedOrderItemTotal) => {
                            const value = selectedOrderItemTotal.innerText;
                            fullTotal += parseFloat(value);
                        });

                        // console.log(fullTotal);
                        fullTotalElement.value = fullTotal.toFixed(2);
                        subTotal.innerText = fullTotal.toFixed(2);
                        orderPayEventTabThree(subTotal.innerText)
                    }

                    CalculateFullTotal();


                    popupArea.style.display = "none";

                    // var orderPanelContent = document.querySelector("#takeawayPanelTwo-container");

                    // if (orderPanelContent) {
                    //     var selectItemCardElements = orderPanelContent.querySelectorAll(".selectItemCard");

                    //     for (var i = 0; i < selectItemCardElements.length; i++) {
                    //         var childElement = selectItemCardElements[i];
                    //         var selectedQtyElement = childElement.querySelector(".selectItemQty");
                    //         var selectedPriceElement = childElement.querySelector(".selectItemPrice");
                    //         var selectedQty = selectedQtyElement.innerText;
                    //         var selectedPrice = selectedPriceElement.innerText;
                    //         console.log("Qty for card " + (i + 1) + ": " + selectedQty);
                    //         console.log("Price for card " + (i + 1) + ": " + selectedPrice);
                    //     }
                    // }
                }

            } else {
                sizeBtnContainer.style.border = "none";
                sizeBtnImg.src = "../icons/plusicon.png";
                sizeBtnImg.style.width = "50px";
                sizeBtnImg.style.height = "50px";
                sizeInput.value = "";


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

function orderPayEventTabThree(subTotal) {
    btnPayTabThree.addEventListener('click', function () {
        orderConfrimPanelTabThree.style.display = "flex"
        container.classList.add("container-disabled");

        const newSubTotal = subTotal;
        orderNetTotalTabThree.innerText = newSubTotal;
        orderDiscountTabThree.addEventListener("input", function (event) {
            console.log('TOUCH end', event.target.value);

            const discount = orderDiscountTabThree.value;
            var calcNetTotal = (newSubTotal - ((newSubTotal * discount) / 100))
            orderNetTotalTabThree.innerText = calcNetTotal.toFixed(2);
        });
        paymentType("Three")


    })
}



function paymentType(tabNumber) {
    console.log(tabNumber);
    
    const inputPayCash = document.querySelector(`#inputpaycash${tabNumber}`);
    const inputPayCard = document.querySelector(`#inputpaycard${tabNumber}`);
    const inputPayCredit = document.querySelector(`#inputpaycredit${tabNumber}`);
    const orderNetTotal = document.querySelector(`#netTotal${tabNumber}`);
    const orderBalance = document.querySelector(`.orderBalance${tabNumber}`);

    function clearInput(inputElement) {
        inputElement.addEventListener("click", function () {
            inputElement.value = "";
        });
    }

    function handleKeyPress(inputElement) {
        inputElement.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                orderBalance.innerText =
                    parseFloat(inputPayCash.value) + parseFloat(inputPayCard.value) + parseFloat(inputPayCredit.value) - parseFloat(orderNetTotal.innerText);
            }
        });
    }

    clearInput(inputPayCash);
    clearInput(inputPayCard);
    clearInput(inputPayCredit);

    handleKeyPress(inputPayCash);
    handleKeyPress(inputPayCard);
    handleKeyPress(inputPayCredit);

}

//============Search Customers============
async function searchCustomers() {
    try {
        const response = await fetch("../json/customers.json");
        const customers = await response.json();

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
            customerMobile.appendChild(option);
        });

        inputMobileElementTab1.addEventListener('change', function () {
            const selectedMobileNumber = inputMobileElementTab1.value;
            const index = mobileNumbers.indexOf(selectedMobileNumber);
            //console.log(index);

            if (index !== -1) {
                customerNameTab1.innerText = customerNames[index];
                customerIds[index]
                //console.log(customerNames[index]);
                //console.log(customerIds[index]);
            } else {
                inputMobileElementTab1.value = ""
                customerNameTab1.innerText = '';
            }

        })


        inputMobileElementTab2.addEventListener('change', function () {
            const selectedMobileNumber = inputMobileElementTab2.value;
            const index = mobileNumbers.indexOf(selectedMobileNumber);
            //console.log(index);

            if (index !== -1) {
                customerNameTab2.innerText = customerNames[index];
                customerIds[index]
                //console.log(customerNames[index]);
                //console.log(customerIds[index]);
            } else {
                inputMobileElementTab2.value = ""
                customerNameTab2.innerText = '';
            }

        })



        inputMobileElementTab3.addEventListener('change', function () {
            const selectedMobileNumber = inputMobileElementTab3.value;
            const index = mobileNumbers.indexOf(selectedMobileNumber);
            //console.log(index);

            if (index !== -1) {
                customerNameTab3.innerText = customerNames[index];
                customerIds[index]
                //console.log(customerNames[index]);
                //console.log(customerIds[index]);
            } else {
                inputMobileElementTab3.value = ""
                customerNameTab3.innerText = '';
            }

        })

    } catch (error) {
        console.error("Error fetching category data:", error);
    }

}


//============cashier add-customerbox Popup and Close Events============

function addCustomerEvent() {
    btnAddCustomer.addEventListener('click', function () {
        addCustomerBox.style.display = "block"
    })

    addCustomerBoxClose.addEventListener('click', function () {
        addCustomerBox.style.display = "none"
    })

    keypadButtons.forEach(button => {
        button.addEventListener('click', handleButtonClick);
    });

    mobileInput.addEventListener('focus', () => {
        selectedInput = mobileInput;
    });

    nameInput.addEventListener('focus', () => {
        selectedInput = nameInput;
    });
}


function handleButtonClick(event) {
    const buttonValue = event.target.textContent;

    if (selectedInput == nameInput) {
        if (buttonValue === '←') {
            selectedInput.value = selectedInput.value.slice(0, -1);
        } else if (buttonValue === 'Space') {
            selectedInput.value += ' ';
        } else if (/^[a-zA-Z]+$/.test(buttonValue)) {
            selectedInput.value += buttonValue.toLowerCase();
        }
    } else if (selectedInput == mobileInput) {
        if (buttonValue === '←') {
            selectedInput.value = selectedInput.value.slice(0, -1);
        } else if (/^[0-9]$/.test(buttonValue)) {
            selectedInput.value += buttonValue;
        }
    }
}


//============Search Dishes============
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