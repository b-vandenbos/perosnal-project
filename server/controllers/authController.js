const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        const {company_id, user_name, user_email, password, isadmin} = req.body;
        const db = req.app.get('db');
        const userArr = await db.get_user_by_email(user_email);
        if (userArr[0]) {
            return res.status(200).send({message: 'Email already in use.'});
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        let users = await db.create_user([company_id, user_name, user_email, hash, isadmin]);
        return res.status(200).send(users);
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
        res.status(200).send({message: 'Login Successful', user: req.session.user, loggedIn: true});
    },

    resetPassword: async (req, res) => {
        const {user_email, password} = req.body;
        const db = req.app.get('db');
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const userArr = await db.user_password_reset(hash, user_email);
        console.log(userArr);
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
        res.status(200).send({message: 'Log out has been successful.'})
    }
}