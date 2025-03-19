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
// app.use(cors(corsOptions));
// app.options('*', cors({
//     origin: 'https://walzono.com',
//     credentials: true
//   }));

app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://walzono.com"); // Allow only walzono.com
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});


app.use(express.json());
app.use(express.urlencoded({extended : true}));

// router mounting...
app.use('/api/user', require('./routes/user.route'));
app.use('/api/partner', require('./routes/partner.route'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});