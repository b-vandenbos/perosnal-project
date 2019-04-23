import React, {Component} from 'react';
import './discussionmessage.css';
import icon from './single-neutral-circle.svg';
import {connect} from 'react-redux';
import {getUser} from './../../../../ducks/userReducer';


class DiscussionMessage extends Component {
  
    render() {
        let {message} = this.props;
        let {user} = this.props.user;
        
        return (
            (user.id === message.user_id) ? (
                <div className='discussion-message'>
                    <div className='discussion-message-timestamp'>{message.message_date} {message.message_time}</div>
                    <div className='discussion-message-content self'>
                    <div className='discussion-message-image' style={{backgroundImage: `url(${message.user_image || icon})`}}></div>
                        <div className='discussion-message-text'>{message.message}</div>
                    </div>
                </div>
        ) : (
            <div className='discussion-message'>
                    <div className='discussion-message-content other'>
                        <div className='discussion-message-text'>{message.message}</div>
                        <div className='discussion-message-image' style={{backgroundImage: `url(${message.user_image || icon})`}}></div>
                    </div>
                    <div className='discussion-message-timestamp'>{message.message_date} {message.message_time}</div>
                </div>

        )
        )
    }
}

const mapState = (reduxState) => {
    return {
        user: reduxState.user
    }
}

export default connect(mapState, {getUser})(DiscussionMessage);