import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import icon from './single-neutral-circle.svg';
import './userdashboard.css';
import Headline from './Headline/Headline';
import {connect} from 'react-redux';
import {getUser} from './../../ducks/userReducer';

class UserDashboard extends Component {
    constructor() {
        super();

        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        this.props.getUser();
    }

    logout() {
        this.props.history.push('/');
        axios.get('/auth/logout')
            .catch(err => console.log(`There was an error in logging out: ${err}`));
    }
  
    render() {
        const {user} = this.props.user;
        return (
            <div className='user-dashboard'>
                <div className='user-info'>
                    <img className='user-image' name='user-image' src={user.user_image || icon} alt='' />
                    <div className='user-welcome'>
                        <h1>Welcome, {user.user_name}.</h1>
                        <p>Click on the links below to design your survey or compose survey notification emails.</p>
                    </div>
                    <div className='user-links'>
                        <Link to={'/design-survey'}>Design Your Survey</Link>
                        <Link to={'/admin'}>Admin</Link>
                    </div>
                    <button className='user-logout-button' onClick={() => this.logout()}>Logout</button>
                </div>
                <div className='industry-info-frame'>
                    <div className='industry-info'>
                    <Headline />
                    </div>
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

export default connect(mapState, {getUser})(UserDashboard);