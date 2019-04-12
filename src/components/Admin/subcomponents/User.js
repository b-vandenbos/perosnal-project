import React, {Component} from 'react';
import '../admin.css';


export default class User extends Component {
  
    render() {
        let {user} = this.props;
        return (
            <div className='user'>
                <p>{user.company_name}</p>
                <p>{user.user_name}</p>
                <p>{user.user_email}</p>
            </div>
        )
    }
}