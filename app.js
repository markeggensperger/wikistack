const express = require('express');
const app = express();
const morgan = require('morgan');
const { db, Page, User } = require('./models');
const wikiPages = require('./routes/wiki');
const wikiUsers = require('./routes/users');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use('/wiki', wikiPages);
app.use('/users', wikiPages);

db.authenticate().then(() => {
  console.log('connected to the database');
});

app.get('/', (req, res) => {
  res.redirect('/wiki');
});

const init = async () => {
  await db.sync({ force: false });
  console.log('Database has synced');
  const PORT = 1337;
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
};
init();
