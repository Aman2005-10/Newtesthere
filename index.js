import express from "express";
import mongoose from "mongoose";

const app = express();
const port = 7000;

// MongoDB connection string
const mongoURI = "mongodb+srv://aman1:%2EN%40U82kYD99d2qU@mycluster.psatu5y.mongodb.net/?retryWrites=true&w=majority&appName=myCluster";

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// Student Schema
const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
}, { timestamps: true });

const Student = mongoose.model("Student", studentSchema);

// Home route
app.get("/", (req, res) => {
    res.json({ message: "Hello From Express App with MongoDB" });
});

// Add student
app.post("/students", async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: "Name and Email are required" });
    }

    try {
        const newStudent = new Student({ name, email });
        await newStudent.save();
        res.status(201).json({ message: "Student added", student: newStudent });
    } catch (err) {
        res.status(500).json({ error: "Failed to add student" });
    }
});

// Get all students
app.get("/students", async (req, res) => {
    try {
        const students = await Student.find();
        res.json({ students });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch students" });
    }
});

app.listen(port, () => {
    console.log(`Starting Server on ${port}`);
});
