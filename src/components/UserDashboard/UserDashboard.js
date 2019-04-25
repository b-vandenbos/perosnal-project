import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './userdashboard.css';
import Headline from './Headline/Headline';
import UserImage from './UserImage';

import {connect} from 'react-redux';
import {getUser, addUserImage, logout} from './../../ducks/userReducer';
import {headlineIndex} from './../../ducks/headlineReducer';

import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';


library.add(faChevronRight);
library.add(faChevronLeft);

class UserDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addImage: false,
            user_image: '',
            headlines: [],
            headlineIndex: this.props.headlines.headlineIndex,
            isUploading: true
        }

        this.logout = this.logout.bind(this);
        this.toggleAdd = this.toggleAdd.bind(this);
        this.addImage = this.addImage.bind(this);
        this.organizeHeadlines = this.organizeHeadlines.bind(this);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }

    componentDidMount() {
        if (!this.props.user.user.loggedIn) {
            this.props.history.push('/');
        }
        this.props.getUser();
        this.organizeHeadlines();
    }

    watchImage(val) {
        this.setState({user_image: val});
    }

    async addImage(event) {
        if (event.key === 'Enter') {
            const {user_image} = this.state;
            const {id} = this.props.user.user;
            let userImage = {user_image, id}
            await this.props.addUserImage(userImage)
            this.setState({user_image: '', addImage: false});

            this.props.getUser();
        }
    }

    logout() {
        this.props.history.push('/');
        this.props.logout();
    }

    toggleAdd() {
        this.setState({addImage: !this.state.addImage});
    }

    organizeHeadlines() {
        let titles = Object.values(this.props.headlines.headlines);
        this.setState({headlines: titles});
    }

    next() {
        let {headlines} = this.state;
        let {headlineIndex} = this.props.headlines;
        if (headlineIndex !== headlines.length -1) {
            let num = headlineIndex + 1;
            this.props.headlineIndex(num);
        }
        else if (headlineIndex === headlines.length - 1) {
            this.props.headlineIndex(0);
        }
    }

    previous() {
        let {headlines} = this.state;
        let {headlineIndex} = this.props.headlines;
        if (headlineIndex !==0) {
            let num = headlineIndex -1;
            this.props.headlineIndex(num);
        }
        else if (headlineIndex === 0) {
            let num = headlines.length -1;
            this.props.headlineIndex(num);
        }
    }
  
    render() {
        const {user} = this.props.user;
        return (
            <div className='user-dashboard'>
                <div className='user-info'>
                    <UserImage />
                    <div className='user-welcome'>
                        <h1>Welcome, {user.user_name}.</h1>
                    </div>
                    <div className='user-links'>
                        <Link to={`/design-survey`} className='user-link-style'>Design Your Survey</Link>
                        {user.isadmin ? <Link to={'/admin'} className= 'user-link-style'>Admin</Link> : null}
                    </div>
                    <button className='user-logout-button' onClick={() => this.logout()}>Logout</button>
                </div>
                <div className='industry-info-frame'>
                    <button className='w3-button w3-display-left nav-button'
                            onClick={() => this.previous()}><FontAwesomeIcon icon='chevron-left' /></button>
                    <div className='industry-info w3-display-container '>
                        {this.state.headlines.map((headline, index) => {
                            if (index === this.props.headlines.headlineIndex) {
                                return <Headline key={index} headline={headline} />
                            }
                        })}
                    </div>
                    <button className='w3-button w3-display-right nav-button'
                            onClick={() => this.next()}><FontAwesomeIcon icon='chevron-right' /></button>
                </div>
            </div>
        )
    }
}

const mapState = (reduxState) => {
    return {
        user: reduxState.user,
        headlines: reduxState.headlines
    }
}

export default connect(mapState, {getUser, addUserImage, logout, headlineIndex})(UserDashboard);