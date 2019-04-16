import React, {Component} from 'react';
import '../../designsurvey.css';
import SuggestedItem from './SuggestedItem';
import AddSurveyItem from './AddSurveyItem';
import {connect} from 'react-redux';
import {getSuggested} from './../../../../ducks/surveyReducer';
import {getUser} from './../../../../ducks/userReducer';


class SuggestedView extends Component {
    constructor() {
        super();
        
        this.state = {
            addNew: false
        }

        this.addNewToggle = this.addNewToggle.bind(this);
    }
    componentDidMount() {
        this.props.getUser();
        this.props.getSuggested();
    }

    addNewToggle() {
        this.setState({addNew: !this.state.addNew})
    }

    
    render() {
        const {suggested} = this.props.survey;        
        let suggestedSurvey = suggested.map((item, index) => {
            return <SuggestedItem key={index} item={item} />
        })
    
        return (
            this.state.addNew ? (
                <div className='suggested-frame'>
                    <AddSurveyItem addNewToggle={this.addNewToggle} addNew={this.addNew}/> 
                </div>
                ) : (
                <div className='suggested-frame'>
                    <div className='suggested-frame-titlebar'>
                        <div className='design-survey-section-title'>Suggested Survey Items</div>
                        <button className='add-suggested-item-button'
                                onClick={() => this.addNewToggle()}>+</button>
                    </div>
                    <div className='suggested-items'>
                        {suggestedSurvey}
                    </div>
                </div>
                )
        )
    }
}

const mapState = (reduxState) => {
    return {
        survey: reduxState.survey,
        user: reduxState.user
    }
}

export default connect(mapState, {getUser, getSuggested})(SuggestedView);