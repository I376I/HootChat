const express = require('express')
const app = express()
const fs = require("fs")
const port = 3000
var mysql      = require('mysql');

app.use(express.json())

var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'todo',
  password : 'password',
  database : 'todo'
});
connection.connect();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  // const test = {"hello":"test"};
  
  // res.send(JSON.stringify(test));
  // console.log("/ recieved");
  console.log("/path called")
  fs.readFile("data.json", "utf-8", (err, data) =>{
    res.send(data);
  });
})
app.get('/get', (req, res) => {
  connection.query('SELECT * FROM todos', function (error, results, fields) {
    if (error) throw error;
    // console.log('The solution is: ', results);
    res.send(results);
  });

})

app.post('/update', (req, res) => {
  const newStatus = req.body;
  const query = "UPDATE todo.todos SET status = '" + newStatus.status + "' WHERE id = " + newStatus.id +";";
  console.log("Query: ", query);
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    // console.log('The solution is: ', results);
    res.sendStatus(200);
  });
})

app.post('/create', (req, res) =>{
  const query = "INSERT INTO todo.todos (name, status) VALUES ('" + req.body.name + "', '" + req.body.status + "')";
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    // console.log('The solution is: ', results);
    res.sendStatus(200);
  });
  console.log(query);
})

app.post('/delete', (req, res) =>{
  const query = "DELETE FROM todo.todos WHERE id=" + req.body.id + ";";
  console.log(query);
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    // console.log('The solution is: ', results);
    res.sendStatus(200);
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

process.on("exit", (code) => {
  connection.end();
})