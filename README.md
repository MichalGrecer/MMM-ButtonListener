# MMM-ButtonListener

`MMM-ButtonListener` is a module for the MagicMirror² project that allows integration of a physical button connected to the Raspberry Pi GPIO pins. The module detects button presses and broadcasts an internal notification to other modules (triggering `START_PHOTO` by default).

## Features

* **GPIO Support:** Uses the gpiozero Python library for stable button debouncing and reading.
* **Two-Way Communication:** Utilizes python-shell for efficient signal transmission between Python and Node.js.
* **Process Management:** Automatically closes and restarts the Python script during MagicMirror reloads to prevent GPIO pin locking.
* **Integration:** Sends a START_PHOTO notification ([MMM-LiveCamera](https://github.com/MichalGrecer/MMM-LiveCamera)) that can be intercepted by camera modules or other notification-aware modules.

### Hardware Requirements

* Raspberry Pi (any version with GPIO).
* A physical button (Microswitch).
* **Connection:** Connect the button to **GPIO pin 17** and a **GND (Ground)** pin. The module uses an internal pull-up resistor.

For this module, please focus specifically on the connections labeled "Button"

![Schematic](images/schemat-lustra.png)

---

## Installation

1. Navigate to your MagicMirror `modules` directory:
   ```bash
   cd ~/MagicMirror/modules
   ```

2. Clone this repository:
    ```bash
    git clone https://github.com/MichalGrecer/MMM-ButtonListener.git
    ```

3. Enter the module directory:
    ```bash
    cd MMM-ButtonListener
    npm install
    ```

4. Ensure the `gpiozero` library is installed for Python:
    ```bash
    sudo apt-get update
    sudo apt-get install python3-gpiozero
    ```


## Configuration

Add the module to your `config.js` file. Note that your MagicMirror resolution is set to **1120x720**, but you can capture photos at much higher resolutions:

```javascript
{
    module: "MMM-ButtonListener",
    config: {
        pythonPath: "/usr/bin/python3" // Path to Python (default is /usr/bin/python3)
    }
},
```


## How It Works

1. Upon starting MagicMirror, the module launches the `button_listener.py` Python script.
2. The script waits for pin 17 to be shorted to ground (the button press).
3. Once a press is detected, Python sends the `BUTTON_PRESSED` signal to `node_helper.js`.
4. `node_helper.js` passes this information to the main module file, which broadcasts the `START_PHOTO` notification to the MagicMirror ecosystem.

## Troubleshooting

* If the button is unresponsive, double-check your wiring on pin 17 and GND.
* Check the MagicMirror logs (e.g., using `pm2 logs`) to see debug messages from `MMM-ButtonListener`.