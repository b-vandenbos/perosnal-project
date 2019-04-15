import React, {Component} from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './designsurvey.css';
import message from './message.svg';
import DiscussionMessage from './subcomponents/DiscussionMessage';

export default class DesignSurvey extends Component {
    componentDidMount() {
        this.discussionScrollbar();
    }

    discussionScrollbar() {
        var discussionBox = document.getElementById('discussion-scroll');
        discussionBox.scrollTop = discussionBox.scrollHeight;
    }
    
    render() {
        return (
            <div className='design-survey'>
                <Header />
                <div className='design-survey-container'>
                    <div className='design-survey-left'>
                        <div className='suggested-frame'>
                            <div className='design-survey-section-title'>Suggested Survey Items</div>
                            <div className='suggested-items'>
                            </div>
                        </div>
                        <div className='discussion-frame'>
                            <div className='design-survey-section-title'>Discussion</div>
                            <div id='discussion-scroll' className='discussion-message-frame'>
                                <DiscussionMessage />
                                <DiscussionMessage />
                                <DiscussionMessage />
                                <DiscussionMessage />
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
                        </div>

                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}