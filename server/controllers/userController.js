module.exports = {

    getAllUsers: async (req, res) => {
        const db = req.app.get('db');
        let allUsers = await db.get_all_users();
        res.status(200).send(allUsers);
    },

    addUserImage: async (req, res) => {
        const db = req.app.get('db');
        const {id, user_image} = req.body;
        let user = await db.add_user_image(user_image, id);
        res.status(200).send(user);
    },

    updateAdminUser: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.body;
        const {user} = req.session;
        const updatedAdmin = await db.set_admin_company([user.id, id]);
        req.session.user = updatedAdmin[0];
        res.status(200).send(req.session.user);
    }
}