const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const itemRoutes = require("./routes/itemRoutes");

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
  await mongoose.connect("mongodb://127.0.0.1:27017/shopping", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

// mongoose.connect(mongoUrl, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

app.use("/", itemRoutes);


app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
