var selectedRow = null;

//ENABLE-DISABLE INPUT
document.addEventListener("DOMContentLoaded", () => {
    const kodeObat = document.querySelector('#kodeObat');
    const namaObat = document.querySelector('#namaObat');
    const stokObat = document.querySelector('#stokObat');
    const jenisObat = document.querySelector('#jenisObat');
    const editButton = document.querySelector('#editButton');
    const deleteButton = document.querySelector('#deleteButton');
    const enableButton = document.querySelector('#enableButton');
    const submitButton = document.querySelector('#submitButton');
    const downloadButton = document.querySelector('#downloadButton');

    kodeObat.disabled = true;
    namaObat.disabled = true;
    stokObat.disabled = true;
    jenisObat.disabled = true;
    editButton.disabled = true;
    deleteButton.disabled = true;
    submitButton.disabled = true;
    downloadButton.disabled = true;

    enableButton.addEventListener('click', () => {
        kodeObat.disabled = false
        namaObat.disabled = false
        stokObat.disabled = false
        jenisObat.disabled = false
        submitButton.disabled = false;
        editButton.disabled = false;
        deleteButton.disabled = false;
        downloadButton.disabled = false;
        enableButton.disabled = true;
    });
});

//NUMBER OF DATA FROM TABLE
function updateDataTable() {
    const totalDataElement = document.querySelector('#totalData');
    const totalData = document.querySelectorAll('#list-obat tr').length;
    totalDataElement.innerHTML = `Total Data: <strong>${totalData}</strong>`;
}

//SHOW ALERTS
function showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.style.textAlign = 'center';
    div.style.padding = '10px';
    div.style.width = '250px';
    div.style.position = 'fixed';
    div.style.top = '10%';
    div.style.right = '-300px';
    div.style.transform = 'translateY(-50%)';
    div.style.transition = 'right 0.2s ease-in';

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const main = document.querySelector('.main');
    container.insertBefore(div, main);

    setTimeout(() => {
        div.style.right = '20px';
    }, 100);

    setTimeout(() => {
        div.style.right = '-300px';
        setTimeout(() => div.remove(), 300);
    }, 3000);
}

//CLEAR ALL FIELDS
function clearFields() {
    document.querySelector('#kodeObat').value = '';
    document.querySelector('#namaObat').value = '';
    document.querySelector('#stokObat').value = '';

    const jenisObatSelect = document.querySelector('#jenisObat');
    jenisObatSelect.value = ''; // CLEAR PREVIOUSLY SELECTED VALUE
    jenisObatSelect.selectedIndex = 0; // SET THE DEFAULT OPTION AS SELECTED

    // ADD DISABLED ATTRIBUTE TO THE DEFAULT OPTION
    jenisObatSelect.options[0].disabled = true;
}

//ADD DATA
document.querySelector('#form-obat').addEventListener('submit', (e) => {
    e.preventDefault();

    //GET FORM VALUES
    const kodeObat = document.querySelector('#kodeObat').value;
    const namaObat = document.querySelector('#namaObat').value;
    const stokObat = document.querySelector('#stokObat').value;
    const jenisObat = document.querySelector('#jenisObat').value;

    // CHECK IF KODE OBAT ALREADY EXISTS
    let isExistingKodeObat = false;
    const existingKodeObat = document.querySelectorAll('#list-obat td:first-child');

    //Mengecek apakah kodeObat sudah ada di daftar
    for (let i = 0; i < existingKodeObat.length; i++) {
        //Mengecek apakah element text content dari existingKodeObat == kodeObat 
        if (existingKodeObat[i].textContent === kodeObat) {
            //Proses edit data jika kodeObat sudah ada
            if (selectedRow !== null && existingKodeObat[i].textContent === selectedRow.children[0].textContent) {
                continue; //Lewati baris saat ini jika milik SelectRow yang diedit
            }
            isExistingKodeObat = true;
            break;
        }
    }

    if (isExistingKodeObat) {
        showAlert('Kode obat sudah terdaftar, silakan ganti kode 😒', 'warning');
        clearFields();
        return;
    }

    //VALIDATE
    if (kodeObat == "" || namaObat == "" || stokObat == "" || jenisObat == "") {
        if (e.submitter.id === 'downloadButton') {
            return; // Skip showing the alert
        }
        showAlert('Seluruh kolom wajib diisi 😓', 'danger');
    }
    else {
        if (selectedRow == null) {
            const list = document.querySelector('#list-obat');
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${kodeObat}</td>
                <td>${namaObat}</td>
                <td>${stokObat}</td>
                <td>${jenisObat}</td>
                <td class="d-flex gap-2">
                    <a href="#" class="btn btn-warning btn-sm edit" id="editButton">Edit 📝</a>
                    <a href="#" class="btn btn-danger btn-sm delete" id="deleteButton">Hapus 🗞️</a>
                </td>
            `;
            list.appendChild(row);
            selectedRow = null;

            showAlert('Data berhasil disimpan 😄', 'success');
        }
        else {
            selectedRow.children[0].textContent = kodeObat;
            selectedRow.children[1].textContent = namaObat;
            selectedRow.children[2].textContent = stokObat;
            selectedRow.children[3].textContent = jenisObat;
            selectedRow = null;
            showAlert('Data berhasil diubah 😆', 'info');
        }
        clearFields()
    }
    //SUM NUMBER OF DATA
    updateDataTable();
})

//EDIT DATA
document.querySelector('#list-obat').addEventListener('click', (e) => {
    target = e.target
    if (target.classList.contains("edit")) {
        selectedRow = target.parentElement.parentElement;
        document.querySelector('#kodeObat').value = selectedRow.children[0].textContent;
        document.querySelector('#namaObat').value = selectedRow.children[1].textContent;
        document.querySelector('#stokObat').value = selectedRow.children[2].textContent;
        document.querySelector('#jenisObat').value = selectedRow.children[3].textContent;
    }
});

//DELETE DATA
document.querySelector('#list-obat').addEventListener('click', (e) => {
    target = e.target;
    if (target.classList.contains("delete")) {
        if (confirm("Apakah Anda yakin ingin menghapus obat ini? 🤔")) {
            target.parentElement.parentElement.remove();
            showAlert('Data berhasil dihapus 😊', 'danger');
            //UPDATE NUMBER OF DATA
            updateDataTable();
        }
    }
});