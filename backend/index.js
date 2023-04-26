const express = require('express')
const app = express()
const fs = require("fs")
const port = 3000
const { Sequelize, DataTypes } = require('sequelize');

app.use(express.json())



const sequelize = new Sequelize(
   'MsgApp',
   'MsgApp',
   'password',
    {
      host: '127.0.0.1',
      dialect: 'mysql'
    }
  );

sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});






const Users = sequelize.define('User', {
  // Model attributes are defined here
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(20),
    allowNull: false
    // allowNull defaults to true
  }
}, {
  tableName: 'users',
  createdAt: false,
  updatedAt: false,
  timestamps: false
  // Other model options go here
});

Users.sync({alter: true});

// const me = Users.create({name: "tollak"});


const Chats = sequelize.define('Chats', {
  // Model attributes are defined here
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(20),
    allowNull: false
    // allowNull defaults to true
  }
}, {
  tableName: 'chats',
  createdAt: false,
  updatedAt: false,
  timestamps: false
  // Other model options go here
});

Chats.sync({alter: true});

// Chats.create({name: "Owen Tollak"});

const Groups = sequelize.define('Groups', {
  // Model attributes are defined here
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  groupId: {
    type: DataTypes.UUID,
    allowNull: false
    // allowNull defaults to true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
    // allowNull defaults to true
  }
}, {
  tableName: 'groupUsers',
  createdAt: false,
  updatedAt: false,
  timestamps: false
  
  // Other model options go here
});

Groups.sync({alter: true});

const Messages = sequelize.define('Messages', {
  // Model attributes are defined here
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  message: {
    type: DataTypes.STRING(2048),
    allowNull: false
    // allowNull defaults to true
  },
  chatId: {
    type: DataTypes.UUID,
    allowNull: false
  }
}, {
  tableName: 'messages',
  createdAt: false,
  updatedAt: false,
  timestamps: false
  
  // Other model options go here
});

Groups.sync({alter: true});



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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
  
})