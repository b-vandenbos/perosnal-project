module.exports = {
    newCompany: async (req, res) => {
        const {company_name, company_logo} = req.body;
        const db = req.app.get('db');
        const companyArr = await db.get_company_by_name(company_name);
        if (companyArr[0]) {
            return res.status(200).send({message: 'Company account already exists.'});
        }
        db.create_company([company_name, company_logo]);
        return res.status(200).send({message: 'Company account has been created.'});
    },

    getAllCompany: async (req, res) => {
        const db = req.app.get('db');
        const allCompany = await db.get_all_company();
        res.status(200).send(allCompany);
    },

    getCompany: async (req, res) => {
        let {id} = req.params;
        const db = req.app.get('db');
        const companyArr = await db.get_company_by_id([id]);
        const company = companyArr[0];
        res.status(200).send(company);
    }
}