const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.json());
mongoose.connect("mongodb://localhost:27017/studentDB");

const studentSchema = new mongoose.Schema({
  name: String,
  course: String,
  score: Number
});
const Student = mongoose.model("Student", studentSchema);

app.post("/save", async (req, res) => {
  const records = req.body.data;
  for (let i = 1; i < records.length; i++) { // skip header row
    if (records[i][0]) {
      const s = new Student({
        name: records[i][0],
        course: records[i][1],
        score: records[i][2]
      });
      await s.save();
    }
  }
  res.send("Data saved to database");
});

app.listen(3000, () => console.log("Server running on port 3000"));
