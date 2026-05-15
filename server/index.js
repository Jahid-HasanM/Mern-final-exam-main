const express = require('express')
const cors = require('cors')
require('dotenv').config()
const dbConfig = require('./db/db.config')
const routers = require("./router");
const authRouter = require('./router/authRouter');

const app = express()

app.use(cors({ origin: true }))
app.use(express.json())
dbConfig();
app.use(routers);
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({ message: err.message || "server is error" });
});


// ---------

(async () => {
  try {
    dbConnect();
    app.listen(process.env.PORT || 8000, () => console.log("server is running"));
  } catch (error) {
    console.log("error");
  }
})();