module.exports = {
    getSurvey: async (req, res) => {
        const {company_id} = req.session.user;
        const db = req.app.get('db');
        const survey = await db.get_survey_by_company_id(company_id);
        res.status(200).send(survey);
    },

    getSuggested: async (req, res) => {
        const {company_id} = req.session.user;
        const db = req.app.get('db');
        const suggested = await db.get_suggested_by_company_id(company_id);
        res.status(200).send(suggested);
    },

    getDimensions: async (req, res) => {
        const {company_id} = req.session.user;
        const db = req.app.get('db');
        const dimensions = await db.get_dimensions_by_company_id(company_id);
        res.status(200).send(dimensions);
    },

    updateSurveyItem: async (req, res) => {
        const {id} = req.params;
        const {q_id, q_dimension_id,q_text, q_category} = req.body;
        const db = req.app.get('db');
        await db.update_survey_item([id, q_id, q_dimension_id, q_text, q_category]);
        res.status(200).send('Survey Item Updated');
    },

    addSurveyItem: async (req, res) => {
        const {company_id, user_id, q_id, q_dimension_id, q_text, q_category} = req.body;
        const db = req.app.get('db');
        let newItem = await db.add_survey_item([company_id, user_id, q_id, q_dimension_id, q_text, q_category]);
        res.status(200).send(newItem);
    },

    deleteSurveyItem: async (req, res) => {
        const {id} = req.params;
        const db = req.app.get('db');
        await db.delete_survey_item(id);
        res.status(200).send('Survey Item Deleted');
    },

    deleteSuggestedItem: async (req, res) => {
        const {id} = req.params;
        const db = req.app.get('db');
        await db.delete_suggested_item(id);
        res.status(200).send('Suggested Item Deleted');
    }

}