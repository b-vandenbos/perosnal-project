import React, {Component} from 'react';
import './discussionmessage.css';
import image from './single-neutral-circle.svg';


export default class DiscussionMessage extends Component {
  
    render() {
        return (
            <div className='discussion-message'>
                <div className='discussion-message-content'>
                    <img className='discussion-message-image' src={image} alt='' />
                    <div className='discussion-message-text'>I would like to see some questions added about safety in the workplace.</div>
                </div>
                <div className='discussion-message-timestamp'>April 12<br/>9:17AM</div>
            </div>
        )
    }
}