import React, {Component} from 'react';
import io from 'socket.io-client';
import '../../designsurvey.css';
import SuggestedItem from './SuggestedItem';
import AddSurveyItem from './AddSurveyItem';
import {connect} from 'react-redux';
import {getSuggested} from './../../../../ducks/surveyReducer';
import {getUser} from './../../../../ducks/userReducer';


class SuggestedView extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            addNew: false,
            suggested: this.props.survey.suggested
        }

        this.socket = io('/');
        this.socket.on('ping', function(data) {
            this.socket.emit('pong', {beat:1});
        });
        this.socket.on('RECEIVE_SUGGESTED', function(data) {
           getSuggested(data);
        });
        this.socket.on('RECEIVE_SUGGESTED_AND_SURVEY', function(data) {
            getSuggested(data.suggested);
        });
        this.socket.on('RECEIVE_DIM_SURVEY_SUGGESTED', function(data) {
            getSuggested(data.suggested);
        })
        
        const getSuggested = data => {
            this.setState({suggested: data})
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
        const {suggested} = this.state;        
        let suggestedSurvey = suggested.map(item => {
            return <SuggestedItem key={`sug${item.id}`} item={item} />
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