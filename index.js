const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes');
const cors = require('cors');

//Init app
const app = express();

//Load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(cors())

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

//Home Route
app.get(('/'), function(req, res){
    res.render('index', {
        title: 'Test App'
    })
})

let route = require('./routes');
app.use('/', route);

//Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
  });