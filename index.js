import express from "express";

const app = express();
const port = 7000;

app.use("/" , (req ,res) => {
    res.json({messgage : "Hello From Express App "})
})

app.listen(7000 ,() => {
    console.log(`Starting Server on ${port}`)
})