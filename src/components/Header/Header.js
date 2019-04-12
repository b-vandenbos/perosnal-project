import React, {Component} from 'react';
import './header.css';
import logo from './single-neutral-circle.svg';
import {connect} from 'react-redux';
import {getUser} from './../../ducks/userReducer';


class Header extends Component {

    componentDidMount() {
        this.props.getUser();
    }
  
    render() {
        return (
            <div className='header'>
                <div className='header-nav-menu'>MENU</div>
                <div className='header-account-info'>
                    <div className='header-user-name'>{this.props.user.user_name}</div>
                    <img className='header-user-image' src={logo} alt='' />
                </div>
                
            </div>
        )
    }
}

const mapState = (reduxState) => reduxState.user;

export default connect(mapState, {getUser})(Header);