require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const app = express();
const authController = require('./controllers/authController');
const companyController = require('./controllers/companyController');
const userController = require('./controllers/userController');
const headlineController = require('./controllers/headlineController');

const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env;

app.use(express.json());
massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    app.listen(SERVER_PORT, () => console.log(`The server is listening on port ${SERVER_PORT}`));
    console.log(`The database is set.`);
});
app.use(session({
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: false
}));


app.post('/auth/register', authController.register);
app.post('/auth/login', authController.login);
app.post('/auth/password-reset', authController.resetPassword);
app.get('/auth/user', authController.userData);
app.get('/auth/logout', authController.logout);

app.post('/company', companyController.newCompany);
app.get('/company', companyController.getAllCompany);

app.get('/users', userController.getAllUsers);