import React, {Component} from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './designsurvey.css';
import SurveyView from './subcomponents/SurveyView/SurveyView';
import SuggestedView from './subcomponents/SuggestedView/SuggestedView';
import DiscussionView from './subcomponents/DiscussionView/DiscussionView';


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

export default DesignSurvey;