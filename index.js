const dotenv = require('dotenv');
dotenv.config();

const { connect } = require('./rabbitmq');

var express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const amqp = require('amqplib');

const router = require('./src/routes');

connect();

console.log(`PORT = ${PORT}`)
mongoose.connection.on('open', () => {
  console.log('DB Connected.');
});

mongoose.connection.on('error', (err) => {
  console.log('DB Connection Error: ', err);
});

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true
});

// app.use( (req, res, next) => {
//   console.log('use1');
//   next();  
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use('/', router);

app.get('/show/:name', (req, res, next) => {
  console.log(`show: originalUrl = ${req.originalUrl}`);
  console.log(`show: method = ${req.method}`);
  console.log(`show: name = ${req.params.name}`);
  res.json({value: req.params.name});
  next()
}, (req, res) => {
  console.log('next middle after route req.params.name = ' + req.params.name);
})

app.use((req, res, next) => {
  console.log(`use5 req.params.name = ${req.params.name}`)
  next(req, res);
})


app.listen(PORT, () => {
  console.log(`Listening ${PORT} ...`);
})

app.use((req, res, next) => {
  console.log(`use6 req.params.name = ${req.params.name}`)
  next()
})

