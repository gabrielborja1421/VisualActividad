const mysql = require('mysql');
require('dotenv').config;
// Agregamos los parametros de conexión

let host;
let user;
let password;
let database;
let connection;


if (typeof process.env.host  === "undefined" || process.env.host === '') {
    host = document.getElementById('host').value;
    user = document.getElementById('user').value;
    password = document.getElementById('password').value;
    database = document.getElementById('database').value;
    port = document.getElementById('port').value;

    connection = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database,
        port: port
    });
}else{
    connection = mysql.createConnection({
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database,
        port: process.env.port
    });
    console.log('entra por env');
}



// Conectamos al manejador de base de datos
connection.connect(function (err) {
    if (err) {
        console.log(err.code);
        console.log(err.fatal);
        setTimeout(function(){location.href = './loginbd.html'}, 3000);
    } else {
        console.log('Conexión exitosa');
        if (typeof localStorage === "undefined" || localStorage === null) {
            var LocalStorage = require('node-localstorage').LocalStorage;
            localStorage = new LocalStorage('./scratch');
        }

        if (localStorage.getItem('host') == null) {
            localStorage.setItem('host', host);
            localStorage.setItem('user', user);
            localStorage.setItem('password', password);
            localStorage.setItem('database', database);
            localStorage.setItem('port', port);
        }

        localStorage.setItem('con', connection);
    }
});



module.exports = connection //Exportamos la conexón para que cualquier clase la pueda requerir