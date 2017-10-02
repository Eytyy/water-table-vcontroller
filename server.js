const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);

const port = process.env.PORT || 8080;

app.use(express.static('dist'));

app.get('*', (req, res) => {
	res.sendFile(path.resolve('dist/index.html'));
});

server.listen(port);