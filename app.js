const express = require('express');
const app = express()
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index')
});

app.use(express.static(__dirname + '/public'));
var adminController = require('./admin.js');
app.use('/', adminController);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log('listening on port' + PORT);