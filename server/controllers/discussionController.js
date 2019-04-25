const moment = require('react-moment');
const DeviceInfo = rquire('react-native-device-info');


module.exports = {
    getDiscussion: async (req, res) => {
        let {company_id} = req.session.user;
        const db = req.app.get('db');
        const allDiscussion = await db.get_discussion(company_id);
        res.status(200).send(allDiscussion);
    },

    createMessage: async (req, res) => {
        const {company_id, user_id, message, date} = req.body;
            // let date = new Date();
            
            let monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        let month = monthName[date.getMonth()];
        let day = date.getDate();
            var hours = date.getHours() + (offset / 60);
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? '0'+minutes : minutes;
        let time = hours + ':' + minutes + ' ' + ampm;
        const message_date = `${month} ${day}`;
        const message_time = time;

        const db = req.app.get('db');
        let messages = await db.create_message([company_id, user_id, message, message_date, message_time]);
        res.status(200).send(messages);
    }
}