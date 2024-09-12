#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>

// Configura tu red Wi-Fi
const char* ssid = "vodafone5990";
const char* password = "KTXCJN4MDZXQ2Y";

// Crea un servidor web en el puerto 80
ESP8266WebServer server(37842);

// Función para manejar la ruta raíz "/"
void handleRoot() {
  server.send(200, "text/plain", "pong");
}

void setup() {
  Serial.begin(115200); // Inicia la comunicación serial
  WiFi.begin(ssid, password); // Conéctate a la red Wi-Fi

  Serial.print("Conectando a WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("Conectado a la red Wi-Fi");
  Serial.print("Dirección IP: ");
  Serial.println(WiFi.localIP());

  // Configura las rutas de la API
  server.on("/", handleRoot);
  server.begin(); // Inicia el servidor
  Serial.println("Servidor web iniciado");
}

void loop() {
  server.handleClient(); // Maneja las solicitudes de los clientes
}