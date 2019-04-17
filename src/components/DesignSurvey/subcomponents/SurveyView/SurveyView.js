import React, {Component} from 'react';
import '../../designsurvey.css';
import Dimension from './Dimension';
import {connect} from 'react-redux';
import {getDimensions} from './../../../../ducks/surveyReducer';


class SurveyView extends Component {
  
    componentDidMount() {
        this.props.getDimensions();
    }
    
    render() {
        const {dimensions} = this.props.survey;
        let dimensionsList = dimensions.map(dimension => {
                return <Dimension key={dimension.id} dimension={dimension}/>
        })

        return (
            <div className='survey-frame'>
                <div className='survey-frame-titlebar'>
                    <button className='add-dimension-button'>Add Frame of Reference</button>
                </div>
                <div className='survey-body'>
                    {dimensionsList}
                </div>
            </div>
        )
    }
}

const mapState = (reduxState) => {
    return {
        survey: reduxState.survey
    }
}

export default connect(mapState, {getDimensions})(SurveyView);