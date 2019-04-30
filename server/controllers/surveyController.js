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
        const {q_id, q_dimension_id, q_text, q_category, company_id} = req.body;
        const db = req.app.get('db');

        await db.update_survey_item([id, q_id, q_dimension_id, q_text, q_category, company_id]);

        let rawSurvey = await db.get_survey_after_qupdate(company_id);

            for (let i = 0; i < rawSurvey.length; i++) {
                    let compId = rawSurvey[i].company_id;
                    let qId = rawSurvey[i].id;
                    let indexVal = i + 1;
                    db.set_item_index(compId, qId, indexVal);
            }
       
        let survey = await db.get_survey_by_company_id(company_id);
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
        const {company_id, index} = req.body;
        const db = req.app.get('db');
        let survey = await db.delete_survey_item([id, company_id, index]);
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
        let newItemArr = await db.move_suggested_to_survey([company_id, user_id, q_id, q_dimension_id, q_text, q_category]);
        let newItem = newItemArr[0];
        let newItemComp = newItem.company_id;
        let newItemIndex = newItem.index;
        let newItemDim = newItem.q_dimension_id;
        let survey = await db.update_index_after_add([newItemComp, newItemIndex, newItemDim]);
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
        const suggested = await db.get_suggested_by_company_id(company_id);
        res.status(200).send({suggested, dimensions});
    },

    reorderItems: async (req, res) => {
        let {change, id, index, company_id, q_dimension_id} = req.body;
        const db = req.app.get('db');
        if (change === -1) {
            let survey = await db.move_up_survey_item([change, id, index, company_id, q_dimension_id]);
            res.status(200).send(survey);
        } 
        else if (change === 1) {
            let survey = await db.move_down_survey_item([change, id, index, company_id, q_dimension_id]);
            res.status(200).send(survey);
        }
    },

    deleteDimension: async (req, res) => {
        let {company_id, id} = req.body;
        const db = req.app.get('db');
        let rawDimensions = await db.delete_dimension([id, company_id]);
            for (let j = 0; j < rawDimensions.length; j++) {
                let compId = rawDimensions[j].company_id;
                let dimId = rawDimensions[j].id;
                let indexVal = j + 1;
                db.set_dimension_index(compId, dimId, indexVal);
            }
        let dimensions = await db.get_dimensions_by_company_id(company_id);

        let rawSurvey = await db.get_survey_by_company_id(company_id);
            for (let i = 0; i < rawSurvey.length; i++) {
                    let compId = rawSurvey[i].company_id;
                    let qId = rawSurvey[i].id;
                    let indexVal = i + 1;
                    db.set_item_index(compId, qId, indexVal);
            }
        let survey = await db.get_survey_by_company_id(company_id);
        let suggested = await db.get_suggested_by_company_id(company_id);
        res.status(200).send({dimensions, survey, suggested});
    },

    reorderDimensions: async (req, res) => {
        let {change, company_id, id, index} = req.body;
        const db = req.app.get('db');
        if (change === -1) {
            await db.move_up_dimension([change, id, index, company_id]);
        } else if (change === 1) {
            await db.move_down_dimension([change, id, index, company_id]);
        };
        const dimensions = await db.get_dimensions_by_company_id(company_id);
        const rawSurvey = await db.get_survey_after_qupdate(company_id);
            for (let i = 0; i < rawSurvey.length; i++) {
                let compId = rawSurvey[i].company_id;
                let qId = rawSurvey[i].id;
                let indexVal = i + 1;
                db.set_item_index(compId, qId, indexVal);
            }
            let survey = await db.get_survey_by_company_id(company_id);
            let suggested = await db.get_suggested_by_company_id(company_id);
            res.status(200).send({dimensions, survey, suggested});
    }
}