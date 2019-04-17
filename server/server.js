require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const app = express();
const authController = require('./controllers/authController');
const companyController = require('./controllers/companyController');
const userController = require('./controllers/userController');
const surveyController = require('./controllers/surveyController');
const discussionController = require('./controllers/discussionController');
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
app.get('/company/:id', companyController.getCompany);

app.get('/users', userController.getAllUsers);

app.get('/survey', surveyController.getSurvey);
app.get('/dimensions', surveyController.getDimensions);
app.put('/survey/:id', surveyController.updateSurveyItem);
app.post('/survey', surveyController.addSurveyItem);
app.post('/delete/:id',surveyController.deleteSurveyItem);
app.get('/suggested', surveyController.getSuggested);
app.post('/delete-suggested/:id', surveyController.deleteSuggestedItem);
app.post('/transfer-item', surveyController.transferSurveyItem);

app.get('/discussion', discussionController.getDiscussion);
app.post('/discussion', discussionController.createMessage);