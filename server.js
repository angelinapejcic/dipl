const PORT = process.env.PORT || 5000;
// Setup Connection to DB
mongoose.connect('mongodb://127.0.0.1:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const guestRoute = require('./routes/guestRoutes');
// const moderatorRoute = require('./routes/moderatorRoutes');
// const adminRoute = require('./routes/adminRoutes');

const errorHandler = require('./_helpers/error-handler');

const dotenv = require('dotenv');
dotenv.config(); 

var express = require("express"),
    app = express(),
    cors = require('cors'),
    bodyParser = require("body-parser"),
    router = express.Router(),
    mongoose = require('mongoose');

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);
app.use(cors());

// Routes
app.use('/guest', guestRoute);
// app.use('/moderator', moderatorRoute);
// app.use('/admin', adminRoute);

// Global error handler
app.use(errorHandler);

// Scraping function
function startScraping() {
  const tehnomedia = require('./scraper/tehnomedia');
}

// Starting server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  startScraping();
});

