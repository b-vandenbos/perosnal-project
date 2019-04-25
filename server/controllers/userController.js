const aws = require('aws-sdk');
const {S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION} = process.env;

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

    updateAdminUser: async (req, res) => {
        const db = req.app.get('db');
        const{id, company_id} = req.body;
        await db.set_admin_company([id, company_id]);
        let newComp = await db.get_company_by_id(company_id);
        let comp = newComp[0];
        let newCompName = comp.company_name;
        req.session.user.company_id = company_id;
        req.session.user.company_name = newCompName;
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
        await db.delete_user(id);
        let allUsers = await db.get_all_users();
        let allAdmins = await db.get_all_admins();
        res.status(200).send({allUsers, allAdmins});
    },

    addUserImage: async (req, res) => {
        const db = req.app.get('db');
        const {id, user_image} = req.body;
        await db.add_user_image([user_image, id]);
        req.session.user.user_image = user_image;
        res.status(200).send(req.session.user);
    },

    addImage: (req, res) => {
        aws.config = {
            region: AWS_REGION,
            accessKeyID: AWS_ACCESS_KEY_ID,
            secretAccessKey: AWS_SECRET_ACCESS_KEY
        };

        const s3 = new aws.S3();
        const fileName = req.query['file-name'];
        const fileType = req.query['file-type'];

        const s3Params = {
            Bucket: S3_BUCKET,
            Key: fileName,
            Expires: 60,
            ContentType: fileType,
            ACL: 'public-read'
        };

        s3.getSignedUrl('putObject', s3Params, (err, data) => {
            if (err) {
                console.log(err);
                return res.end();
            }
            const returnData = {
                signedRequest: data,
                url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
            };

            return res.send(returnData);
        });

    }
}