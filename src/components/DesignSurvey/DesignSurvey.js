import React, {Component} from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './designsurvey.css';
import message from './message.svg';
import DiscussionMessage from './subcomponents/DiscussionMessage';
import Dimension from './subcomponents/Dimension';
import AddSurveyItem from './subcomponents/AddSurveyItem';
import {connect} from 'react-redux';
import {getSurvey, getSuggested, getDimensions} from './../../ducks/surveyReducer';

class DesignSurvey extends Component {
    constructor() {
        super();
        
        this.state = {
            addNew: false
        }
    }
    componentDidMount() {
        this.discussionScrollbar();
        this.props.getDimensions();
        this.props.getSuggested();
    }

    discussionScrollbar() {
        var discussionBox = document.getElementById('discussion-scroll');
        discussionBox.scrollTop = discussionBox.scrollHeight;
    }
    
    render() {
        const {dimensions, suggested} = this.props.survey;
        let dimensionsList = dimensions.map((dimension, index) => {
            return <Dimension key={index} dimension={dimension} />
        })
        let suggestedSurvey = suggested.map((item, index) => {
            return <p key={index}>{item.q_text}</p>
        })
        return (
            <div className='design-survey'>
                <Header />
                <div className='design-survey-container'>
                    {this.state.addNew ? <AddSurveyItem addNew={this.addNew}/> : null}
                    <div className='design-survey-left'>
                        <div className='suggested-frame'>
                            <div className='design-survey-section-title'>Suggested Survey Items</div>
                            <div className='suggested-items'>
                                {suggestedSurvey}
                            </div>
                        </div>
                        <div className='discussion-frame'>
                            <div className='design-survey-section-title'>Discussion</div>
                            <div id='discussion-scroll' className='discussion-message-frame'>
                                <DiscussionMessage />
                            </div>
                            <div className='discussion-input-frame'>
                                <input className='discussion-input' placeholder='ENTER MESSAGE HERE'/>
                                <button className='discussion-submit-button'><img src={message} alt=''/></button>
                            </div>
                        </div>
                    
                    </div>
                    <div className='design-survey-right'>
                        <div className='survey-frame'>
                        {dimensionsList}
                        </div>

                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

const mapState = (reduxState) => {
    return {
        survey: reduxState.survey
    }
}

export default connect(mapState, {getSurvey, getSuggested, getDimensions})(DesignSurvey);