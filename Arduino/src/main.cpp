#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <SPI.h>
#include <SD.h>
// Configura tu red Wi-Fi
const char* ssid = "vodafone5990";
const char* password = "KTXCJN4MDZXQ2Y";

// Pins de el lector microSD
const int chipSelect = D8;

// Crea un servidor web en el puerto 80
ESP8266WebServer server(37842);

// Función para manejar la ruta raíz "/"
void handleRoot() {
  server.send(200, "text/plain", "pong");
}

void setup() {
  Serial.begin(9600); // Inicia la comunicación serial
  delay(1000);
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

  Serial.println("Iniciando la tarjeta microSD...");

  // Intentar inicializar la tarjeta SD
  if (!SD.begin(chipSelect)) {
    Serial.println("Error: No se pudo inicializar la tarjeta SD.");
    while (1);  // Detener el programa si hay un error
  }
  Serial.println("Tarjeta SD inicializada correctamente.");

  // Intentar abrir un archivo para escribir
  File file = SD.open("/test.txt", FILE_WRITE);
  if (file) {
    file.println("Prueba de escritura en la tarjeta SD.");
    file.close();
    Serial.println("Archivo escrito y cerrado correctamente.");
  } else {
    Serial.println("Error: No se pudo abrir el archivo para escribir.");
  }

  // Intentar abrir el archivo para lectura
  file = SD.open("/test.txt");
  if (file) {
    Serial.println("Leyendo el archivo:");
    while (file.available()) {
      Serial.write(file.read());
    }
    file.close();
    Serial.println("\nLectura completada y archivo cerrado.");
  } else {
    Serial.println("Error: No se pudo abrir el archivo para lectura.");
  }
}

void loop() {
  server.handleClient(); // Maneja las solicitudes de los clientes
}