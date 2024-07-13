const express= require("express")
const connection= require('./config/dbConnection')
require('dotenv').config()
const route= require("./src/router")
const app= express()



app.use(express.json())


connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('dataBase is Connected' );
});

app.use('/',route)

app.listen(process.env.port||3000, function(){
console.log(`server is running on port :${process.env.port||3000}`)
})