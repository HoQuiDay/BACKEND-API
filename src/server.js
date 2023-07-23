const configViewEngine = require('./config/viewEngine');
const express = require('express')
const webRouters = require('./routes/web')
// const connection = require('./config/database')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 8080
// khai bao View engine
configViewEngine(app);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// khai bao router
app.use('/', webRouters);
// Create the connection pool. The pool-specific settings are the defaults
// Config req.body

// connection.query(
//     'SELECT * FROM Users',
//     function (err, results, fields) {
//         console.log(results); // results contains rows returned by server
//         console.log(fields); // fields contains extra meta data about results, if available
//     }
// );
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})