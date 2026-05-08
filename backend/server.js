const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// 🔥 SERVE FRONTEND (VERY IMPORTANT FIX)
app.use(express.static(path.join(__dirname, "../web")));

// store latest sensor data
let sensorData = {
  roomTemp: 0,
  humidity: 0,
  bodyTemp: 0,
  bpm: 0
};

// 🧪 SIMULATION MODE
setInterval(() => {

  sensorData = {
    roomTemp: (24 + Math.random() * 6).toFixed(1),
    humidity: (50 + Math.random() * 30).toFixed(0),
    bodyTemp: (36 + Math.random() * 1.5).toFixed(1),
    bpm: Math.floor(65 + Math.random() * 40)
  };

  console.log("----- AXOMED SENSOR DATA -----");
  console.log(sensorData);

  // 💾 SAVE TO MYSQL
  const sql = `
    INSERT INTO health_data (room_temp, humidity, body_temp, bpm)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [
    sensorData.roomTemp,
    sensorData.humidity,
    sensorData.bodyTemp,
    sensorData.bpm
  ], (err) => {
    if (err) console.log("DB Insert Error:", err);
  });

}, 2000);

// 📡 ESP32 sends data here (Phase 2 ready)
app.post("/sensor", (req, res) => {

  sensorData = req.body;

  console.log("----- REAL SENSOR DATA -----");
  console.log(sensorData);

  const { roomTemp, humidity, bodyTemp, bpm } = sensorData;

  const sql = `
    INSERT INTO health_data (room_temp, humidity, body_temp, bpm)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [roomTemp, humidity, bodyTemp, bpm], (err) => {
    if (err) {
      console.log("DB Insert Error:", err);
      return res.status(500).send("DB Error");
    }

    res.send("Saved ✅");
  });
});

// 📊 GET latest data
app.get("/sensor", (req, res) => {
  res.json(sensorData);
});

// 📈 GET history
app.get("/history", (req, res) => {
  db.query(
    "SELECT * FROM health_data ORDER BY created_at DESC LIMIT 20",
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json(result);
    }
  );
});

// 🚀 START SERVER
app.listen(PORT, () => {
  console.log(`AXOMED Server running at http://localhost:${PORT}`);
});