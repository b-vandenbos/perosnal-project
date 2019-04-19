module.exports = {

    getAllUsers: async (req, res) => {
        const db = req.app.get('db');
        let allUsers = await db.get_all_users();
        res.status(200).send(allUsers);
    },

    getAllAdmins: async (req, res) => {
        const db = req.app.get('db');
        let allAdmins = await db.get_all_admins();
        res.status(200).send(allAdmins);
    },

    addUserImage: async (req, res) => {
        const db = req.app.get('db');
        const {id, user_image} = req.body;
        let user = await db.add_user_image(user_image, id);
        res.status(200).send(user);
    },

    updateAdminUser: async (req, res) => {
        const db = req.app.get('db');
        const{id, company_id} = req.body;
        const updatedAdmin = await db.set_admin_company([id, company_id]);
        req.session.user = updatedAdmin[0];
        let user = req.session.user;
        let allAdmins = await db.get_all_admins();
        res.status(200).send({user, allAdmins});
    },

    updateUser: async (req, res) => {
        const db = req.app.get('db');
        const {id, user_name, user_email, company} = req.body;
        await db.update_user([id, user_name, user_email, company]);
        let allUsers = await db.get_all_users();
        let allAdmins = await db.get_all_admins();
        res.status(200).send({allUsers, allAdmins});
    },

    deleteUser: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        console.log(id);
        await db.delete_user(id);
        let allUsers = await db.get_all_users();
        let allAdmins = await db.get_all_admins();
        res.status(200).send({allUsers, allAdmins});
    }
}