const path = require("path");

module.exports = (app) => {

  app.get('/reserve', (req, res) => {
    res.sendFile(path.join(__dirname, '../../reserve.html'));
  });

  // If no matching route is found default to home
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../index.html'));
  });
};
