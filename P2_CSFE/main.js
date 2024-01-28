require('dotenv').config();

const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");

const authRoute = require("./routes/authRoute");
const usersRoute = require("./routes/usersRoute");
const rolesRoute = require("./routes/rolesRoute");
const indicatorsRoute = require("./routes/indicatorsRoute");

const app = express();
const PORT = process.env.PORT
app.use(cors());
app.use(bodyParser.json());


app.use("/auth", authRoute)
app.use("/", usersRoute,rolesRoute,indicatorsRoute)

app.listen(PORT, () => {
    console.log(`Server Address:`,PORT)
});