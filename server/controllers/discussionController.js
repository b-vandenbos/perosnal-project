module.exports = {
    getDiscussion: async (req, res) => {
        let {company_id} = req.session.user;
        const db = req.app.get('db');
        const allDiscussion = await db.get_discussion(company_id);
        res.status(200).send(allDiscussion);
    },

    createMessage: async (req, res) => {
        const {company_id, user_id, message, message_date, message_time} = req.body;
        const db = req.app.get('db');
        let messages = await db.create_message([company_id, user_id, message, message_date, message_time]);
        res.status(200).send(messages);
    }
}