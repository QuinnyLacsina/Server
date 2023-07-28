const express = require('express'); //run server
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const mysql = require('mysql2');
const http = require('http');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'admin2',
  password: 'password123',
  database: 'ecommerce',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});





app.get('/shipping', (req, res) => {
  res.send([
    {
      "type": "Same Day",
      "price": 25.99
    },
    {
      "type": "2-Day",
      "price": 15.99
    },
    {
      "type": "Regular",
      "price": 5.99
    }
  ]
  );
});


app.post("/api/echeckout/add", (req,res) => {
  console.log("1");
  let details ={
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    address: req.body.address,
  };
  let sql = "INSERT INTO echeckout SET ?";
  connection.query(sql, details, (error) => {
    console.log("2");
    if (error) {
      res.send({ status: false, message: "Failed to checkout"});
    } else {
      res.send({ status: true, message: "Successfully checkout"});
    }
    
    
  });
});

//view the records

app.get('/api/echeckout', (req, res) => {
  var sql = "SELECT * FROM echeckout";
  connection.query(sql, function (error, result) {
      if (error) {
          console.log("Error");
      } else {
          res.send({status:true, data:result});
      }
  });

});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});