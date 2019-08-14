// Configure your available Node server port here
const serverPort = 9050;

// Required node.js modules
const dotenv = require('dotenv');
const express = require('express');
const colors = require('colors/safe');

dotenv.config();

// Start the server
const server = express();

// Serve only the static files form the dist directory
server.use(express.static(__dirname + '/dist/riccardo'));

// Get the URL and redirect http to https in production environment else redirect to the main file
server.get(/.*/, function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https' && process.env.NODE_ENV === 'production')
        res.redirect('https://'+ req.hostname + req.url);
    else
        res.sendFile(__dirname + '/dist/riccardo/index.html');
});

// Start the server by listening on the default Heroku port
server.listen(process.env.PORT || serverPort, function() {
    console.log(colors.cyan('Node server initialized. Port:', process.env.PORT || serverPort));
});
