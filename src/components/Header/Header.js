import React, {Component} from 'react';
import './header.css';
import logo from './single-neutral-circle.svg';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getUser} from './../../ducks/userReducer';


class Header extends Component {

    componentDidMount() {
        this.props.getUser();
    }
  
    render() {
        const {user} = this.props.user;
        return (
            <div className='header'>
                <div className='header-nav-menu'><Link to={'/design-survey'}>Design Your Survey</Link>
                        <Link to={'/admin'}>Admin</Link><Link to={'/dashboard'}>Dashboard</Link></div>
                <div className='header-account-info'>
                    <div className='header-user-name'>{user.user_name}</div>
                    <img className='header-user-image' src={user.user_image || logo} alt='' />
                </div>
                
            </div>
        )
    }
}

const mapState = (reduxState) => {
    return {
        user: reduxState.user
    }
}

export default connect(mapState, {getUser})(Header);