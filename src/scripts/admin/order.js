const orderContent=document.querySelector("#order-section")

const datepicker = document.getElementById('date-picker');
const OrderTable = document.getElementById('order');
const orderIdList = document.querySelector("#dropdown-menu-oid");
const tableIdList = document.querySelector("#dropdown-menu-tid");
const employeIdList = document.querySelector("#dropdown-menu-eid");

const orderIdInput = document.querySelector('.dropdown-input-oid');
const tableIdInput = document.querySelector('.dropdown-input-tid');
const employeeIdInput = document.querySelector('.dropdown-input-eid');
const dataTable = document.getElementById('order').getElementsByTagName('tbody')[0];

orderIdInput.addEventListener('input', filterTable);
tableIdInput.addEventListener('input', filterTable);
employeeIdInput.addEventListener('input', filterTable);

document.addEventListener("DOMContentLoaded", function () {
    datepicker.addEventListener('change', filterTableByDate);
    getOrderIds();
    getTableIds();
    getEmployeeIds();
    filterTable();

});



//----------Order search by Date------------------------
function filterTableByDate() {
    const selectedDate = datepicker.value;

    const rows = OrderTable.getElementsByTagName('tr');
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


function filterTable() {
    const selectedOrderId = orderIdInput.value.toUpperCase();
    const selectedTableId = tableIdInput.value.toUpperCase();
    const selectedEmployeeId = employeeIdInput.value.toUpperCase();

    const rows = dataTable.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const orderId = cells[0].textContent || cells[0].innerText;
        const tableId = cells[1].textContent || cells[1].innerText;
        const employeeId = cells[2].textContent || cells[2].innerText;

        const displayRow =
            (selectedOrderId === '' || orderId.toUpperCase().includes(selectedOrderId)) &&
            (selectedTableId === '' || tableId.toUpperCase().includes(selectedTableId)) &&
            (selectedEmployeeId === '' || employeeId.toUpperCase().includes(selectedEmployeeId));

        rows[i].style.display = displayRow ? '' : 'none';

      
    }
}





