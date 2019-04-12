import React, {Component} from 'react';
import './login.css';
import dwlogo from './dwlogo.svg';
import axios from 'axios';

export default class Login extends Component {
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
        console.log(res);
        if (!res.data.user.passwordset) {
            this.props.history.push('/password-reset');
        }
        if (res.data.loggedIn) {
            this.props.history.push('/dashboard');
        } 
        this.setState({email: '', password: ''});
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
                <img className='login-logo' name='dw-logo' src={dwlogo} alt='dw-logo' />
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