const express = require("express");
const connectDB = require("./config/db");
const config = require("config");

const app = express();

connectDB();

app.use(express.json());

app.use("/api/posts", require("./routes/api/post"));
app.use("/api/user", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
