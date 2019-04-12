import React, {Component} from 'react';
import './login.css';
import dwlogo from './dwlogo.svg';
import axios from 'axios';
import {connect} from 'react-redux';
import {getUser} from './../../ducks/userReducer';

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
        const {user_email} = this.props.user;
        const res = await axios.post('/auth/password-reset', {user_email, password});
        if (res.data.loggedIn) {
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
                    <div className='login-user-email'>{this.props.user.user_email}</div>
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

const mapState = (reduxState) => reduxState.user;

export default connect(mapState, {getUser})(CreatePassword);