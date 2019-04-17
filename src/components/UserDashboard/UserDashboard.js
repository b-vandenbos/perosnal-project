import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import icon from './single-neutral-circle.svg';
import './userdashboard.css';
import Headline from './Headline/Headline';
import {connect} from 'react-redux';
import {getUser, logout} from './../../ducks/userReducer';

class UserDashboard extends Component {
    constructor() {
        super();

        this.state = {
            addImage: false,
            user_image: ''
        }

        this.logout = this.logout.bind(this);
        this.toggleAdd = this.toggleAdd.bind(this);
    }

    componentDidMount() {
        this.props.getUser();
    }

    watchImage(val) {
        this.setState({user_image: val});
    }

    logout() {
        this.props.history.push('/');
        this.props.logout();
    }

    toggleAdd() {
        this.setState({addImage: !this.state.addImage});
    }
  
    render() {
        const {user} = this.props.user;
        return (
            <div className='user-dashboard'>
                <div className='user-info'>
                    <img    className='user-image'
                            name='user-image'
                            src={user.user_image || icon}
                            alt=''
                            onClick={this.toggleAdd}/>
                    {this.state.addImage ? <input   className='user-image-input'
                                                    placeholder='upload profile image'
                                                    value={this.state.user_image}
                                                    onChange={e => this.watchImage(e.target.value)}/> : null}
                    <div className='user-welcome'>
                        <h1>Welcome, {user.user_name}.</h1>
                    </div>
                    <div className='user-links'>
                        <Link to={'/design-survey'} className='user-link-style'>Design Your Survey</Link>
                        {this.props.user.user.isadmin ? <Link to={'/admin'} className= 'user-link-style'>Admin</Link> : null}
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

export default connect(mapState, {getUser, logout})(UserDashboard);