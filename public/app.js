var app = angular.module("VoiceApp", []);

app.controller("MainController", function ($scope, $http) {
    $scope.command = "";
    $scope.responseMessage = "";

    // ✅ Send Command to Backend
    $scope.sendCommand = function () {
        if (!$scope.command || $scope.command.trim() === "") {
            console.log("❌ No command entered!");
            return;
        }

        console.log("📤 Sending command:", $scope.command);
        
        $http.post("/api/voice-command", { command: $scope.command })
            .then(function (response) {
                console.log("✅ Response:", response.data);
                $scope.responseMessage = response.data.message;
            })
            .catch(function (error) {
                console.error("❌ Error:", error);
                $scope.responseMessage = "Error processing command.";
            });
    };

    // ✅ Voice Recognition Function
    $scope.startListening = function () {
        if (!('webkitSpeechRecognition' in window)) {
            alert("Your browser does not support Speech Recognition!");
            return;
        }

        var recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        // ✅ Start Listening
        recognition.start();
        console.log("🎤 Voice Recognition Started... Speak now!");

        // ✅ Handle Recognized Speech
        recognition.onresult = function (event) {
            var voiceCommand = event.results[0][0].transcript;
            console.log("✅ Recognized Voice Command:", voiceCommand);

            $scope.command = voiceCommand;
            $scope.$apply();
            $scope.sendCommand();
        };

        // ✅ Handle Errors
        recognition.onerror = function (event) {
            if (event.error === "no-speech") {
                alert("❌ No speech detected. Please speak louder and try again!");
            } else {
                console.error("❌ Speech Recognition Error:", event);
                alert("Voice recognition failed: " + event.error);
            }
        };

        // ✅ Handle End of Speech Recognition
        recognition.onend = function () {
            console.log("🛑 Speech recognition ended.");
        };
    };
});
