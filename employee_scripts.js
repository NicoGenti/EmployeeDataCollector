const employeeData = [];
let lastEmployee = null;

function addEmployee() {
	const employee = {
		"Worker ID": document.getElementById('workerId').value,
		"Legal Entity": document.getElementById('legalEntity').value,
		"Assigned Clinic": document.getElementById('assignedClinic').value,
		"Last Name": document.getElementById('lastName').value,
		"First Name": document.getElementById('firstName').value,
		"Category": document.getElementById('category').value,
		"Contract Start Date": document.getElementById('contractStartDate').value,
		"Contract End Date": document.getElementById('contractEndDate').value,
		"Long-term Absence Start": document.getElementById('absenceStart').value,
		"Long-term Absence End": document.getElementById('absenceEnd').value,
		"Type of Absences": document.getElementById('absenceType').value,
		"Contractual Daily Work Hours": document.getElementById('dailyHours').value,
		"Vacation Days x Year": document.getElementById('vacationDays').value,
		"Type of Contract": document.getElementById('contractType').value,
		"Split %": document.getElementById('splitPercentage').value
	};

	const requiredFields = [
        { id: 'workerId', name: 'Worker ID' },
        { id: 'assignedClinic', name: 'Assigned Clinic' },
        { id: 'lastName', name: 'Last Name' },
        { id: 'firstName', name: 'First Name' },
        { id: 'category', name: 'Category' },
        { id: 'contractStartDate', name: 'Contract Start Date' },
        { id: 'dailyHours', name: 'Contractual Daily Work Hours' },
        { id: 'vacationDays', name: 'Vacation Days x Year' },
        { id: 'contractType', name: 'Type of Contract' },
        { id: 'splitPercentage', name: 'Split %' }
    ];
	
	requiredFields.forEach(field => {
            const inputElement = document.getElementById(field.id);
            if (inputElement && inputElement.value === '') {
                inputElement.style.border = '2px solid #ff4d4f';
            } else if (inputElement) {
                inputElement.style.border = '';
            }
        });

	let hasError = false;

	requiredFields.forEach(field => {
		const inputElement = document.getElementById(field.id);
		if (inputElement.value === '') {
			inputElement.style.border = '2px solid #ff4d4f';
			hasError = true;
		} else {
			inputElement.classList.remove('error');
		}
	});

	if (hasError) {
		alert('Please fill in the following required fields: ' + requiredFields.map(field => field.name).join(', '));
		return;
	}

	employeeData.push(employee);
	lastEmployee = employee;
	updateTable();
}

function updateTable() {
	const tableBody = document.getElementById('employeeTable').getElementsByTagName('tbody')[0];
	tableBody.innerHTML = '';

	employeeData.forEach((employee, index) => {
		const row = tableBody.insertRow();
		const selectCell = row.insertCell(0);
		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.value = index;
		selectCell.appendChild(checkbox);

		Object.values(employee).forEach(value => {
			const cell = row.insertCell();
			cell.textContent = value;
		});
	});
}

function deleteSelectedEmployee() {
	const tableBody = document.getElementById('employeeTable').getElementsByTagName('tbody')[0];
	const checkboxes = tableBody.querySelectorAll('input[type="checkbox"]:checked');
	const indexesToDelete = Array.from(checkboxes).map(checkbox => parseInt(checkbox.value));

	// Sort indexes in descending order to avoid shifting issues
	indexesToDelete.sort((a, b) => b - a);

	indexesToDelete.forEach(index => {
		employeeData.splice(index, 1);
	});

	updateTable();
}

function exportToExcel() {
	if (employeeData.length === 0) {
		alert('No employee data to export.');
		return;
	}

	const worksheet = XLSX.utils.json_to_sheet(employeeData);
	const workbook = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
	XLSX.writeFile(workbook, "EmployeeData.xlsx");
}