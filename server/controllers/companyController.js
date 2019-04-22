module.exports = {
    newCompany: async (req, res) => {
        const {company_name, company_logo} = req.body;
        const db = req.app.get('db');
        const companyArr = await db.get_company_by_name(company_name);
        if (companyArr[0]) {
            return res.status(200).send({message: 'Company account already exists.'});
        }
        let newCompany = await db.create_company([company_name, company_logo]);
        let newCompanyId = newCompany[0].id;
        let dimensions = await db.new_company_dimension_template(newCompanyId);

        let myJob = dimensions[0].id;
        let mySupervisor = dimensions[1].id;
        let myTeam = dimensions[2].id;
        let myOrganization = dimensions[3].id;

        await db.new_company_survey_template(newCompanyId, myJob, myTeam, mySupervisor, myOrganization);
        
        let companyList = await db.get_all_company();
        return res.status(200).send(companyList);
    },

    getAllCompany: async (req, res) => {
        const db = req.app.get('db');
        const allCompany = await db.get_all_company();
        res.status(200).send(allCompany);
    },

    updateCompany: async (req, res) => {
        const db = req.app.get('db');
        let {company_name, company_logo} = req.body;
        let {id} = req.params;
        let allCompanies = await db.update_company([id, company_name, company_logo]);
        res.status(200).send(allCompanies);
    },

    deleteCompany: async (req, res) => {
        const db = req.app.get('db');
        let {id} = req.params;
        let user_id = req.session.user.id;
        await db.delete_company(id);
        await db.assign_new_compid(user_id);
        let user = await db.get_user_by_email(req.session.user.user_email);
        req.session.user = user;
        let updatedUser = req.session.user;
        console.log(updatedUser);
        // let allCompanies = await db.get_all_company();
        let allAdmins = await db.get_all_admins();
        let allUsers = await db.get_all_users();
        res.status(200).send({updatedUser, allUsers, allAdmins});
    }
    
}