Module.register("MMM-ButtonListener", {
    defaults: {
        pythonPath: "/usr/bin/python3"
    },

    start: function() {
        Log.info("Uruchamianie modułu: " + this.name);
        // Uruchom nasłuchiwanie przy starcie
        this.sendSocketNotification("START_LISTENER", this.config);
    },

    // Moduł jest niewidoczny
    getDom: function() {
        return document.createElement("div");
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "BUTTON_CLICKED") {
            Log.info(this.name + ": Otrzymano sygnał przycisku. Uruchamiam kamerę.");
            // To jest kluczowa linia - uruchamia MMM-LiveCamera
            this.sendNotification("START_PHOTO");
        }
    }
});