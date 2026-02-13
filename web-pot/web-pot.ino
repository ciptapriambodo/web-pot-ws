#include <WiFi.h>
#include <WebServer.h>

const char* ssid = "botzterminator";
const char* password = "botzadmin123";

WebServer server(80);

const int potPin = 34;

void handlePot() {
  int potValue = analogRead(potPin); // 0 - 4095

  String json = "{";
  json += "\"potValue\":" + String(potValue);
  json += "}";

  server.send(200, "application/json", json);
}

void setup() {
  Serial.begin(115200);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nESP32 Connected!");
  Serial.print("ESP32 IP: ");
  Serial.println(WiFi.localIP());

  server.on("/pot", handlePot);
  server.begin();
}

void loop() {
  server.handleClient();
}
