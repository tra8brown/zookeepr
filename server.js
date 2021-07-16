//11.4.4. these require statements will read the index.js files where indicated
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const fs = require('fs');
const path = require('path');
const express = require('express');
const { animals } = require('./data/animals');

const PORT = process.env.PORT || 3001;
const app = express();

//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
//parse incming JSON data
app.use(express.json());

//11.4.4. tell the server anytime a client navigates to <ourhost>/api, the app will use the router we set up in apiRoutes. 
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

//route to front end public folder
app.use(express.static('public'));

//this should always be last
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});