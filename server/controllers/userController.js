module.exports = {

    getAllUsers: async (req, res) => {
        const db = req.app.get('db');
        let allUsers = await db.get_all_users();
        res.status(200).send(allUsers);
    }
}