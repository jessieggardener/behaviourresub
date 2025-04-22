#include <Keyboard.h>

const int buttonPin = 2;
bool lastButtonState = HIGH;

void setup() {
  pinMode(buttonPin, INPUT_PULLUP);
  Keyboard.begin();
}

void loop() {
  bool currentButtonState = digitalRead(buttonPin);
  if (lastButtonState == HIGH && currentButtonState == LOW) {
    Keyboard.press(KEY_RIGHT_ARROW);
    delay(100);  // debounce
    Keyboard.releaseAll();
  }
  lastButtonState = currentButtonState;
}
