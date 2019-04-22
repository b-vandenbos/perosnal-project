import React, {Component} from 'react';
import './login.css';
import dwlogo from './survey-wise-logo.svg';
import axios from 'axios';
import {connect} from 'react-redux';
import {getSuggested, getSurvey, getDimensions} from './../../ducks/surveyReducer';
import {getUser, getAllUsers} from './../../ducks/userReducer';
import {getDiscussion} from './../../ducks/discussionReducer';
import {getAllCompany} from './../../ducks/companyReducer';
import {getHeadlines} from './../../ducks/headlineReducer';

class CreatePassword extends Component {
    constructor() {
        super();

        this.state = {
            password: '',
        }

        this.setPassword = this.setPassword.bind(this);
        this.enterPressed = this.enterPressed.bind(this);
    }

    componentDidMount() {
        this.props.getUser();
    }

    watchPassword(val) {
        this.setState({password: val});
    }

    async setPassword() {
        const {password} = this.state;
        const {user_email} = this.props.user.user;
        const res = await axios.post('/auth/password-reset', {user_email, password});
        if (res.data.loggedIn) {
            await this.props.getUser();
            await this.props.getHeadlines();
            this.props.getAllUsers();
            this.props.getAllCompany();
            this.props.getSuggested();
            this.props.getSurvey();
            this.props.getDimensions();
            this.props.getDiscussion();

            this.props.history.push('/dashboard');
        }
        else {
            this.props.history.push('/');
        }
    }

    enterPressed(event) {
        if (event.key === 'Enter') {
            this.setPassword();
        }
    }

    render() {
        return (
            <div className='login'>
                <div className='login-frame'>
                <img className='login-logo' name='dw-logo' src={dwlogo} alt='dw-logo' />
                    <div className='login-user-email'>{this.props.user.user.user_email}</div>
                    <input  className='login-input'
                            name='password'
                            type='password'
                            placeholder='password'
                            onChange={e => this.watchPassword(e.target.value)}
                            onKeyPress={this.enterPressed}/>
                    <button className='login-button' onClick={() => this.setPassword()}>Set Password</button>
                </div>
            </div>
        )
    }
}

const mapState = (reduxState) => {
    return {
        survey: reduxState.survey,
        user: reduxState.user,
        discussion: reduxState.discussion,
        headlines: reduxState.headlines
    }
}

export default connect(mapState, {getHeadlines, getUser, getAllUsers, getSuggested, getSurvey, getDimensions, getDiscussion, getAllCompany})(CreatePassword);