



$("#dashboard-section").css('display', 'block');
$("#employee-section").css('display', 'none');
$("#dish-section").css('display', 'none');
$("#stock-section").css('display', 'none');
$("#order-section").css('display', 'none');
$("#customer-section").css('display', 'none');
$("#report-section").css('display', 'none');

//Admin navigation to main view
$("#btn-adminDashboard").click('on', function () {
    $("#dashboard-section").css('display', 'block');
    $("#employee-section").css('display', 'none');
    $("#dish-section").css('display', 'none');
    $("#stock-section").css('display', 'none');
    $("#order-section").css('display', 'none');
    $("#customer-section").css('display', 'none');
    $("#report-section").css('display', 'none');
});

//Admin navigation to employer view
$("#btn-adminEmployer").click('on', function () {
    $("#dashboard-section").css('display', 'none');
    $("#employee-section").css('display', 'block');
    $("#dish-section").css('display', 'none');
    $("#stock-section").css('display', 'none');
    $("#order-section").css('display', 'none');
    $("#customer-section").css('display', 'none');
    $("#report-section").css('display', 'none');
});

//Admin navigation to dish view
$("#btn-adminDish").click('on', function () {
    $("#dashboard-section").css('display', 'none');
    $("#employee-section").css('display', 'none');
    $("#dish-section").css('display', 'block');
    $("#stock-section").css('display', 'none');
    $("#order-section").css('display', 'none');
    $("#customer-section").css('display', 'none');
    $("#report-section").css('display', 'none');
});

//Admin navigation to stock view
$("#btn-adminStock").click('on', function () {
    $("#dashboard-section").css('display', 'none');
    $("#employee-section").css('display', 'none');
    $("#dish-section").css('display', 'none');
    $("#stock-section").css('display', 'block');
    $("#order-section").css('display', 'none');
    $("#customer-section").css('display', 'none');
    $("#report-section").css('display', 'none');
});

//Admin navigation to order view
$("#btn-adminOrder").click('on', function () {
    $("#dashboard-section").css('display', 'none');
    $("#employee-section").css('display', 'none');
    $("#dish-section").css('display', 'none');
    $("#stock-section").css('display', 'none');
    $("#order-section").css('display', 'block');
    $("#customer-section").css('display', 'none');
    $("#report-section").css('display', 'none');
});

//Admin navigation to report view
$("#btn-adminReport").click('on', function () {
    $("#dashboard-section").css('display', 'none');
    $("#employee-section").css('display', 'none');
    $("#dish-section").css('display', 'none');
    $("#stock-section").css('display', 'none');
    $("#order-section").css('display', 'none');
    $("#customer-section").css('display', 'none');
    $("#report-section").css('display', 'block');
});

//Admin navigation to ustomer view
$("#btn-adminCustomer").click('on', function () {
    $("#dashboard-section").css('display', 'none');
    $("#employee-section").css('display', 'none');
    $("#dish-section").css('display', 'none');
    $("#stock-section").css('display', 'none');
    $("#order-section").css('display', 'none');
    $("#customer-section").css('display', 'block');
    $("#report-section").css('display', 'none');
});


document.addEventListener("DOMContentLoaded", function () {
    navigationButtonClickEvent()

});

//Admin navigation Button Clicked
function navigationButtonClickEvent() {
    let nav = document.querySelector(".aside-nav-button-list"),
        navList = nav.querySelectorAll("li"),

        totalNav = navList.length;

    for (let i = 0; i < totalNav; i++) {
        const button = navList[i].querySelector("div");

        button.addEventListener('click', function () {
            for (let j = 0; j < totalNav; j++) {
                navList[j].querySelector("div").classList.remove("active");
            }

            this.classList.add("active");
        })

    }
}

