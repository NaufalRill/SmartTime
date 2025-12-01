const mysql = require('mysql');

// Konfigurasi koneksi (Standar XAMPP)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // User default XAMPP
    password: '',      // Password default XAMPP biasanya kosong
    database: 'smarttime_db' // Nama database yang kita buat tadi
});

db.connect((err) => {
    if (err) {
        console.error('Error koneksi ke MySQL:', err);
    } else {
        console.log('Berhasil terhubung ke Database MySQL!');
    }
});

module.exports = db;