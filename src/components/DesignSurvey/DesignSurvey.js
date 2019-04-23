import React, {Component} from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './designsurvey.css';
import SurveyView from './subcomponents/SurveyView/SurveyView';
import SuggestedView from './subcomponents/SuggestedView/SuggestedView';
import DiscussionView from './subcomponents/DiscussionView/DiscussionView';
import {connect} from 'react-redux';

class DesignSurvey extends Component {


    render() {
    
        return (
            <div className='design-survey'>
                <Header />
                <div className='design-survey-container'>
                    <div className='design-survey-left'>
                        <SuggestedView />
                        <DiscussionView />
                    </div>
                    <div className='design-survey-right'>
                        <SurveyView />
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

const mapState = (reduxState) => {
    return {
        user: reduxState.user,
        company: reduxState.company
    }
}

export default connect(mapState, {})(DesignSurvey);