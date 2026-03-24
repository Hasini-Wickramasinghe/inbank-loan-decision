const express = require('express');
const cors = require('cors');
const {evaluateLoan} = require('./decisionEngine')

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/loan", (req, res) => {
    const { personalCode, amount, period } = req.body;

    // validation
    if (!personalCode || !amount || !period) {
        return res.status(400).json({ error: "Missing fields" });
    }

    if (amount < 2000 || amount > 10000 || period < 12 || period > 60) {
        return res.status(400).json({ error: "Invalid amount or period" });
    }

    const result = evaluateLoan(personalCode, amount, period);
    res.json(result);
});