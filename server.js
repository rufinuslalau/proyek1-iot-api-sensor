
const express = require("express");

const app = express();
const PORT = 3000;

// Middleware untuk menerima JSON
app.use(express.json());

// Penyimpanan data sensor terakhir (sementara)
let dataTerakhir = null;

// Halaman utama API
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "IoT API Sensor Suhu berjalan - CI/CD Berhasil",
    kelompok: "Kelompok 2"
  });
});

// Endpoint menerima data sensor
app.post("/api/sensor", (req, res) => {
  const { suhu, kelembapan } = req.body || {};

  if (
    typeof suhu !== "number" ||
    !Number.isFinite(suhu) ||
    typeof kelembapan !== "number" ||
    !Number.isFinite(kelembapan)
  ) {
    return res.status(400).json({
      status: "error",
      message: "Suhu dan kelembapan harus berupa angka"
    });
  }

  dataTerakhir = {
    suhu,
    kelembapan,
    waktu: new Date().toISOString()
  };

  console.log("Data sensor diterima:", dataTerakhir);

  res.status(201).json({
    status: "success",
    message: "Data sensor berhasil diterima",
    data: dataTerakhir
  });
});

// Endpoint melihat data sensor terbaru
app.get("/api/sensor", (req, res) => {
  if (!dataTerakhir) {
    return res.status(404).json({
      status: "error",
      message: "Belum ada data sensor"
    });
  }

  res.json({
    status: "success",
    data: dataTerakhir
  });
});

// Menjalankan server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`IoT API berjalan pada port ${PORT}`);
});
