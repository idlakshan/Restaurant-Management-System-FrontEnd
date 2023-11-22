function populateFieldsEmployee(row) {

    // let roles = row.cells[3].innerText.split(',');

    // let empId=row.cells[0].innerText;
    // let empName=row.cells[1].innerText;
    // let empContact=row.cells[2].innerText;
    // let empRoleOne=roles[0];
    // let empRoleTwo=roles[1];
    // let empAddress=row.cells[4].innerText;

    //  document.getElementById('userId').value = empId;
    //  document.getElementById('userName').value = empName;
    //  document.getElementById('userContact').value = empContact;
    //  document.getElementById('userRoleOne').value=empRoleOne;
    //  document.getElementById('userRoleTwo').value=empRoleTwo;
    //  document.getElementById('userAddress').value = empAddress;

    document.getElementById('userId').value = row.cells[0].innerText;
    document.getElementById('userName').value = row.cells[1].innerText;
    document.getElementById('userContact').value = row.cells[2].innerText;

    let roles = row.cells[3].innerText.split(',');
    console.log(roles[0].trim());
    document.getElementById('userRoleOne').value = roles[0].trim();
    document.getElementById('userRoleTwo').value = roles.length > 1 ? roles[1].trim() : 'Empty';
    document.getElementById('userAddress').value = row.cells[4].innerText;
}


let rows = document.getElementById('employeerTable').getElementsByTagName('tr');
for (let i = 0; i < rows.length; i++) {
    rows[i].onclick = function () {
        populateFieldsEmployee(this);
    };
}