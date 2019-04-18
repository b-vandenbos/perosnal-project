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
        const {user} = this.props.user;
        return (
            <div className='header'>
                <div className='header-nav-menu'>
                    <Link to={'/dashboard'} style={{ textDecoration: 'none' }}><div className='header-nav-link'>Dashboard</div></Link>
                    <Link to={`/design-survey`} style={{ textDecoration: 'none' }}><div className='header-nav-link'>Design Your Survey</div></Link>
                    {user.isadmin ? <Link to={'/admin'} style={{ textDecoration: 'none' }}><div className='header-nav-link'>Admin</div></Link> : null}
                </div>
                <div className='header-account-info'>
                    <div className='header-account-info-text'>
                        <div className='header-user-name'>{user.user_name}</div>
                        {user.isadmin ? <div className='header-user-name'>Viewing: {user.company_name}</div> : null}
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

export default withRouter(connect(mapState, {getUser, logout})(Header));