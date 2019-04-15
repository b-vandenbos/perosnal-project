module.exports = {
    getSurvey: async (req, res) => {
        const db = req.app.get('db');
        const survey = await db.get_survey_by_company_id();
        res.status(200).send(survey);
    },

    getSuggested: async (req, res) => {
        const db = req.app.get('db');
        const suggested = await db.get_suggested_by_company_id();
        res.status(200).send(suggested);
    },

    getDimensions: async (req, res) => {
        const db = req.app.get('db');
        const dimensions = await db.get_dimensions_by_company_id();
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
        const {q_id, q_dimension_id, q_text, q_category} = req.body;
        const db = req.app.get('db');
        await db.add_survey_item([q_id, q_dimension_id, q_text, q_category]);
        res.status(200).send('Survey Item Added');
    }

}