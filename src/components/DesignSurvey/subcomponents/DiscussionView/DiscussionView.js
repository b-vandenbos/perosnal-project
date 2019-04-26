import React, {Component} from 'react';
import io from 'socket.io-client';
import '../../designsurvey.css';
import DiscussionMessage from './DiscussionMessage';
import {connect} from 'react-redux';
import {getDiscussion, newMessage} from './../../../../ducks/discussionReducer';

class DiscussionView extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            message: '',
            discussion: this.props.discussion.discussion
        };

        this.socket = io('/');
        this.socket.on('RECEIVE_DISCUSSION', function(data) {
            addMessage(data);
        });

        const addMessage = data => {
            this.setState({discussion: data});
        }

        this.createMessage = this.createMessage.bind(this);
    }
       
    componentDidMount() {
        this.props.getDiscussion();
        this.discussionScrollbar();
    }

    discussionScrollbar() {
        var discussionBox = document.getElementById('discussion-scroll');
        discussionBox.scrollTop = discussionBox.scrollHeight;
    }

    async createMessage(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            
            let {message} = this.state;
            let {company_id, id, user_image} = this.props.user.user;
            let date = new Date();
            let monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            let month = monthName[date.getMonth()].toString();
            let day = date.getDate().toString();
            let hours = date.getHours();
            var ampm = hours >+ 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12;
            hours = hours.toString();
            let minutes = date.getMinutes();
            minutes = minutes < 10 ? '0'+minutes : minutes;
            minutes = minutes.toString();
            
            let message_date = `${month} ${day}`;
            let message_time = `${hours}:${minutes} ${ampm}`;
            
            let newMessage = {company_id, user_id: id, user_image, message, message_date, message_time};
            let messages = await this.props.newMessage(newMessage);

            await this.socket.emit('SEND_DISCUSSION', messages.value);
            
            this.setState({message: ''});
            this.discussionScrollbar();
        }
    }

    watchMessage(val) {
        this.setState({message: val});
    }
    
    render() {
        let {discussion} = this.state;
  
        let discussions = discussion.map((message, index) => {
            return <DiscussionMessage key={index} message={message} />
        })
        return (
                
            <div className='discussion-frame'>
                <div className='design-survey-section-title'>Discussion</div>
                <div id='discussion-scroll' className='discussion-message-frame'>
                    {discussions}
                </div>
                <div className='discussion-input-frame'>
                    <input   className='discussion-input'
                            placeholder='ENTER MESSAGE HERE'
                            value={this.state.message}
                            onChange={e => this.watchMessage(e.target.value)}
                            onKeyPress={this.createMessage}/>
                </div>
            </div>
        )
    }
}

const mapState = (reduxState) => {
    return {
        discussion: reduxState.discussion,
        user: reduxState.user
    }
}

export default connect(mapState, {getDiscussion, newMessage})(DiscussionView);