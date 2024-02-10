const express = require("express");

const app = express();

app.use(express.json());

const mongoose = require("mongoose");

const userRoutes = require('./routes/user')
const booksRoutes = require('./routes/books')

//connexion mongodb

mongoose.connect('mongodb+srv://pacha06:ned60@cluster0.eydssau.mongodb.net/?retryWrites=true&w=majority',
  )
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//headers pour CORS

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

const cors = require("cors");

app.use(cors()); // Ce middleware autorise toutes les origines par défaut

app.use('/api/books',booksRoutes)
app.use('/api/auth',userRoutes)
app.use('/images',express.static('images'))


module.exports = app;
