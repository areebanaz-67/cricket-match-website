const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
// const exphbs = require('express-handlebars');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Set up EJS as the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', routes);

app.listen(port, () => console.log(`Server started on port ${port}`));