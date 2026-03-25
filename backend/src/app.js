const express = require('express');
const cors = require('cors');
const {evaluateLoan} = require('./decisionEngine')
const PORT = 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/api/loan", (req, res) => {
    console.log("/api/loan called");
    const { personalCode, amount, period } = req.body;
    console.log("Request body:", req.body);

    // validation
    if (!personalCode || amount == null || period == null) {
        return res.status(400).json({ error: "Missing fields" });
    }

    if (typeof amount !== "number" || typeof period !== "number"){
        return res.status(400).json({error: "Amount and period must be numbers"});
    }

    if (!Number.isInteger(amount) || !Number.isInteger(period)){
        return res.status(400).json({error: "Amount and period must be whole numbers"});
    }


    if (amount < 2000 || amount > 10000 || period < 12 || period > 60) {
        return res.status(400).json({ error: "Invalid amount or period" });
    }

    const result = evaluateLoan(personalCode, amount, period);
    res.json(result);
});

app.listen(PORT,() =>{
    console.log("Server is running on port", PORT);
})