const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const {SERVICE, EMAIL_USER, EMAIL_PASSWORD} = process.env;

module.exports = {
    register: async (req, res) => {
        const {company_id, user_name, user_email, isadmin} = req.body;

        let {user} = req.session;
        const db = req.app.get('db');
        const userArr = await db.get_user_by_email(user_email);
        if (userArr[0]) {
            return res.status(200).send({message: 'Email already in use.'});
        }
            let options = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',1,2,3,4,5,6,7,8,9,0];
            let passwordArr = [];
            for (var i = 0; i < 8; i++) {
                let index = Math.floor(Math.random() * 37);
                passwordArr.push(options[index]);
            };
            let password = passwordArr.join('');

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        await db.create_user([company_id, user_name, user_email, hash, isadmin]);
        let admins = await db.get_all_admins();
        let users = await db.get_all_users();
        let companyArr = await db.get_company_by_id(Number(company_id));
        let companyName = companyArr[0].company_name;
        
        
        const transporter = nodemailer.createTransport({
            service: SERVICE,
            auth: {
                user: EMAIL_USER,
              pass: EMAIL_PASSWORD
            }
          })
          
          let output = `
          
          <div style="height:55px;
          background-color:rgb(0,77,113);
          font-family: 'Open Sans Light', sans-serif;
                      font-size: 18px">
                      <h1 style="color:white;
                      margin-left: 5px;
                      text-align: center;">Welcome to SurveyWise!</h1>
          
                      </div>
          <p style="font-family: 'Open Sans', sans-serif;
                      font-size: 14px;
                      color: rgb(84,87,90)">
                      Hello, ${user_name}.<br><br>Our mission is simple: <em>to improve individuals and organizations by turning feedback into results.</em> To do this, we start by understanding your organization and what you need to measure. What is the current culture? What is ${companyName} going through? What's most important to you now, and in the future? We understand what matters most to your success, and we plan on customizing a survey based on those needs. With a strong survey and effective administrative process (let us do the work!), we get strong, actionable survey data. <br><br>Use the username and password below to get started!
          </p>
          <ul style="   list-style: none;
                        font-family: 'Open Sans', sans-serif;
                        font-size: 14px;
                        color: rgb(84,87,90)">
                    <li style="list-style: none;"><strong>Username: ${user_email}</strong></li>
                    <li style="list-style: none;"><strong>Temporary Password: ${password}</strong></li>
          </ul><br><br>
          <a href=''
          style=" font-family: 'Open Sans Light', sans-serif;
                      font-size:18px;
                      background: rgb(0,77,113);
                      color: white;
                      border-radius: 5px;
                      padding: 10px;
                      text-align: center;
                      display: block;
                      margin: auto;
                      width: 300px;">SurveyWise</a>
                      <p style="font-family: 'Open Sans', sans-serif;
                      font-size: 14px;
                      color: rgb(84,87,90)"><br><br>
                      If you have any questions or have trouble logging in, please respond to this email.
                      </p>
                      <p style="font-family: 'Open Sans', sans-serif;
                      font-size: 14px;
                      color: rgb(84,87,90)">
                      ${user.user_name}<br>
                      ${user.user_email}<br>
                  DecisionWise
                  </p>
          `
          
          const mailOptions = {
            from: `SurveyWise <vandenbos.b@gmail.com>`,
            to: `${user_email}`,
            subject: `Welcome to SurveyWise.`,
            text: output,
            html: output,
            replyTo: `${user.user_email}`
        }
          transporter.sendMail(mailOptions, function(err, res) {
              if (err) {
              console.error('there was an error: ', err);
            } else {
              console.log('here is the res: ', res)
            }
          })

          return res.status(200).send({users, admins});
    },

    login: async (req, res) => {
        const {user_email, password} = req.body;
        const db = req.app.get('db');
        const userArr = await db.get_user_by_email(user_email);
        let user = userArr[0];
        if (!user) {
            return res.status(200).send({message: 'Account not found.'});
        }
        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (!passwordMatch) {
            return res.status(401).send({message: 'Incorrect password.'});
        }
        req.session.user = user;
        const passwordSet = user.passwordset;
        if (!passwordSet) {
            return res.status(200).send({message: 'User has been redirected to reset password.', user: req.session.user, loggedIn: false})
        } 
        req.session.user.loggedIn = true;
        const survey = await db.get_survey_by_company_id(req.session.user.company_id);
        res.status(200).send({survey, user: req.session.user, loggedIn: true});
    },

    resetPassword: async (req, res) => {
        const {user_email, password} = req.body;
        const db = req.app.get('db');
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const userArr = await db.user_password_reset(hash, user_email);
        let user = userArr[0];
        req.session.user = user;
        res.status(200).send({message: 'Password Has Been Reset', user: req.session.user, loggedIn: true});
    },

    userData: (req, res) => {
        if (req.session.user) {
            res.status(200).send(req.session.user);
        } else {
            res.status(401).send('Please Log In.');
        }
    },

    logout: (req, res) => {
        req.session.destroy();
        let user = {};
        res.status(200).send(user);
    }
}