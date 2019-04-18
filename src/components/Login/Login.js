import React, {Component} from 'react';
import './login.css';
import dwlogo from './survey-wise-logo.svg';
import axios from 'axios';
import {connect} from 'react-redux';
import {getSuggested, getSurvey, getDimensions} from './../../ducks/surveyReducer';
import {getUser, getAllUsers, getAllAdmins} from './../../ducks/userReducer';
import {getDiscussion} from './../../ducks/discussionReducer';
import {getAllCompany} from './../../ducks/companyReducer';

class Login extends Component {
    constructor() {
        super();

        this.state = {
            user_email: '',
            password: '',
            companyId: ''
        }

        this.login = this.login.bind(this);
        this.enterPressed = this.enterPressed.bind(this);
    }

    watchEmail(val) {
        this.setState({user_email: val});
    }

    watchPassword(val) {
        this.setState({password: val});
    }

    watchCompanyId(val) {
        this.setState({companyId: val});
    }

    async login() {
        const {user_email, password} = this.state;
        const res = await axios.post('/auth/login', {user_email, password})
        if (!res.data.user.passwordset) {
            await this.props.getUser();
            await this.props.history.push('/password-reset');
        }
        if (res.data.loggedIn) {
            await this.props.getUser();
            this.props.getAllUsers();
            this.props.getAllAdmins();
            this.props.getAllCompany();
            this.props.getSuggested();
            this.props.getSurvey();
            this.props.getDimensions();
            this.props.getDiscussion();

            await this.props.history.push('/dashboard');
        } 
    }

    enterPressed(event) {
        if (event.key === 'Enter') {
            this.login();
        }
    }

    render() {
        return (
            <div className='login'>
                <div className='login-frame'>
                <img className='login-logo' name='dw-logo' src={dwlogo} alt='dw-logo'/>
                    <input  className='login-input'
                            name='email'
                            value={this.state.user_email}
                            placeholder='email address'
                            onChange={e => this.watchEmail(e.target.value)}/>
                    <input  id='password'
                            className='login-input'
                            name='password'
                            value={this.state.password}
                            type='password'
                            placeholder='password'
                            onChange={e => this.watchPassword(e.target.value)}
                            onKeyPress={this.enterPressed} />
                    <button id='login-button' className='login-button' onClick={() => this.login()}>Login</button>
                </div>
            </div>
        )
    }
}

const mapState = (reduxState) => {
    return {
        survey: reduxState.survey,
        user: reduxState.user,
        discussion: reduxState.discussion
    }
}

export default connect(mapState, {getUser, getAllUsers, getAllAdmins, getSuggested, getSurvey, getDimensions, getDiscussion, getAllCompany})(Login);
