let lifeSupportTime = 172800; // 48 hours in seconds
let dataCoresFound = 0;
let isRedAlert = false;

//  SYSTEM LOG 
const logMessages = [
    "Hull Integrity dropping...",
    "Anomaly Detected in Theta-9",
    "Data Corruption rising",
    "Rerouting auxiliary power...",
    "Life support efficiency at 78%",
    "Connection lost to Sector 4",
    "Scanning for bio-signs...",
    "Thermal regulation failing",
    "Encrypting transmission...",
    "Proximity warning: Unknown Object"
];

// Function to log message
function addLogMessage() {
    const container = document.getElementById("system-log-container");

    // Check if container exists (only on index.html)
     if (container) {
         const randomIndex = Math.floor(Math.random() * logMessages.length);
         const messageText = logMessages[randomIndex];

        // Create a new div for the message
        const newEntry = document.createElement("div");
        newEntry.className = "log-entry";

        // Add time
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        newEntry.innerText = "> " + timeString + " " + messageText;

        // Add red color if it is a warning
        if (messageText.includes("Warning") || messageText.includes("Alert") || messageText.includes("failing")) {
            newEntry.style.color = "#ff0033";
        }

        // Add to the top of the list
        container.prepend(newEntry);

        // Keep only 10 messages
        if (container.children.length > 10) {
            container.removeChild(container.lastChild);
        }
    }
}

// Run the log every 2 seconds
setInterval(addLogMessage, 2000);


// --- COUNTDOWN TIMER ---
function updateTimer() {
    const timerElement = document.getElementById("countdown-timer");

    if (timerElement) {
        lifeSupportTime = lifeSupportTime - 1;

        // Calculate hours, minutes, seconds
        const hours = Math.floor(lifeSupportTime / 3600);
        const minutes = Math.floor((lifeSupportTime % 3600) / 60);
        const seconds = lifeSupportTime % 60;

        // Add leading zeros if needed
        let hString = hours;
        if (hours < 10) {
            hString = "0" + hours;
        }

        let mString = minutes;
        if (minutes < 10) {
            mString = "0" + minutes;
        }

        let sString = seconds;
        if (seconds < 10) {
            sString = "0" + seconds;
        }

        // Update text
        timerElement.innerText = hString + ":" + mString + ":" + sString;
    }
}

// Run timer every 1 second
setInterval(updateTimer, 1000);


// --- MONITOR MODE (RED ALERT) ---
const monitorButton = document.getElementById("monitor-btn");

if (monitorButton) {
    monitorButton.onclick = function () {
        const body = document.body;

        if (isRedAlert == false) {
            // Turn ON Red Alert
            body.classList.add("red-alert-mode");
            monitorButton.innerText = "DEACTIVATE ALERT";
            isRedAlert = true;
        } else {
            // Turn OFF Red Alert
            body.classList.remove("red-alert-mode");
            monitorButton.innerText = "MONITOR MODE";
            isRedAlert = false;
        }
    };
}


// --- ACTIVATE PROTOCOL BUTTON ---
const activateButton = document.getElementById("activate-protocol");
const modalWindow = document.getElementById("core-modal");

if (activateButton) {
    activateButton.onclick = function () {
        if (modalWindow) {
            modalWindow.style.display = "flex";
        }
    };
}

// Close modal when clicking it
if (modalWindow) {
    modalWindow.onclick = function () {
        modalWindow.style.display = "none";
    };
}


// --- DIAGNOSTICS PAGE ---
const diagnosticsButton = document.getElementById("run-diagnostics");

if (diagnosticsButton) {
    diagnosticsButton.onclick = function () {
        diagnosticsButton.innerText = "RUNNING...";

        // Wait 2 seconds then show result
        setTimeout(function () {
            const chance = Math.random();

            if (chance < 0.3) {
                // 30% chance to find a core
                dataCoresFound = dataCoresFound + 1;
                alert("DATA CORE FOUND! Total Cores: " + dataCoresFound);

                // Update core count on screen if it exists
                const coreDisplay = document.getElementById("core-count");
                if (coreDisplay) {
                    coreDisplay.innerText = dataCoresFound;
                }
            } else {
                alert("Scan complete. Nothing found.");
            }

            diagnosticsButton.innerText = "RUN DEEP SCAN";
        }, 2000);
    };
}


// --- MISSIONS PAGE ---
const decryptButtons = document.querySelectorAll(".decrypt-btn");

for (let i = 0; i < decryptButtons.length; i++) {
    const btn = decryptButtons[i];

    btn.onclick = function () {

        const buttonClicked = this; // this refers to the button

        buttonClicked.innerText = "DECRYPTING...";

        setTimeout(function () {
            buttonClicked.innerText = "ACCESS GRANTED";
            buttonClicked.disabled = true;
        }, 1500);
    };
}


// --- TRANSMISSIONS PUZZLE ---
const puzzleButtons = document.querySelectorAll(".puzzle-btn");
const puzzleStatus = document.getElementById("puzzle-status");
let currentInput = "";

for (let j = 0; j < puzzleButtons.length; j++) {
    const pBtn = puzzleButtons[j];

    pBtn.onclick = function () {
        const value = this.getAttribute("data-val");
        currentInput = currentInput + value;

        if (puzzleStatus) {
            puzzleStatus.innerText = "INPUT: " + currentInput;
        }

        // Check if code is correct (741)
        if (currentInput == "741") {
            if (puzzleStatus) {
                puzzleStatus.innerText = "SUCCESS! MESSAGE DECODED.";
                puzzleStatus.style.color = "#00ff00";
            }
        } else if (currentInput.length >= 3) {
            // Wrong code
            if (puzzleStatus) {
                puzzleStatus.innerText = "FAILED. RETRYING...";
                puzzleStatus.style.color = "red";
            }
            // Reset after 1 second
            setTimeout(function () {
                currentInput = "";
                if (puzzleStatus) {
                    puzzleStatus.innerText = "";
                    puzzleStatus.style.color = "#888";
                }
            }, 1000);
        }
    };
}
