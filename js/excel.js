// Fungsi untuk mengonversi data menjadi format Excel
function convertToExcel(data) {
    // Buat objek workbook baru
    const workbook = XLSX.utils.book_new();
  
    // Buat objek worksheet baru
    const worksheet = XLSX.utils.json_to_sheet(data);
  
    // Tambahkan nama kolom pada worksheet
    const header = ['Kode Obat', 'Nama Obat', 'Stok Obat', 'Jenis Obat'];
    const headerRowIndex = 0;
    const headerStyle = { font: { bold: true } };
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: headerRowIndex, style: headerStyle });
  
    // Tambahkan worksheet ke workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
  
    // Konversi workbook ke bentuk array buffer
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  
    // Buat objek blob dari array buffer
    const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  
    // Buat URL dari blob
    const url = URL.createObjectURL(blob);
  
    return url;
  }
  
  // Fungsi untuk mengunduh file Excel
  function downloadExcel(url) {
    // Buat elemen <a> baru
    const a = document.createElement("a");
  
    // Set atribut href dengan URL file Excel
    a.href = url;
  
    // Set atribut download dengan nama file Excel
    a.download = "dataobat.xlsx";
  
    // Klik otomatis elemen <a> untuk memulai unduhan
    a.click();
  
    // Hapus URL objek setelah unduhan selesai
    URL.revokeObjectURL(url);
  }
  
  // Fungsi untuk menangani klik tombol "Simpan ke Excel"
  function saveToExcel() {
    // Ambil semua baris data dari tabel
    const table = document.querySelector("#list-obat");
    const rows = Array.from(table.getElementsByTagName("tr"));
  
    // Buat array kosong untuk menyimpan data
    const data = [];
  
    // Iterasi setiap baris data
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const cells = row.getElementsByTagName("td");
  
      // Ambil nilai dari setiap sel dan tambahkan ke array data
      const rowData = [];
      for (let j = 0; j < cells.length - 1; j++) {
        rowData.push(cells[j].textContent);
      }
      data.push(rowData);
    }
  
    // Konversi data menjadi format Excel
    const excelUrl = convertToExcel(data);
  
    // Unduh file Excel
    downloadExcel(excelUrl);
  
    // Tampilkan alert bahwa data berhasil diunduh
    showAlert("Data berhasil diunduh 📂", "success");
  }
  