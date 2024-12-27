const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/save_score', (req, res) => {
    const { hiScore, name, sol } = req.body;
    const record = {
        "HI SCORE": hiScore,
        "NAME": name,
        "SOL ADDRESS": sol
    };

    let data = [];
    if (fs.existsSync('scores.json')) {
        data = JSON.parse(fs.readFileSync('scores.json'));
    }
    data.push(record);
    fs.writeFileSync('scores.json', JSON.stringify(data));
    res.json({ status: 'success', message: 'Score saved successfully' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
