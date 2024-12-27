EJS_player = "#game";
EJS_core = "CORE_NAME";
EJS_pathtodata = "https://cdn.emulatorjs.org/stable/data/";
EJS_gameUrl = "https://allancoding-website-files.on.drv.tw/ROM_FILE_NAME_&_PATH.zip";

const boundingBox = { left: 1673, top: 53, width: 358, height: 187 };

async function captureAndSaveScore() {
    try {
        const fullCanvas = await html2canvas(document.body);
        const c = document.createElement("canvas");
        c.width = boundingBox.width;
        c.height = boundingBox.height;
        const ctx = c.getContext("2d");
        ctx.drawImage(fullCanvas, boundingBox.left, boundingBox.top, boundingBox.width, boundingBox.height, 0, 0, boundingBox.width, boundingBox.height);

        const result = await Tesseract.recognize(c, 'eng');
        const recognizedText = result.data.text;
        console.log("Raw recognized text:", recognizedText);

        const match = recognizedText.match(/HI\s*(\d+)/i);
        const hiScore = match && match[1] ? match[1] : "0";

        // Show modal
        document.getElementById('score-modal').style.display = 'block';

        // Event listener for submit button
        document.getElementById('submit-score').addEventListener('click', async () => {
            const name = document.getElementById('name-input').value;
            const sol = document.getElementById('sol-input').value;

            const payload = { hiScore, name, sol };
            const response = await fetch("/save_score", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            const resultJSON = await response.json();
            alert("Score data posted to server:\n" + JSON.stringify(resultJSON));
            document.getElementById('score-modal').style.display = 'none';
        });

        // Event listener for cancel button
        document.getElementById('cancel-score').addEventListener('click', () => {
            document.getElementById('score-modal').style.display = 'none';
        });
    } catch (error) {
        console.error("Error capturing or recognizing the score:", error);
        alert("Could not capture the high score. See console for details.");
    }
}

window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    e.returnValue = '';
    captureAndSaveScore();
});
