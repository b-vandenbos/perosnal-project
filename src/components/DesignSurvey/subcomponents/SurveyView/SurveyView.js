import React, {Component} from 'react';
import '../../designsurvey.css';
import Dimension from './Dimension';
import {connect} from 'react-redux';
import {getSurvey, getDimensions} from './../../../../ducks/surveyReducer';
import {getUser} from './../../../../ducks/userReducer';


class SurveyView extends Component {
  
    async componentDidMount() {
        this.props.getUser();
        this.props.getDimensions();
    }
    
    render() {
        let {user} = this.props.user;
        const {dimensions} = this.props.survey;
        let dimensionsList = dimensions.map((dimension, index) => {
                return <Dimension key={index} dimension={dimension}/>
        })

        return (
            <div className='survey-frame'>
                {dimensionsList}
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

export default connect(mapState, {getUser, getSurvey, getDimensions})(SurveyView);