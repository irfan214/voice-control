const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ API Route (Handles Voice Commands)
app.post("/api/voice-command", (req, res) => {
    const { command } = req.body;

    if (!command || command.trim() === "") {
        return res.status(400).json({ error: "No command received" });
    }

    console.log("✅ Received Voice Command:", command);

    let responseMessage = "";
    switch (command.toLowerCase()) {
        case "open dashboard":
            responseMessage = "Navigating to Dashboard";
            break;
        case "open settings":
            responseMessage = "Opening Settings Page";
            break;
        default:
            responseMessage = "Command not recognized!";
    }

    res.json({ message: responseMessage });
});

// ✅ Serve Static Files
app.use(express.static(path.join(__dirname, "public")));

// ✅ Load index.html for Frontend
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});
