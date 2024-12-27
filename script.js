EJS_player = "#game";
EJS_core = "CORE_NAME";
EJS_pathtodata = "https://cdn.emulatorjs.org/stable/data/";
EJS_gameUrl = "https://allancoding-website-files.on.drv.tw/ROM_FILE_NAME_&_PATH.zip";

// Function to capture and save the high score
const boundingBox = { left: 1673, top: 53, width: 358, height: 187 };

async function captureAndSaveScore() {
    try {
        // Screenshot entire page
        const fullCanvas = await html2canvas(document.body);

        // Create a new canvas for the cropped image
        const c = document.createElement("canvas");
        c.width = boundingBox.width;
        c.height = boundingBox.height;
        const ctx = c.getContext("2d");
        ctx.drawImage(
            fullCanvas,
            boundingBox.left, boundingBox.top, boundingBox.width, boundingBox.height,
            0, 0, boundingBox.width, boundingBox.height
        );

        // Perform OCR on the cropped image
        const result = await Tesseract.recognize(c, 'eng');
        const recognizedText = result.data.text;
        console.log("Raw recognized text:", recognizedText);

        // Extract the numeric portion from something like "HI 000700"
        const match = recognizedText.match(/HI\s*(\d+)/i);
        const hiScore = match && match[1] ? match[1] : "0";

        // Prompt user for name and Solana address
        const userName = prompt("Enter your name:", "") || "";
        const solAddress = prompt("Enter your SOL address:", "") || "";

        // Send data to backend
        const payload = {
            hiScore: hiScore,
            name: userName,
            sol: solAddress
        };
        const response = await fetch("/save_score", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        const resultJSON = await response.json();
        alert("Score data posted to server:\n" + JSON.stringify(resultJSON));
    } catch (error) {
        console.error("Error capturing or recognizing the score:", error);
        alert("Could not capture the high score. See console for details.");
    }
}

// Trigger the captureAndSaveScore function when the user tries to exit
window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    e.returnValue = '';
    captureAndSaveScore();
});
