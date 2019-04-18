import React, {Component} from 'react';
import './header.css';
import logo from './single-neutral-circle.svg';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {getUser, logout} from './../../ducks/userReducer';

class Header extends Component {
    constructor() {
        super();

        this.logout = this.logout.bind(this);
    }

    logout() {
        this.props.history.push('/');
        this.props.logout();
    }
    
    render() {
        console.log(this.props);
        const {user} = this.props.user;
        const {activeCompany} = this.props.company;
        return (
            <div className='header'>
                <div className='header-nav-menu'>
                    <Link to={'/dashboard'} style={{ textDecoration: 'none' }}><div className='header-nav-link'>Dashboard</div></Link>
                    <Link to={`/design-survey`} style={{ textDecoration: 'none' }}><div className='header-nav-link'>Design Your Survey</div></Link>
                    <Link to={'/admin'} style={{ textDecoration: 'none' }}><div className='header-nav-link'>Admin</div></Link>
                </div>
                <h1>{this.props.company.activeCompany.company_name ? `Active Company: ${this.props.company.activeCompany.company_name}` : 'Select a Company' }</h1>
                <div className='header-account-info'>
                    <div className='header-account-info-text'>
                        <div className='header-user-name'>{user.user_name}</div>
                        <div className='header-logout-button' onClick={() => this.logout()}>Logout</div>
                    </div>
                    <img className='header-user-image' src={user.user_image || logo} alt='' />
                </div>
                
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

export default connect(mapState, {getUser, logout})(Header);