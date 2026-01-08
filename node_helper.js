const NodeHelper = require("node_helper");
const { PythonShell } = require("python-shell");
const path = require("path");

module.exports = NodeHelper.create({
    start: function() {
        this.pyShell = null;
    },

    // --- NOWA FUNKCJA STOP ---
    // To ona posprząta przy restarcie
    stop: function() {
        if (this.pyShell) {
            console.log("MMM-ButtonListener: Zamykanie skryptu Pythona...");
            this.pyShell.end(function (err, code, signal) {
                if (err) console.log("MMM-ButtonListener: Błąd przy zamykaniu: " + err);
            });
            // Dla pewności zabijamy proces dziecka
            if (this.pyShell.childProcess) {
                this.pyShell.childProcess.kill('SIGINT');
            }
            this.pyShell = null;
        }
    },
    // -------------------------

    socketNotificationReceived: function(notification, payload) {
        if (notification === "START_LISTENER") {
            // Jeśli stary skrypt jeszcze działa, zabij go przed startem nowego
            if (this.pyShell) {
                this.stop();
            }
            this.startPythonListener(payload);
        }
    },

    startPythonListener: function(config) {
        const scriptPath = path.join(__dirname, "py/button_listener.py");

        this.pyShell = new PythonShell(scriptPath, {
            mode: "text",
            pythonPath: config.pythonPath || "/usr/bin/python3"
        });

        this.pyShell.on("message", (message) => {
            if (message === "BUTTON_PRESSED") {
                console.log("MMM-ButtonListener: Przycisk wciśnięty!");
                this.sendSocketNotification("BUTTON_CLICKED");
            }
        });

        this.pyShell.on("error", (err) => {
            console.error("MMM-ButtonListener: Błąd skryptu Pythona: ", err);
        });

        this.pyShell.on("close", () => {
            console.log("MMM-ButtonListener: Skrypt Pythona zakończony.");
        });
    }
});
