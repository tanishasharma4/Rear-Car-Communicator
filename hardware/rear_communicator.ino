/*
  🚗 REAR CAR COMMUNICATOR — HARDWARE EMBEDDED FIRMWARE (Arduino / ESP32)
  Vehicle IoT Safety Prototype Code
  
  Components:
  - Arduino Uno / ESP32 DevKit
  - 4 Push Buttons (Input with internal pull-up resistors)
    - Pin 2: PASS FROM LEFT
    - Pin 3: PASS FROM RIGHT
    - Pin 4: WAIT
    - Pin 5: HELP
  - MAX7219 8x32 Alphanumeric LED Matrix Display (SPI: DIN, CS, CLK)
  - USB Serial Interface (Baud: 9600)
*/

#include <SPI.h>

// Pin Definitions
const int BTN_PASS_LEFT = 2;
const int BTN_PASS_RIGHT = 3;
const int BTN_WAIT = 4;
const int BTN_HELP = 5;

// MAX7219 LED Matrix Pins
const int MAX7219_CS = 10;

String currentDisplayMessage = "PASS FROM LEFT ->";

void setup() {
  Serial.begin(9600);

  // Initialize Push Buttons with internal Pull-up resistors
  pinMode(BTN_PASS_LEFT, INPUT_PULLUP);
  pinMode(BTN_PASS_RIGHT, INPUT_PULLUP);
  pinMode(BTN_WAIT, INPUT_PULLUP);
  pinMode(BTN_HELP, INPUT_PULLUP);

  pinMode(MAX7219_CS, OUTPUT);
  digitalWrite(MAX7219_CS, HIGH);

  Serial.println("SYSTEM_INIT: REAR CAR COMMUNICATOR HARDWARE READY");
  Serial.println("TELEMETRY: RCC-001 | HARDWARE: ONLINE | DISPLAY: MAX7219 8x32");
}

void loop() {
  // Read Physical Push Button Press Events (Active LOW)
  if (digitalRead(BTN_PASS_LEFT) == LOW) {
    handleButtonPress("PASS_LEFT", "PASS FROM LEFT ->");
    delay(300); // Debounce
  } 
  else if (digitalRead(BTN_PASS_RIGHT) == LOW) {
    handleButtonPress("PASS_RIGHT", "<- PASS FROM RIGHT");
    delay(300);
  } 
  else if (digitalRead(BTN_WAIT) == LOW) {
    handleButtonPress("WAIT", "WAIT");
    delay(300);
  } 
  else if (digitalRead(BTN_HELP) == LOW) {
    handleButtonPress("HELP", "EMERGENCY -- HELP");
    delay(300);
  }

  // Read incoming display commands from Web Application over USB Serial
  if (Serial.available() > 0) {
    String incomingMsg = Serial.readStringUntil('\n');
    incomingMsg.trim();
    if (incomingMsg.length() > 0) {
      currentDisplayMessage = incomingMsg;
      updateLEDMatrix(currentDisplayMessage);
    }
  }

  delay(50);
}

void handleButtonPress(String btnName, String messageText) {
  currentDisplayMessage = messageText;
  
  // Output line to Web Serial API
  Serial.print("BTN:");
  Serial.println(btnName);

  updateLEDMatrix(messageText);
}

void updateLEDMatrix(String text) {
  // Driver logic for updating MAX7219 LED Display matrix
  // (In physical deployment, LedControl or MD_Parola library drives matrix)
}
