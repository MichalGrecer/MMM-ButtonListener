from gpiozero import Button
from signal import pause
import sys

# Używamy pinu GPIO 17 (zgodnie z Twoim testem)
# pull_up=True włącza wewnętrzny rezystor (pin jest WYSOKI, wciśnięcie zwiera do masy)
button = Button(17, pull_up=True)

def on_button_press():
    # Wyślij sygnał do node_helper.js
    # flush=True jest krytyczne, aby Node.js odebrał to natychmiast
    print("BUTTON_PRESSED", flush=True)

# Powiąż funkcję z wciśnięciem przycisku
button.when_pressed = on_button_press

# Utrzymaj skrypt przy życiu
pause()
