const express = require("express");
// const cors = require("cors");
require('dotenv').config()
const app = express();

// var corsOptions = {
//   origin: "http://localhost:8081"
// };
const {QueryTypes} = require("sequelize")
const sequelize = require("./app/db/connection")
// app.use(cors(corsOptions));
const cors = require('cors');

// Enable CORS for all routes
app.use(cors());

// Example of setting up specific CORS options
const corsOptions = {
    origin: 'http://localhost:3000', //Admin  
    // origin: 'http://localhost:3001', // Frontend

    methods: 'GET,POST,PUT,DELETE', // Allow specific HTTP methods
    allowedHeaders: 'Content-Type,Authorization', // Allow specific headers
};

// Use the CORS options
app.use(cors(corsOptions));
let fun = async ()=>{
  // let query = `SELECT *, COUNT(id) as orderCount fROm Users`
  // let data = await sequelize.query(query,{
  //   type:QueryTypes.SELECT
  // })
  // console.log("data........................................",data)
  const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'techsolistechnology@gmail.com',
    pass: 'techsolistechnology@2024' // Use your regular email password
  }
});

const mailOptions = {
  from: 'techsolistechnology@gmail.com',
  to: 'anandchauhan15798@gmail.com',
  subject: 'Nodemailer Test',
  text: 'Hello World!'
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log('Message sent: %s', info.messageId);
});

}

// fun()
// let {data} = require("./location.json")
// let Country = require("./app/modules/models/country.model")
// const State = require("./app/modules/models/state.model")
// const data1 = async ()=>{
//   try {
//     console.log('data.......................',data.length)
//     for(let i =0 ;i<data.length;i++){
//     //  let [country,created] =  await Country.findOrCreate({name:data[i]?.country_name},{name:data[i]?.country_name,code:data[i]?.country_code})
//      let [country,created] =  await Country.findOrCreate({
//       where:{name:data[i]?.country_name},
//       defaults:{name:data[i]?.country_name,code:data[i]?.country_code}
//      })
//      console.log("country.......................",country.dataValues.id)
//      await State.create({
//       name:data[i]?.name,
//       countryId:country.dataValues.id,
//       code:data[i].state_code
//      }
//     )
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }

// data1()
  

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
require("./app/db/connection")

// console.log(".......................",Math.round(Math.random()*10000))

// Server test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
const masterRoutes = require("./masterRoutes")
masterRoutes(app)

let obj = {
  name:"nsns",
  lanme:"sing"
}
let [name,value] = ["name","Anand"]
let obj2 = {
  ...obj,
  [name]:value
}
console.log("obj2............................",obj2)
// require("./app/routes/turorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// zimyo password//////                       4m6t18vi40