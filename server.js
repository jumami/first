const express = require('express');
const mongoose = require('mongoose');
const path =require('path');
const config = require('config');

const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json());

app.use('/api',authRoutes);

//used in production to serve client files
if(process.env.NODE_ENV == 'production'){
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//connecting to mongoDB and then running server on port 4444
const dbURI = config.get('dbURI');
const port = process.env.PORT || 4444;
const HOST = 'localhost';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then((result) => app.listen(port, HOST, () => {
    console.log(`Starting server at ${HOST}:${port}`)
  }))
  .catch((err) => console.log(err));