import React, {Component} from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './designsurvey.css';
import SurveyView from './subcomponents/SurveyView/SurveyView';
import SuggestedView from './subcomponents/SuggestedView/SuggestedView';
import DiscussionView from './subcomponents/DiscussionView/DiscussionView';
import Download from './subcomponents/SurveyView/Download';
import search from './single-neutral-search.svg';
import {connect} from 'react-redux';

class DesignSurvey extends Component {


    render() {
    
        return (
            <div className='design-survey'>
                <Header />
                {this.props.user.user.company_name === 'DecisionWise' ? (
                    <div className='select-a-company'>
                    <img className='select-a-company-image' src={search} alt='' />
                        <div className='select-warning'>
                            Visit the Admin page to select a company
                        </div>
                    </div>
                )
                
            
            
            : (
                <div className='design-survey-container'>
                    <div className='download-bar'><Download /></div>
                    <div className='survey-space'>
                        <div className='design-survey-left'>
                            <SuggestedView />
                            <DiscussionView />
                        </div>
                        <div className='design-survey-right'>
                            <SurveyView />
                        </div>
                    </div>
                </div>
            )
            
            }
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

export default connect(mapState)(DesignSurvey);