const express = require('express');
const app = express();
const multer = require('multer');
const fs = require('fs');

app.use(express.json());

const users = [];

// Mendapatkan daftar semua pengguna
app.get('/users', (req, res) => {
    res.json({
        data: users,
        total: users.length
    });
});

// Membuat pengguna baru
app.post('/users', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        res.status(400).json({ message: 'Nama dan email harus diisi' });
        return;
    }

    const newUser = { id: users.length + 1, name, email };
    users.push(newUser);
    res.status(201).json({
        data: newUser
    });
});

// Mendapatkan pengguna berdasarkan ID
app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const user = users.find(u => u.id === id);
    if (!user) {
        res.status(404).json({ message: 'Pengguna tidak ditemukan' });
        return;
    }

    res.json({
        data: user
    });
});

// Mengubah pengguna berdasarkan ID
app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;

    if (!name || !email) {
        res.status(400).json({ message: 'Nama dan email harus diisi' });
        return;
    }

    const user = users.find(u => u.id === id);
    if (!user) {
        res.status(404).json({ message: 'Pengguna tidak ditemukan' });
        return;
    }

    user.name = name;
    user.email = email;

    res.json({
        data: user,
        message: 'Pengguna berhasil diubah'
    });
});

// Menghapus pengguna berdasarkan ID
app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) {
        res.status(404).json({ message: 'Pengguna tidak ditemukan' });
        return;
    }

    const deletedUser = users.splice(userIndex, 1)[0];
    res.json({
        message: "Pengguna berhasil dihapus",
        data: deletedUser
    });
});

// Konfigurasi penyimpanan file menggunakan Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Mengunggah file biner
app.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    if (!file) {
        res.status(400).json({ error: 'Tidak ada file yang diunggah' });
        return;
    }

    res.json({ message: 'File berhasil diunggah', filename: file.filename });
});

// Mengunduh file biner
app.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = `uploads/${filename}`;

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.status(404).json({ error: 'File tidak ditemukan' });
            return;
        }

        res.download(filePath, (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Terjadi kesalahan dalam mengunduh file' });
            }
        });
    });
});

app.listen(3000, () => {
    console.log('Server berjalan pada port 3000');
});