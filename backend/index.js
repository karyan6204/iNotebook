const connectToMongo = require('./db');  // Import connectToMongo function from db.js to connect our App to database
connectToMongo();       // calling connectToMongo()

const express = require('express') //Import express server
const app = express()
const port = 5000

var cors = require('cors')
app.use(cors())
app.use(express.json())


app.use(express.json());

// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})