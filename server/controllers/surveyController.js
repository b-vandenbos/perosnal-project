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
        const {q_id, q_dimension_id,q_text, q_category, company_id} = req.body;
        const db = req.app.get('db');
        let survey = await db.update_survey_item([id, q_id, q_dimension_id, q_text, q_category, company_id]);
        res.status(200).send(survey);
    },

    addSurveyItem: async (req, res) => {
        const {company_id, user_id, q_id, q_dimension_id, q_text, q_category} = req.body;
        const db = req.app.get('db');
        let survey = await db.add_survey_item([company_id, user_id, q_id, q_dimension_id, q_text, q_category]);
        res.status(200).send(survey);
    },

    deleteSurveyItem: async (req, res) => {
        const {id} = req.params;
        const {company_id} = req.body;
        const db = req.app.get('db');
        let survey = await db.delete_survey_item([id, company_id]);
        res.status(200).send(survey);
    },

    deleteSuggestedItem: async (req, res) => {
        const {id} = req.params;
        const {company_id} = req.body;
        const db = req.app.get('db');
        let suggested = await db.delete_suggested_item([id, company_id]);
        res.status(200).send(suggested);
    },

    transferSurveyItem: async (req, res) => {
        const db = req.app.get('db');
        const {company_id, user_id, q_id, q_dimension_id, q_text, q_category, id} = req.body;
        let survey = await db.move_suggested_to_survey([company_id, user_id, q_id, q_dimension_id, q_text, q_category]);
        let suggested = await db.delete_suggested_item([id, company_id]);
        res.status(200).send({survey, suggested});
    },

    addDimension: async (req, res) => {
        const db = req.app.get('db');
        const {company_id, newDimension} = req.body;
        let dimensions = await db.add_dimension([company_id, newDimension]);
        res.status(200).send(dimensions);
    },

    updateDimension: async (req, res) => {
        const {id} = req.params;
        const {company_id, updatedDimension} = req.body;
        const db = req.app.get('db');
        let dimensions = await db.update_dimension([id, company_id, updatedDimension]);
        res.status(200).send(dimensions);
    }
}