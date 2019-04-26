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
app.use( express.static( `${__dirname}/../build` ) );
massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log(`The database is set.`);
    app.listen(SERVER_PORT, () => 
        console.log(`The server is listening on port ${SERVER_PORT}`))
});
app.use(session({
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: false
}));

app.post('/auth/register', authController.register);
app.post('/auth/login', authController.login);
app.post('/auth/password-reset', authController.resetPassword);
app.put('/auth/user/forgot-password/:user_email', authController.resetPasswordEmail);
app.get('/auth/user', authController.userData);
app.get('/auth/logout', authController.logout);

app.post('/company', companyController.newCompany);
app.get('/company', companyController.getAllCompany);
app.put('/company/:id', companyController.updateCompany);
app.delete('/company-delete-info/:id', companyController.deleteCompanyInfo);

app.get('/users', userController.getAllUsers);
app.get('/admins', userController.getAllAdmins);
app.put('/update-admin', userController.updateAdminUser);
app.put('/update-user', userController.updateUser);
app.delete('/delete-user/:id', userController.deleteUser);
app.get('/sign-s3', userController.addImage);
app.post('/add-image', userController.addUserImage);

app.get('/survey', surveyController.getSurvey);
app.get('/dimensions', surveyController.getDimensions);
app.put('/survey/:id', surveyController.updateSurveyItem);
app.put('/dimensions/:id', surveyController.updateDimension);
app.post('/survey', surveyController.addSurveyItem);
app.post('/delete/:id',surveyController.deleteSurveyItem);
app.get('/suggested', surveyController.getSuggested);
app.post('/delete-suggested/:id', surveyController.deleteSuggestedItem);
app.post('/transfer-item', surveyController.transferSurveyItem);
app.post('/add-dimension', surveyController.addDimension);
app.put('/reorder', surveyController.reorderItems);
app.put('/delete-dimension', surveyController.deleteDimension);
app.put('/reorder-dimension', surveyController.reorderDimensions);

app.get('/discussion', discussionController.getDiscussion);
app.post('/discussion', discussionController.createMessage);

app.put('/headlines/nav/:num', headlineController.updateHeadline);