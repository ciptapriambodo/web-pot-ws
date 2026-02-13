# ESP32 Potentiometer Realtime Monitoring (WebSocket Dashboard)

Proyek ini merupakan sistem monitoring nilai potensiometer secara realtime menggunakan ESP32 dan ditampilkan pada web dashboard sederhana berbasis Node.js + Socket.IO (WebSocket).

Nilai ADC potensiometer akan terbaca oleh ESP32, lalu dikirim ke backend Node.js melalui HTTP, dan ditampilkan ke frontend secara realtime menggunakan WebSocket tanpa perlu refresh halaman.
