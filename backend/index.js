require('dotenv').config({path : "./.env"});
require("@babel/register")({
    extensions: [".js", ".jsx"],
    presets: ["@babel/preset-env", "@babel/preset-react"]
  });  
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
require('./config/db')();
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(cookieParser());
// const corsOptions = {
//     origin : "*",
//     credentials : true
// }



app.use(
    cors({
      origin: "https://walzono.com", // ✅ Allow only your frontend domain
      credentials: true, // ✅ Allow cookies/auth headers
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // ✅ Allow specific HTTP methods
      allowedHeaders: ["Content-Type", "Authorization"], // ✅ Allow custom headers
    })
  );
  
  // Optional: Handle Preflight Requests Manually
  app.options("*", (req, res) => {
    res.header("Access-Control-Allow-Origin", "https://walzono.com");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.sendStatus(200);
  });

app.use(express.json());
app.use(express.urlencoded({extended : true}));

// router mounting...
app.use('/api/user', require('./routes/user.route'));
app.use('/api/partner', require('./routes/partner.route'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});