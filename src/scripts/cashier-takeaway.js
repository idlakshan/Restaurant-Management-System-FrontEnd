const dateAndTimeElement = document.getElementById("currentDateAndTime");
const takeawayPayOrderPanelOne = document.querySelector("#payOrder-panelOne");
const takeawayPayOrderPaneTwo = document.querySelector("#payOrder-panelTwo");
const takeawayPayOrderPanelThree = document.querySelector("#payOrder-panelThree");
const orderConfrimPanelTabOne = document.querySelector("#confrim-orderPanel-tabOne");

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

const btnPay = document.querySelector(".btn-pay");

const orderDiscountTabOne = document.querySelector(".orderDiscountTabOne");
const orderNetTotalTabOne = document.querySelector(".orderNetTotalTabOne");
const orderBalanceTabOne = document.querySelector(".orderBalanceTabOne");

const orderDiscountTabTwo = document.querySelector(".orderDiscountTabTwo");
const orderNetTotalTabTwo = document.querySelector(".orderNetTotalTabTwo");
const orderBalanceTabTwo = document.querySelector(".orderBalanceTabTwo");

const orderDiscountTabThree = document.querySelector(".orderDiscountTabThree");
const orderNetTotalTabThree = document.querySelector(".orderNetTotalTabThree");
const orderBalanceTabThree = document.querySelector(".orderBalanceTabThree");

let activeTab = 1;


document.addEventListener("DOMContentLoaded", function () {
    updateTime();
    tabEvenet();
    loadAllCategory();
    loadDishes();


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
        //selectedDishPopupTab3(dishes, dishCards);
        // searchDishByLetter(dishCards)

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
                displayPopupTabOne(dishes,index);
            }
        });
    });
}
    function displayPopupTabOne(dishes,index) {
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
                            let fullTotal = parseFloat(0.0);
                            const fullTotalElement = document.querySelector(".totalTab1");
                            const selectedOrderItemsTotal =
                                document.querySelectorAll(".selectItemPrice");
                            const subTotal = document.querySelector(".subTotal");

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

                        var orderPanelContent = document.querySelector("#takeawayPanelOne-container");

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
    btnPay.addEventListener('click', function () {
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

    })
}


//=======================================tab Two Process================================================================
function selectedDishPopupTab2(dishes, dishCards) {
    dishCards.forEach((dishCard) => {
        dishCard.addEventListener("click", function () {
            if (activeTab === 2) {
                console.log("hello tab2");
                const index = dishCard.getAttribute("data-index");
                displayPopupTabTwo(dishes,index);
            }
        });
    });

}
     
    function displayPopupTabTwo(dishes,index){
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
    }













// function selectedDishPopupTab1(dishes, dishCards) {

//     dishCards.forEach((dishCard) => {
//         dishCard.addEventListener("click", function () {
//             console.log("hello");
//             const index = dishCard.getAttribute("data-index");
//             displayPopup(index);

//         });
//     });

//     function displayPopup(index) {
//         const clickedDish = dishes[index];
//         //console.log(clickedDish.dishId);
//         popupArea.innerHTML = `
    
//                 <div class="dishesBox-head" data-id="${clickedDish.dishId}">
//                     <h4 class="dishesBox-title">${clickedDish.dishName}</h4>
//                     <img class="dishesBox-close-icon" src="../icons/close_icon.png" alt="">
//                 </div>
//                 <div class="dishesBox-body">
//                 <div class="dishesBox-body-left">
//                 <div class="qty-input-container">
//                     <button class="qty-input-btn" id="qty-input-btn-minus" disabled>-</button>
//                     <input class="qty-input" type="text">
//                     <button class="qty-input-btn" id="qty-input-btn-plus" disabled>+</button>
//                 </div>
    
//                 <div class="size-input-container">
//                     <button class="size-btn"><span><img class="size-btn-img" src="../icons/plusicon.png"
//                                 height="50px" alt=""></span>${clickedDish.dishSize.sizeOne}</button>
//                     <label class="size-input" for="">${clickedDish.dishPrice.small}</label>
//                 </div>
//                 <div class="size-input-container">
//                     <button class="size-btn"><span><img class="size-btn-img" src="../icons/plusicon.png"
//                                 height="50px" alt=""></span>${clickedDish.dishSize.sizeTwo}</button>
//                     <label class="size-input" for="">${clickedDish.dishPrice.medium}</label>
//                 </div>
    
//                 <div class="size-input-container">
//                     <button class="size-btn"><span><img class="size-btn-img" src="../icons/plusicon.png"
//                                 height="50px" alt=""></span>${clickedDish.dishSize.sizeThree}</button>
//                     <label class="size-input" for="">${clickedDish.dishPrice.large}</label>
//                 </div>
//                 </div>
//                 <div class="dishesBox-body-right">
//                 <ul class="number-area">
//                     <li>
//                         <button class="btn-number" disabled>1</button>
//                     </li>
//                     <li>
//                         <button class="btn-number" disabled>2</button>
//                     </li>
//                     <li>
//                         <button class="btn-number" disabled>3</button>
//                     </li>
//                     <li>
//                         <button class="btn-number" disabled>4</button>
//                     </li>
//                     <li>
//                         <button class="btn-number" disabled>5</button>
//                     </li>
//                     <li>
//                         <button class="btn-number" disabled>6</button>
//                     </li>
//                     <li>
//                         <button class="btn-number" disabled>7</button>
//                     </li>
//                     <li>
//                         <button class="btn-number" disabled>8</button>
//                     </li>
//                     <li>
//                         <button class="btn-number" disabled>9</button>
//                     </li>
//                     <li>
//                         <button class="btn-number" disabled>0</button>
//                     </li>
//                 </ul>
//                 </div>
//                 </div>
//                 <div class="dishesBox-footer">
//                     <button class="btn-addItem btn-addItem-dinein" disabled>Add Item</button>
//                 </div>
    
//                 `;

//         popupArea.style.display = "block";

//         //============Display popup box Close============
//         const popupBoxClose = document.querySelector(".dishesBox-close-icon");
//         popupBoxClose.addEventListener('click', function () {
//             popupArea.style.display = "none";
//         });

//         //************popup box dishes-Size-buttons click event************
//         const sizeBtnContainers = document.querySelectorAll(".size-input-container");
//         const sizeBtns = document.querySelectorAll(".size-btn");
//         const sizeInput = document.querySelector(".qty-input");
//         const btnAddItem = document.querySelector(".btn-addItem");
//         const btnInputNumbers = document.querySelectorAll(".btn-number");
//         const btnPlus = document.querySelector("#qty-input-btn-plus");
//         const btnMinus = document.querySelector("#qty-input-btn-minus");
//         const dishBoxTitle = document.querySelector(".dishesBox-title");
//         // const selectedItemType = document.querySelector(".selectItemType")
//         let clickedNumbers = '';



//         //============dishes-Size-buttons disabled-enabled============
//         sizeBtns.forEach((sizeBtn) => {
//             sizeBtn.addEventListener("click", function () {
//                 sizeBtn.style.border = "none";
//                 sizeBtn.style.outline = "none";
//                 sizeBtn.disabled = false;

//                 disableOtherButtons(sizeBtn);
//             });
//         });

//         function disableOtherButtons(clickedBtn) {
//             sizeBtns.forEach((sizeBtn) => {
//                 if (sizeBtn !== clickedBtn) {
//                     sizeBtn.disabled = true;
//                     // sizeBtnsPrice.style.display="none";
//                     // sizeBtnContainers.disabled=true;
//                 }
//             });
//         }

//         sizeBtnContainers.forEach((sizeBtnContainer) => {
//             const sizeBtnImg = sizeBtnContainer.querySelector(".size-btn-img");
//             let isClicked = false;

//             sizeBtnContainer.addEventListener("click", function () {
//                 isClicked = !isClicked

//                 if (isClicked) {

//                     btnPlus.disabled = false;
//                     btnMinus.disabled = false;

//                     //============change popupBox sizebtn colored and icon by clicked it============
//                     sizeBtnContainer.style.border = "2px solid var(--text-field-success)";
//                     sizeBtnImg.src = "../icons/correct.png";
//                     sizeBtnImg.style.width = "40px";
//                     sizeBtnImg.style.height = "40px";
//                     sizeInput.value = "1";
//                     btnAddItem.disabled = false;



//                     btnInputNumbers.forEach((btnInputNumber) => {
//                         btnInputNumber.disabled = false;

//                         //============change qtyInput value by clicked Numbers============
//                         btnInputNumber.addEventListener("click", function () {
//                             const clickedNumber = btnInputNumber.innerHTML;
//                             clickedNumbers += clickedNumber;
//                             //console.log(clickedNumbers);
//                             sizeInput.value = clickedNumbers;

//                         });
//                     });

//                     //============change qtyInput value by clicked plus Minus Buttons============
//                     btnPlus.addEventListener('click', function () {
//                         const currentValue = parseInt(sizeInput.value);
//                         sizeInput.value = currentValue + 1;
//                     });

//                     btnMinus.addEventListener('click', function () {
//                         const currentValue = parseInt(sizeInput.value);
//                         if (currentValue === 1) {
//                             sizeInput.value = "1";
//                         } else {
//                             sizeInput.value = currentValue - 1;
//                         }
//                     });


//                     //============added cart to selected items============

//                     btnAddItem.addEventListener("click", function () {
//                         addItemToOrderItems("Take-Away");

//                     });

//                     function addItemToOrderItems(itemType) {
//                         const orderItemsContainer = document.querySelector("#takeawayPanelOne-container");
//                         const orderItemtitleName = dishBoxTitle.innerText;
//                         const orderItemInputQty = sizeInput.value;
//                         const orderItemInputSizenName = sizeBtnContainer.innerText;
//                         const orderValues = orderItemInputSizenName.split('\n');
//                         const orderType = itemType

//                         var total = orderItemInputQty * parseFloat(orderValues[1]);

//                         const selectItemCards = document.querySelectorAll(".selectItemCard");
//                         let itemExists = false;

//                         for (let i = 0; i < selectItemCards.length; i++) {
//                             const selectItemCard = selectItemCards[i];
//                             const selectItemCardName = selectItemCard.querySelector(".selectItemName").innerText;
//                             const selectItemCardSize = selectItemCard.querySelector(".selectItemSize").innerText;
//                             const selectItemCardType = selectItemCard.querySelector(".selectItemType").innerText;
//                             const selectItemCardQty = selectItemCard.querySelector(".selectItemQty");


//                             if (selectItemCardName === orderItemtitleName && selectItemCardSize === orderValues[0] && selectItemCardType === orderType) {


//                                 const priceElement = selectItemCard.querySelector(".selectItemPrice");

//                                 const currentQty = parseInt(selectItemCardQty.innerText);
//                                 var newQty = currentQty + parseInt(orderItemInputQty);
//                                 selectItemCardQty.innerText = newQty;


//                                 const currentPrice = parseFloat(priceElement.innerText);
//                                 const newPrice = currentPrice + total;
//                                 priceElement.innerText = newPrice;

//                                 itemExists = true;
//                                 popupArea.style.display = "none";

//                                 break;
//                             }
//                         }

//                         if (!itemExists) {
//                             const selectOrderItemCards = document.createElement("div");
//                             selectOrderItemCards.classList.add("selectItemCard");
//                             selectOrderItemCards.innerHTML = ` 
//                                         <div class="selectItemCard-left">
//                                             <div class="selectItemCard-head">
//                                                 <h5 class="selectItemName">${orderItemtitleName}</h5>
//                                                 <h5 class="selectItemSize">${orderValues[0]}</h5>
//                                                 <h5 class="selectItemPrice">${total}</h5>
//                                             </div>
        
//                                             <div class="selectItemCard-bottom">
//                                                 <h5 class="selectItemType">${itemType}</h5>
//                                                 <h5 class="selectItemQty">${orderItemInputQty}</h5> 
//                                             </div>
//                                         </div>
//                                         <div class="selectItemCard-right">
//                                             <img class="imgDustbin" src="../icons/dustbin.png"  width="50%"
//                                             alt="">
//                                         </div>
//                                     `;
//                             selectOrderItemCards.style.display = "flex";
//                             orderItemsContainer.appendChild(selectOrderItemCards);
//                             popupArea.style.display = "none";
//                         }

//                         //============delete selected items from the order cart============
//                         const selectedOrderItemsDelete = document.querySelectorAll(".imgDustbin");
//                         selectedOrderItemsDelete.forEach((selectedOrderItemDelete) => {
//                             selectedOrderItemDelete.addEventListener("click", function () {
//                                 //console.log("delete");
//                                 const selectItemCard = selectedOrderItemDelete.closest(".selectItemCard");
//                                 if (selectItemCard) {
//                                     selectItemCard.remove();
//                                     CalculateFullTotal();
//                                 }
//                             });
//                         });

//                         //============calcutale full total============
//                         function CalculateFullTotal() {
//                             let fullTotal = parseFloat(0.0);
//                             const fullTotalElement = document.querySelector(".totalTab1");
//                             const selectedOrderItemsTotal =
//                                 document.querySelectorAll(".selectItemPrice");
//                             const subTotal = document.querySelector(".subTotal");

//                             selectedOrderItemsTotal.forEach((selectedOrderItemTotal) => {
//                                 const value = selectedOrderItemTotal.innerText;
//                                 fullTotal += parseFloat(value);
//                             });

//                             // console.log(fullTotal);
//                             fullTotalElement.value = fullTotal.toFixed(2);
//                             subTotal.innerText = fullTotal.toFixed(2);
//                             orderPayEventTabOne(subTotal.innerText)
//                         }

//                         CalculateFullTotal();

//                         popupArea.style.display = "none";

//                         var orderPanelContent = document.querySelector(".cashier-dinein-right-inner-content-body-middle");

//                         if (orderPanelContent) {
//                             var selectItemCardElements = orderPanelContent.querySelectorAll(".selectItemCard");

//                             for (var i = 0; i < selectItemCardElements.length; i++) {
//                                 var childElement = selectItemCardElements[i];
//                                 var selectedQtyElement = childElement.querySelector(".selectItemQty");
//                                 var selectedPriceElement = childElement.querySelector(".selectItemPrice");
//                                 var selectedQty = selectedQtyElement.innerText;
//                                 var selectedPrice = selectedPriceElement.innerText;
//                                 console.log("Qty for card " + (i + 1) + ": " + selectedQty);
//                                 console.log("Price for card " + (i + 1) + ": " + selectedPrice);
//                             }
//                         }
//                     }

//                 } else {
//                     sizeBtnContainer.style.border = "none";
//                     sizeBtnImg.src = "../assets/icons/plusicon.png";
//                     sizeBtnImg.style.width = "50px";
//                     sizeBtnImg.style.height = "50px";
//                     sizeInput.value = "";


//                     btnInputNumbers.forEach((btnInputNumber) => {
//                         btnInputNumber.disabled = true;
//                     });

//                     btnPlus.disabled = true;
//                     btnMinus.disabled = true;

//                     sizeBtns.forEach((btn) => {
//                         btn.disabled = false;
//                     });
//                 }

//             });

//         });

//     }
// }

// function orderPayEventTabOne(subTotal) {
//     btnPay.addEventListener('click', function () {
//         orderConfrimPanelTabOne.style.display = "flex"
//         container.classList.add("container-disabled");

//         const newSubTotal = subTotal;
//         orderNetTotalTabOne.innerText = newSubTotal;
//         orderDiscountTabOne.addEventListener("input", function (event) {
//             console.log('TOUCH end', event.target.value);

//             const discount = orderDiscountTabOne.value;
//             var calcNetTotal = (newSubTotal - ((newSubTotal * discount) / 100))
//             orderNetTotalTabOne.innerText = calcNetTotal.toFixed(2);
//         });

//     })
// }








