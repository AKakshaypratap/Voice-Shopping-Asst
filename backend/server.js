const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const itemRoutes = require("./routes/itemRoutes");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

main().then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.log(err);
});

// MongoDB Connection
async function main() {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

app.use("/", itemRoutes);


app.listen(5000, () => console.log("Backend running on PORT 5000"));
