import React, {Component} from 'react';
import './user.css';


export default class User extends Component {
  
    render() {
        let {user, emailLogin} = this.props;
        return (
            <ul className='user-list'>
                <li>{user.user_name}</li>
                <li>{user.user_email}</li>
                <li>{user.company_name}</li>
                <li><button className='user-list-button'>Reset</button></li>
            </ul>
        )
    }
}