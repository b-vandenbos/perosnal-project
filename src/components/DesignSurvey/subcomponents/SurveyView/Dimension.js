import React, {Component} from 'react';
import SurveyItem from './SurveyItem';
import {connect} from 'react-redux';
import {getSurvey} from './../../../..//ducks/surveyReducer';

class Dimension extends Component {
    componentDidMount() {
        this.props.getSurvey();
    }

    render() {
        const {dimension, survey} = this.props;
        return (
            <div className='dimension'>
                <div className='design-survey-section-title'>{dimension.q_dimension}</div>
                {
                    survey.survey.map(item => {
                        if (item.q_dimension_id === dimension.id) {
                            return <SurveyItem key={item.id} item={item} dimensionId={dimension.id}/>
                        }
                    })
                }
                
            </div>
        )
    }
}

const mapState = (reduxState) => {
    return {
        survey: reduxState.survey,
        user: reduxState.user
    }
}

export default connect(mapState, {getSurvey})(Dimension);