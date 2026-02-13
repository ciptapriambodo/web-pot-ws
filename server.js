const express = require("express");
const axios = require("axios");
const path = require("path");
const http = require("http");

const app = express();
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

const PORT = 3000;

// GANTI dengan IP ESP32 kamu
const ESP32_IP = "http://10.42.85.59";

app.use(express.static(path.join(__dirname, "public")));

// fungsi ambil nilai potensiometer
async function getPotValue() {
  try {
    const res = await axios.get(`${ESP32_IP}/pot`);
    return res.data.potValue;
  } catch (err) {
    return null;
  }
}

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
});

// polling data potensiometer tiap 500ms
setInterval(async () => {
  const potValue = await getPotValue();

  if (potValue !== null) {
    io.emit("pot_update", potValue);
  } else {
    io.emit("pot_update", "ERROR");
  }
}, 500);

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
