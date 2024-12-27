const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let db = new sqlite3.Database('scores.db');
db.run('CREATE TABLE IF NOT EXISTS scores (id INTEGER PRIMARY KEY AUTOINCREMENT, hiScore INTEGER, name TEXT, sol TEXT)');

app.post('/save_score', (req, res) => {
    const { hiScore, name, sol } = req.body;

    // Basic validation
    if (typeof hiScore !== 'number' && !(/^\d+$/.test(hiScore))) {
        return res.status(400).json({ status: 'error', message: 'Invalid hiScore' });
    }
    if (typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ status: 'error', message: 'Invalid name' });
    }
    if (typeof sol !== 'string' || sol.trim() === '') {
        return res.status(400).json({ status: 'error', message: 'Invalid sol address' });
    }

    const insert = db.prepare('INSERT INTO scores (hiScore, name, sol) VALUES (?, ?, ?)');
    insert.run(hiScore, name, sol, function(err) {
        if (err) {
            return res.status(500).json({ status: 'error', message: 'Database error' });
        }
        res.json({ status: 'success', message: 'Score saved successfully' });
    });
    insert.finalize();
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
