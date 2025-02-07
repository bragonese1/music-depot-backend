const express = require('express');
const routes = require('./routes');
// import sequelize connection
const sequelize = require('./config/connection'); // Import Sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => { // Sync Sequelize models to the database
  app.listen(PORT, () => {
    console.log(`listening on ${PORT}!`);
  });
});

