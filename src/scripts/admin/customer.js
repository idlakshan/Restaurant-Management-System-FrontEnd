function populateFieldsCustomer(row) {
  
    let customerId = row.cells[0].innerText;
    let customerName = row.cells[1].innerText;
    let customerMobile = row.cells[2].innerText;
    let creditStatus = row.cells[3].innerText;


    document.querySelector('.input-field-customer-main[placeholder="Customer Id"]').value = customerId;
    document.querySelector('.input-field-customer-main[placeholder="Customer Name"]').value = customerName;
    document.querySelector('.input-field-customer-main[placeholder="Customer Mobile"]').value = customerMobile;
    document.getElementById('customerStatus').value = creditStatus;
}

let tableRows = document.querySelectorAll('#stock-data-output tr');
tableRows.forEach(row => {
    row.addEventListener('click', function() {
        populateFieldsCustomer(this); 
    });
});


function filterTable() {
    var input = document.querySelector('.input-field-customer').value.toLowerCase();
    var rows = document.querySelectorAll('#stock-data-output tr');
    rows.forEach(function (row) {
        var mobileNumber = row.cells[2].innerText.toLowerCase(); 
        if (mobileNumber.includes(input)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}


document.querySelector('.input-field-customer').addEventListener('input', filterTable);