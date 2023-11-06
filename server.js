const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./Utils/helpers');
const routes = require('./controllers/');
const sequelize  = require('./Connection/config'); // Assuming sequelize is exported from your config

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000, // Set the desired session expiration time
    httpOnly: true,
    secure: false, // Change this to true in a production environment with HTTPS
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Set up Handlebars view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Serve static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'Public')));

app.use(routes);

<<<<<<< HEAD
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
  res.render('main', {layout: 'index'});
});
app.get('/resuME/Public/login.js', (req, res) => {
  res.setHeader('Content-Type', 'text/javascript');
  // Serve the JavaScript file here
});


Sequelize.sync({ force: false }).then(() => {
=======
sequelize.sync({ force: false }).then(() => {
>>>>>>> bae52d737e4b078c3036c327e417b03c751fc1d0
  // Server is listening
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
