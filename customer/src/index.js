const express = require('express');
const { PORT } = require('./config');
const { databaseConnection } = require('./database');
const expressApp = require('./express-app');
const errorHandler  = require("./utils/errors/index");
// annotate
const StartServer = async() => {

    const app = express();
    
    await databaseConnection();
    
    await expressApp(app);

    errorHandler(app);

    app.listen(PORT, () => {
        console.log(` Customer listening to port ${PORT}`);
    })
    .on('error', (err) => {
        console.log(err);
        process.exit();
    })
}

StartServer();