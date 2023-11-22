const datepicker = document.getElementById('date-picker');
const dataTable = document.getElementById('order');
const orderIdList = document.querySelector("#dropdown-menu-oid");
const tableIdList = document.querySelector("#dropdown-menu-tid");
const employeIdList = document.querySelector("#dropdown-menu-eid");







document.addEventListener("DOMContentLoaded", function () {
    datepicker.addEventListener('change', filterTable);
    getOrderIds();
    getTableIds();
    getEmployeeIds();


});



//----------Order search by Date------------------------
function filterTable() {
    const selectedDate = datepicker.value;

    const rows = dataTable.getElementsByTagName('tr');
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const dateCell = row.getElementsByTagName('td')[3]
        const dateInRow = dateCell.textContent || dateCell.innerText


        if (selectedDate === dateInRow) {
            row.style.display = ''
        } else {
            row.style.display = 'none'
        }
    }
}


//----------Order search by Order Id------------------------
async function getOrderIds() {

    try {
        const response = await fetch("../json/orderId.json");
        const orders = await response.json();

        const orderIds = orders.map(function (order) {
            return order.name;
        });

        orderIds.forEach(function (orderId) {
            const option = document.createElement('option');
            option.value = orderId;
            orderIdList.appendChild(option);
        });

    } catch (error) {
        console.error("Error fetching  data:", error);
    }
}


//----------Order search by table Id------------------------
async function getTableIds() {

    try {
        const response = await fetch("../json/tableId.json");
        const tables = await response.json();

        const tableIds = tables.map(function (table) {
            return table.name;
        });

        tableIds.forEach(function (orderId) {
            const option = document.createElement('option');
            option.value = orderId;
            tableIdList.appendChild(option);
        });

    } catch (error) {
        console.error("Error fetching  data:", error);
    }
}


//----------Order search by Employee Id------------------------
async function getEmployeeIds() {

    try {
        const response = await fetch("../json/employeeId.json");
        const employees = await response.json();

        const employeeIds = employees.map(function (employee) {
            return employee.name;
        });

        employeeIds.forEach(function (orderId) {
            const option = document.createElement('option');
            option.value = orderId;
            employeIdList.appendChild(option);
        });

    } catch (error) {
        console.error("Error fetching  data:", error);
    }
}







