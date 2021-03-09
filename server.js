const express = require('express');
const exphbs = require('express-handlebars');
const connection = require('./config/connection');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Routes
app.get('/', (req, res) => {
    connection.query('SELECT * FROM burgers;', (err, data) => {
      if (err) throw err;
      res.render('index', { burgers: data });
    });
  });

app.post('/', (req, res) => {
    connection.query(
      'INSERT INTO burgers (burger) VALUES (?)',
      [req.body.burger],
      (err, result) => {
        if (err) throw err;
        res.redirect('/');
      }
    );
  });

// Log (server-side) when our server has started
app.listen(PORT, () =>
  console.log(`Server listening on: http://localhost:${PORT}`)
);