let db;
let settings = {
    prefix: '',
    language: 'en'
};

const translations = {
    en: {
        appTitle: 'Employee Work Tracking System',
        settingsBtn: 'Settings',
        tab1: 'Form',
        tab2: 'Search Data',
        tab3: 'Edited Data',
        formTitle: 'New Entry Form',
        dateLabel: 'Date',
        srnoLabel: 'SR No',
        empNameLabel: 'Employee Name',
        genderLabel: 'Gender',
        dutyLabel: 'Duty Time',
        cropsLabel: 'Crops Name',
        farmLabel: 'Farm Name',
        workTypeLabel: 'Working Types',
        farmerLabel: 'Farmers Name',
        villageLabel: 'Village Name',
        salaryLabel: 'Salary',
        advanceLabel: 'Advance',
        otherAdvLabel: 'Other Advance',
        receivedLabel: 'Received',
        remainingLabel: 'Remaining',
        otherInfoLabel: 'Any Other Information',
        submitBtn: 'Submit Entry',
        searchTitle: 'Search Data',
        fromDateLabel: 'From Date',
        toDateLabel: 'To Date',
        searchBtnText: 'Search',
        editedTitle: 'Edited Data',
        settingsTitle: 'Settings',
        prefixLabel: 'SR No Prefix',
        langLabel: 'Language',
        exportBtn: 'Export CSV File',
        closeBtn: 'Close',
        saveSettingsBtn: 'Save Settings',
        editModalTitle: 'Edit Entry',
        updateBtn: 'Update Entry',
        submitSheetBtn: 'Submit to Sheet',
        thDate: 'Date',
        thSrno: 'SR No',
        thEmpName: 'Employee Name',
        thGender: 'Gender',
        thDuty: 'Duty Time',
        thCrops: 'Crops Name',
        thFarm: 'Farm Name',
        thWorkType: 'Working Types',
        thFarmer: 'Farmers Name',
        thVillage: 'Village Name',
        thSalary: 'Salary',
        thAdvance: 'Advance',
        thOtherAdv: 'Other Advance',
        thReceived: 'Received',
        thRemaining: 'Remaining',
        thOtherInfo: 'Other Info',
        thActions: 'Actions'
    },
    gu: {
        appTitle: 'કર્મચારી કામ ટ્રેકિંગ સિસ્ટમ',
        settingsBtn: 'સેટિંગ્સ',
        tab1: 'ફોર્મ',
        tab2: 'ડેટા શોધો',
        tab3: 'સંપાદિત ડેટા',
        formTitle: 'નવી એન્ટ્રી ફોર્મ',
        dateLabel: 'તારીખ',
        srnoLabel: 'SR નં',
        empNameLabel: 'કર્મચારીનું નામ',
        genderLabel: 'લિંગ',
        dutyLabel: 'ડ્યુટી સમય',
        cropsLabel: 'પાકનું નામ',
        farmLabel: 'ખેતરનું નામ',
        workTypeLabel: 'કામના પ્રકાર',
        farmerLabel: 'ખેડૂતનું નામ',
        villageLabel: 'ગામનું નામ',
        salaryLabel: 'પગાર',
        advanceLabel: 'એડવાન્સ',
        otherAdvLabel: 'અન્ય એડવાન્સ',
        receivedLabel: 'પ્રાપ્ત',
        remainingLabel: 'બાકી',
        otherInfoLabel: 'કોઈ અન્ય માહિતી',
        submitBtn: 'એન્ટ્રી સબમિટ કરો',
        searchTitle: 'ડેટા શોધો',
        fromDateLabel: 'તારીખથી',
        toDateLabel: 'તારીખ સુધી',
        searchBtnText: 'શોધો',
        editedTitle: 'સંપાદિત ડેટા',
        settingsTitle: 'સેટિંગ્સ',
        prefixLabel: 'SR નં ઉપસર્ગ',
        langLabel: 'ભાષા',
        exportBtn: 'CSV ફાઇલ નિકાસ કરો',
        closeBtn: 'બંધ કરો',
        saveSettingsBtn: 'સેટિંગ્સ સાચવો',
        editModalTitle: 'એન્ટ્રી સંપાદિત કરો',
        updateBtn: 'એન્ટ્રી અપડેટ કરો',
        submitSheetBtn: 'શીટમાં સબમિટ કરો',
        thDate: 'તારીખ',
        thSrno: 'SR નં',
        thEmpName: 'કર્મચારીનું નામ',
        thGender: 'લિંગ',
        thDuty: 'ડ્યુટી સમય',
        thCrops: 'પાકનું નામ',
        thFarm: 'ખેતરનું નામ',
        thWorkType: 'કામના પ્રકાર',
        thFarmer: 'ખેડૂતનું નામ',
        thVillage: 'ગામનું નામ',
        thSalary: 'પગાર',
        thAdvance: 'એડવાન્સ',
        thOtherAdv: 'અન્ય એડવાન્સ',
        thReceived: 'પ્રાપ્ત',
        thRemaining: 'બાકી',
        thOtherInfo: 'અન્ય માહિતી',
        thActions: 'ક્રિયાઓ'
    }
};

function initDB() {
    const request = indexedDB.open('EmployeeDB', 1);

    request.onerror = function() {
        console.error('Database failed to open');
    };

    request.onsuccess = function() {
        db = request.result;
        loadSettings();
        setTodayDate();
        generateSRNo();
        loadSearchData();
        loadEditedData();
    };

    request.onupgradeneeded = function(e) {
        db = e.target.result;

        if (!db.objectStoreNames.contains('activeData')) {
            const activeStore = db.createObjectStore('activeData', { keyPath: 'id', autoIncrement: true });
            activeStore.createIndex('date', 'date', { unique: false });
            activeStore.createIndex('srno', 'srno', { unique: false });
        }

        if (!db.objectStoreNames.contains('editedData')) {
            const editedStore = db.createObjectStore('editedData', { keyPath: 'id', autoIncrement: true });
            editedStore.createIndex('date', 'date', { unique: false });
            editedStore.createIndex('srno', 'srno', { unique: false });
        }

        if (!db.objectStoreNames.contains('settings')) {
            db.createObjectStore('settings', { keyPath: 'key' });
        }
    };
}

function setTodayDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').value = today;
}

function generateSRNo() {
    const dateInput = document.getElementById('date').value;
    if (!dateInput) return;

    const date = new Date(dateInput);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateStr = `${year}${month}${day}`;

    const transaction = db.transaction(['activeData', 'editedData'], 'readonly');
    const activeStore = transaction.objectStore('activeData');
    const editedStore = transaction.objectStore('editedData');

    let maxNum = 0;

    const activeRequest = activeStore.openCursor();
    activeRequest.onsuccess = function(e) {
        const cursor = e.target.result;
        if (cursor) {
            const srno = cursor.value.srno;
            if (srno && srno.includes(dateStr)) {
                const parts = srno.split('-');
                const num = parseInt(parts[parts.length - 1]);
                if (num > maxNum) maxNum = num;
            }
            cursor.continue();
        } else {
            const editedRequest = editedStore.openCursor();
            editedRequest.onsuccess = function(e) {
                const cursor = e.target.result;
                if (cursor) {
                    const srno = cursor.value.srno;
                    if (srno && srno.includes(dateStr)) {
                        const parts = srno.split('-');
                        const num = parseInt(parts[parts.length - 1]);
                        if (num > maxNum) maxNum = num;
                    }
                    cursor.continue();
                } else {
                    const newNum = String(maxNum + 1).padStart(3, '0');
                    const prefix = settings.prefix ? settings.prefix + '-' : '';
                    document.getElementById('srno').value = `${prefix}${dateStr}-${newNum}`;
                }
            };
        }
    };
}

document.getElementById('date').addEventListener('change', generateSRNo);

function calculateRemaining() {
    const salary = parseFloat(document.getElementById('salary').value) || 0;
    const advance = parseFloat(document.getElementById('advance').value) || 0;
    const otherAdvance = parseFloat(document.getElementById('otherAdvance').value) || 0;
    const received = parseFloat(document.getElementById('received').value) || 0;
    
    const remaining = salary - advance - otherAdvance - received;
    document.getElementById('remaining').value = remaining.toFixed(2);
}

function calculateEditRemaining() {
    const salary = parseFloat(document.getElementById('editSalary').value) || 0;
    const advance = parseFloat(document.getElementById('editAdvance').value) || 0;
    const otherAdvance = parseFloat(document.getElementById('editOtherAdvance').value) || 0;
    const received = parseFloat(document.getElementById('editReceived').value) || 0;
    
    const remaining = salary - advance - otherAdvance - received;
    document.getElementById('editRemaining').value = remaining.toFixed(2);
}

document.getElementById('salary').addEventListener('input', calculateRemaining);
document.getElementById('advance').addEventListener('input', calculateRemaining);
document.getElementById('otherAdvance').addEventListener('input', calculateRemaining);
document.getElementById('received').addEventListener('input', calculateRemaining);

document.getElementById('editSalary').addEventListener('input', calculateEditRemaining);
document.getElementById('editAdvance').addEventListener('input', calculateEditRemaining);
document.getElementById('editOtherAdvance').addEventListener('input', calculateEditRemaining);
document.getElementById('editReceived').addEventListener('input', calculateEditRemaining);

document.getElementById('entryForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = {
        date: document.getElementById('date').value,
        srno: document.getElementById('srno').value,
        employeeName: document.getElementById('employeeName').value,
        gender: document.getElementById('gender').value,
        dutyTime: document.getElementById('dutyTime').value,
        cropsName: document.getElementById('cropsName').value,
        farmName: document.getElementById('farmName').value,
        workingTypes: document.getElementById('workingTypes').value,
        farmersName: document.getElementById('farmersName').value,
        villageName: document.getElementById('villageName').value,
        salary: parseFloat(document.getElementById('salary').value),
        advance: parseFloat(document.getElementById('advance').value) || 0,
        otherAdvance: parseFloat(document.getElementById('otherAdvance').value) || 0,
        received: parseFloat(document.getElementById('received').value) || 0,
        remaining: parseFloat(document.getElementById('remaining').value),
        otherInfo: document.getElementById('otherInfo').value
    };

    const transaction = db.transaction(['activeData'], 'readwrite');
    const objectStore = transaction.objectStore('activeData');
    const request = objectStore.add(formData);

    request.onsuccess = function() {
        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Entry saved successfully!',
            timer: 1500,
            showConfirmButton: false
        });

        document.getElementById('employeeName').value = '';
        generateSRNo();
        calculateRemaining();
        loadSearchData();
    };

    request.onerror = function() {
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to save entry!'
        });
    };
});

function searchData() {
    const fromDate = document.getElementById('searchFromDate').value;
    const toDate = document.getElementById('searchToDate').value;

    const transaction = db.transaction(['activeData'], 'readonly');
    const objectStore = transaction.objectStore('activeData');
    const request = objectStore.getAll();

    request.onsuccess = function(e) {
        let data = e.target.result;

        if (fromDate && toDate) {
            data = data.filter(item => item.date >= fromDate && item.date <= toDate);
        } else if (fromDate) {
            data = data.filter(item => item.date >= fromDate);
        } else if (toDate) {
            data = data.filter(item => item.date <= toDate);
        }

        displaySearchData(data);
    };
}

function loadSearchData() {
    const transaction = db.transaction(['activeData'], 'readonly');
    const objectStore = transaction.objectStore('activeData');
    const request = objectStore.getAll();

    request.onsuccess = function(e) {
        displaySearchData(e.target.result);
    };
}

function displaySearchData(data) {
    const tbody = document.getElementById('searchTableBody');
    tbody.innerHTML = '';

    data.forEach(item => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${item.date}</td>
            <td>${item.srno}</td>
            <td>${item.employeeName}</td>
            <td>${item.gender}</td>
            <td>${item.dutyTime}</td>
            <td>${item.cropsName}</td>
            <td>${item.farmName}</td>
            <td>${item.workingTypes}</td>
            <td>${item.farmersName}</td>
            <td>${item.villageName}</td>
            <td>${item.salary.toFixed(2)}</td>
            <td>${item.advance.toFixed(2)}</td>
            <td>${item.otherAdvance.toFixed(2)}</td>
            <td>${item.received.toFixed(2)}</td>
            <td>${item.remaining.toFixed(2)}</td>
            <td>${item.otherInfo || ''}</td>
            <td>
                <button class="btn btn-sm btn-primary btn-action" onclick="editEntry(${item.id}, 'active')">
                    <i class="bi bi-pencil"></i> Edit
                </button>
                <button class="btn btn-sm btn-danger btn-action" onclick="deleteEntry(${item.id}, 'active')">
                    <i class="bi bi-trash"></i> Delete
                </button>
            </td>
        `;
    });
}

function loadEditedData() {
    const transaction = db.transaction(['editedData'], 'readonly');
    const objectStore = transaction.objectStore('editedData');
    const request = objectStore.getAll();

    request.onsuccess = function(e) {
        displayEditedData(e.target.result);
    };
}

function displayEditedData(data) {
    const tbody = document.getElementById('editedTableBody');
    tbody.innerHTML = '';

    data.forEach(item => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${item.date}</td>
            <td>${item.srno}</td>
            <td>${item.employeeName}</td>
            <td>${item.gender}</td>
            <td>${item.dutyTime}</td>
            <td>${item.cropsName}</td>
            <td>${item.farmName}</td>
            <td>${item.workingTypes}</td>
            <td>${item.farmersName}</td>
            <td>${item.villageName}</td>
            <td>${item.salary.toFixed(2)}</td>
            <td>${item.advance.toFixed(2)}</td>
            <td>${item.otherAdvance.toFixed(2)}</td>
            <td>${item.received.toFixed(2)}</td>
            <td>${item.remaining.toFixed(2)}</td>
            <td>${item.otherInfo || ''}</td>
            <td>
                <button class="btn btn-sm btn-primary btn-action" onclick="editEntry(${item.id}, 'edited')">
                    <i class="bi bi-pencil"></i> Edit
                </button>
                <button class="btn btn-sm btn-danger btn-action" onclick="deleteEntry(${item.id}, 'edited')">
                    <i class="bi bi-trash"></i> Delete
                </button>
            </td>
        `;
    });
}

function editEntry(id, source) {
    const storeName = source === 'active' ? 'activeData' : 'editedData';
    const transaction = db.transaction([storeName], 'readonly');
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.get(id);

    request.onsuccess = function(e) {
        const data = e.target.result;
        
        document.getElementById('editId').value = id;
        document.getElementById('editSource').value = source;
        document.getElementById('editDate').value = data.date;
        document.getElementById('editSrno').value = data.srno;
        document.getElementById('editEmployeeName').value = data.employeeName;
        document.getElementById('editGender').value = data.gender;
        document.getElementById('editDutyTime').value = data.dutyTime;
        document.getElementById('editCropsName').value = data.cropsName;
        document.getElementById('editFarmName').value = data.farmName;
        document.getElementById('editWorkingTypes').value = data.workingTypes;
        document.getElementById('editFarmersName').value = data.farmersName;
        document.getElementById('editVillageName').value = data.villageName;
        document.getElementById('editSalary').value = data.salary;
        document.getElementById('editAdvance').value = data.advance;
        document.getElementById('editOtherAdvance').value = data.otherAdvance;
        document.getElementById('editReceived').value = data.received;
        document.getElementById('editRemaining').value = data.remaining;
        document.getElementById('editOtherInfo').value = data.otherInfo || '';

        if (source === 'edited') {
            document.getElementById('submitSheetBtn').style.display = 'inline-block';
        } else {
            document.getElementById('submitSheetBtn').style.display = 'none';
        }

        const modal = new bootstrap.Modal(document.getElementById('editModal'));
        modal.show();
    };
}

document.getElementById('editForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const id = parseInt(document.getElementById('editId').value);
    const source = document.getElementById('editSource').value;
    const remaining = parseFloat(document.getElementById('editRemaining').value);

    const formData = {
        id: id,
        date: document.getElementById('editDate').value,
        srno: document.getElementById('editSrno').value,
        employeeName: document.getElementById('editEmployeeName').value,
        gender: document.getElementById('editGender').value,
        dutyTime: document.getElementById('editDutyTime').value,
        cropsName: document.getElementById('editCropsName').value,
        farmName: document.getElementById('editFarmName').value,
        workingTypes: document.getElementById('editWorkingTypes').value,
        farmersName: document.getElementById('editFarmersName').value,
        villageName: document.getElementById('editVillageName').value,
        salary: parseFloat(document.getElementById('editSalary').value),
        advance: parseFloat(document.getElementById('editAdvance').value) || 0,
        otherAdvance: parseFloat(document.getElementById('editOtherAdvance').value) || 0,
        received: parseFloat(document.getElementById('editReceived').value) || 0,
        remaining: remaining,
        otherInfo: document.getElementById('editOtherInfo').value
    };

    if (source === 'active' && remaining === 0) {
        const deleteTransaction = db.transaction(['activeData'], 'readwrite');
        const deleteStore = deleteTransaction.objectStore('activeData');
        deleteStore.delete(id);

        deleteTransaction.oncomplete = function() {
            const addTransaction = db.transaction(['editedData'], 'readwrite');
            const addStore = addTransaction.objectStore('editedData');
            delete formData.id;
            addStore.add(formData);

            addTransaction.oncomplete = function() {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Entry updated and moved to Edited Data!',
                    timer: 1500,
                    showConfirmButton: false
                });
                
                loadSearchData();
                loadEditedData();
                bootstrap.Modal.getInstance(document.getElementById('editModal')).hide();
            };
        };
    } else if (source === 'edited' && remaining > 0) {
        const deleteTransaction = db.transaction(['editedData'], 'readwrite');
        const deleteStore = deleteTransaction.objectStore('editedData');
        deleteStore.delete(id);

        deleteTransaction.oncomplete = function() {
            const addTransaction = db.transaction(['activeData'], 'readwrite');
            const addStore = addTransaction.objectStore('activeData');
            delete formData.id;
            addStore.add(formData);

            addTransaction.oncomplete = function() {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Entry updated and moved to Search Data!',
                    timer: 1500,
                    showConfirmButton: false
                });
                
                loadSearchData();
                loadEditedData();
                bootstrap.Modal.getInstance(document.getElementById('editModal')).hide();
            };
        };
    } else {
        const storeName = source === 'active' ? 'activeData' : 'editedData';
        const transaction = db.transaction([storeName], 'readwrite');
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.put(formData);

        request.onsuccess = function() {
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Entry updated successfully!',
                timer: 1500,
                showConfirmButton: false
            });

            if (source === 'active') {
                loadSearchData();
            } else {
                loadEditedData();
            }
            
            bootstrap.Modal.getInstance(document.getElementById('editModal')).hide();
        };
    }
});

function deleteEntry(id, source) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            const storeName = source === 'active' ? 'activeData' : 'editedData';
            const transaction = db.transaction([storeName], 'readwrite');
            const objectStore = transaction.objectStore(storeName);
            const request = objectStore.delete(id);

            request.onsuccess = function() {
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: 'Entry has been deleted.',
                    timer: 1500,
                    showConfirmButton: false
                });

                if (source === 'active') {
                    loadSearchData();
                } else {
                    loadEditedData();
                }
            };
        }
    });
}

function submitToSheet() {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbx3wPU-5088uTfNNZGYNhCConYeTHdJUyN19W4l8_2I9TyTEFYhx-aqcQPHMS2bmnRl/exec';
    const form = document.getElementById('editForm');
    
    fetch(scriptURL, { 
        method: 'POST', 
        body: new FormData(form)
    })
    .then(response => {
        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Submitted Data Successfully to Google Sheet!',
            timer: 2000,
            showConfirmButton: false
        });

        const id = parseInt(document.getElementById('editId').value);
        const transaction = db.transaction(['editedData'], 'readwrite');
        const objectStore = transaction.objectStore('editedData');
        objectStore.delete(id);

        transaction.oncomplete = function() {
            loadEditedData();
            bootstrap.Modal.getInstance(document.getElementById('editModal')).hide();
        };
    })
    .catch(error => {
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to submit to Google Sheet: ' + error.message
        });
    });
}

function loadSettings() {
    const transaction = db.transaction(['settings'], 'readonly');
    const objectStore = transaction.objectStore('settings');
    
    const prefixRequest = objectStore.get('prefix');
    prefixRequest.onsuccess = function(e) {
        if (e.target.result) {
            settings.prefix = e.target.result.value;
            document.getElementById('srnoPrefix').value = settings.prefix;
        }
    };

    const langRequest = objectStore.get('language');
    langRequest.onsuccess = function(e) {
        if (e.target.result) {
            settings.language = e.target.result.value;
            document.getElementById('languageSelect').value = settings.language;
            applyTranslations();
        }
    };
}

function saveSettings() {
    const prefix = document.getElementById('srnoPrefix').value;
    const language = document.getElementById('languageSelect').value;

    const transaction = db.transaction(['settings'], 'readwrite');
    const objectStore = transaction.objectStore('settings');

    objectStore.put({ key: 'prefix', value: prefix });
    objectStore.put({ key: 'language', value: language });

    transaction.oncomplete = function() {
        settings.prefix = prefix;
        settings.language = language;
        
        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Settings saved successfully!',
            timer: 1500,
            showConfirmButton: false
        });

        generateSRNo();
        applyTranslations();
        bootstrap.Modal.getInstance(document.getElementById('settingsModal')).hide();
    };
}

function changeLanguage() {
    const language = document.getElementById('languageSelect').value;
    settings.language = language;
    applyTranslations();
}

function applyTranslations() {
    const lang = translations[settings.language];
    
    Object.keys(lang).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            if (element.tagName === 'INPUT' || element.tagName === 'BUTTON') {
                if (element.type === 'submit' || element.tagName === 'BUTTON') {
                    element.innerHTML = lang[key].includes('bi-') ? element.innerHTML.replace(/>.*</, '> ' + lang[key] + ' <') : lang[key];
                }
            } else {
                element.textContent = lang[key];
            }
        }
    });
}

function exportCSV() {
    const transaction1 = db.transaction(['activeData'], 'readonly');
    const store1 = transaction1.objectStore('activeData');
    const request1 = store1.getAll();

    request1.onsuccess = function(e) {
        const activeData = e.target.result;

        const transaction2 = db.transaction(['editedData'], 'readonly');
        const store2 = transaction2.objectStore('editedData');
        const request2 = store2.getAll();

        request2.onsuccess = function(e) {
            const editedData = e.target.result;
            const allData = [...activeData, ...editedData];

            if (allData.length === 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'No Data',
                    text: 'No data available to export!'
                });
                return;
            }

            const headers = ['Date', 'SR No', 'Employee Name', 'Gender', 'Duty Time', 'Crops Name', 'Farm Name', 'Working Types', 'Farmers Name', 'Village Name', 'Salary', 'Advance', 'Other Advance', 'Received', 'Remaining', 'Other Information'];
            
            let csvContent = headers.join(',') + '\n';

            allData.forEach(row => {
                const values = [
                    row.date,
                    row.srno,
                    row.employeeName,
                    row.gender,
                    row.dutyTime,
                    row.cropsName,
                    row.farmName,
                    row.workingTypes,
                    row.farmersName,
                    row.villageName,
                    row.salary,
                    row.advance,
                    row.otherAdvance,
                    row.received,
                    row.remaining,
                    row.otherInfo || ''
                ];
                csvContent += values.map(val => `"${val}"`).join(',') + '\n';
            });

            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            
            link.setAttribute('href', url);
            link.setAttribute('download', 'employee_data_' + new Date().toISOString().split('T')[0] + '.csv');
            link.style.visibility = 'hidden';
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'CSV file exported successfully!',
                timer: 1500,
                showConfirmButton: false
            });
        };
    };
}

window.onload = function() {
    initDB();
};
