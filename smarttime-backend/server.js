const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


// Route GET (Cek User yang terdaftar)
app.get('/api/users', (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ status: 'success', data: result });
    });
});

// Route REGISTER (TAMBAHAN BARU)
app.post('/api/register', (req, res) => {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
        return res.status(400).json({ success: false, message: "Data tidak lengkap" });
    }

    // 1. Cek apakah username sudah ada di DB
    const checkSql = "SELECT * FROM users WHERE username = ?";
    db.query(checkSql, [username], (err, result) => {
        if (err) return res.status(500).json(err);
        
        if (result.length > 0) {
            return res.status(400).json({ success: false, message: "Username sudah dipakai!" });
        }

        // 2. Jika aman, Masukkan data baru (INSERT)
        const insertSql = "INSERT INTO users (email, username, password) VALUES (?, ?, ?)";
        db.query(insertSql, [email, username, password], (err, result) => {
            if (err) return res.status(500).json(err);
            
            console.log("User baru terdaftar di DB!");
            res.json({ success: true, message: "Registrasi Berhasil!" });
        });
    });
});

// Route LOGIN (UPDATE: Cek ke array users, bukan hardcode lagi)
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Cari user yang username DAN password-nya cocok
    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    
    db.query(sql, [username, password], (err, result) => {
        if (err) return res.status(500).json(err);

        // Jika array result ada isinya, berarti ketemu
        if (result.length > 0) {
            res.json({ 
                success: true, 
                message: "Login Berhasil!", 
                user: result[0] // Ambil data user pertama
            });
        } else {
            res.status(401).json({ success: false, message: "Username atau Password salah!" });
        }
    });
});

app.post('/api/tambahkegiatan', (req, res) => {
    const { 
        nama_kegiatan, 
        kategori, 
        tanggal, 
        waktu_mulai, 
        waktu_selesai, 
        catatan 
    } = req.body;

    // Validasi (catatan boleh kosong)
    if (!nama_kegiatan || !kategori || !tanggal || !waktu_mulai || !waktu_selesai) {
    return res.status(400).json({
        success: false,
        message: "Semua field kecuali catatan wajib diisi!"
    });
}


    const insertSql = `
    INSERT INTO tambahkegiatan 
    (nama_kegiatan, kategori, tanggal, waktu_mulai, waktu_selesai, catatan)
    VALUES (?, ?, ?, ?, ?, ?)
`;

db.query(
    insertSql,
    [nama_kegiatan, kategori, tanggal, waktu_mulai, waktu_selesai, catatan || null],
    (err, result) => {
        if (err) return res.status(500).json(err);

        console.log("Kegiatan baru masuk DB!");
        res.json({ success: true, message: "Kegiatan berhasil ditambahkan!" });
    }
);
});

// Route CREATE TUGAS
app.post('/api/tambahtugas', (req, res) => {
    const { 
        filter = null, 
        judul, 
        deskripsi = null, 
        deadline = null, 
        kesulitan = null, 
        prioritas = null, 
        progress = 0 
    } = req.body;

    // Validasi wajib
    if (!judul || judul.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Judul tugas wajib diisi."
        });
    }

    // Query Insert
    const sql = `
        INSERT INTO tambahtugas 
        (filter, judul, deskripsi, deadline, kesulitan, prioritas, progress)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [filter, judul, deskripsi, deadline, kesulitan, prioritas, progress],
        (err, result) => {
            if (err) {
                console.error("Error INSERT tugas:", err);
                return res.status(500).json({
                    success: false,
                    message: "Gagal menyimpan tugas ke database."
                });
            }

            res.json({
                success: true,
                message: "Tugas berhasil ditambahkan!",
                insertedId: result.insertId
            });
        }
    );
});

// Route CREATE PENGINGAT (Sesuai Struktur Tabel)
app.post('/api/tambahpengingat', (req, res) => {
    const { nama_tugas, jam, menit, tanggal, frekuensi, jenis_pengingat } = req.body;

    // Validasi wajib
    if (!nama_tugas || jam === undefined || menit === undefined || !tanggal || !frekuensi || !jenis_pengingat) {
        return res.status(400).json({
            success: false,
            message: "Semua field wajib diisi!"
        });
    }

    // Normalisasi tanggal (DD/MM/YYYY → YYYY-MM-DD)
    let formatTanggal = tanggal;
    if (tanggal.includes("/")) {
        const [dd, mm, yyyy] = tanggal.split("/");
        formatTanggal = `${yyyy}-${mm}-${dd}`;
    }

    const sql = `
        INSERT INTO tambahpengingat 
        (nama_tugas, jam, menit, tanggal, frekuensi, jenis_pengingat)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [nama_tugas, jam, menit, formatTanggal, frekuensi, jenis_pengingat],
        (err, result) => {
            if (err) {
                console.error("Error INSERT pengingat:", err);
                return res.status(500).json({
                    success: false,
                    message: "Gagal menyimpan pengingat ke database."
                });
            }

            res.json({
                success: true,
                message: "Pengingat berhasil ditambahkan!",
                insertedId: result.insertId
            });
        }
    );
});


app.get('/api/tugas', (req, res) => {
    // Kita urutkan berdasarkan deadline agar yang paling mepet muncul duluan
    const sql = `SELECT * FROM tambahtugas ORDER BY deadline ASC`;

    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error SELECT tugas:", err);
            return res.status(500).json({
                success: false,
                message: "Gagal mengambil tugas dari database."
            });
        }

        // Kirim hasil data (array of objects) ke frontend
        res.json({
            success: true,
            data: result 
        });
    });
});


app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});