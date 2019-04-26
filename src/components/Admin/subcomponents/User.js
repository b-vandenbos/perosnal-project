import React, {Component} from 'react';
import io from 'socket.io-client';
import './user.css';
import {connect} from 'react-redux';
import {updateUser, deleteUser, forgotPassword} from './../../../ducks/userReducer';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faUndo } from '@fortawesome/free-solid-svg-icons';
import { faUserMinus } from '@fortawesome/free-solid-svg-icons';

library.add(faCheck);
library.add(faUndo);
library.add(faUserMinus);

class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            user_name: this.props.person.user_name,
            user_email: this.props.person.user_email,
            company: this.props.person.company_id
        };

        this.socket = io('/');

        this.submitEdit = this.submitEdit.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    };

    watchName(val) {
        this.setState({user_name: val});
    };

    watchEmail(val) {
        this.setState({user_email: val});
    };

    watchCompany(val) {
        this.setState({company: val});
    }

    async submitEdit(person) {
        let {user_name, user_email, company} = this.state;
        let {id} = person;        
        let updatedUser = {id, user_name, user_email, company};
        let usersAdmins = await this.props.updateUser(updatedUser);
        await this.socket.emit('SEND_USERS_ADMINS', usersAdmins.value);
        this.setState({edit: false});
    }

    async deleteUser(id) {
        let usersAdmins = await this.props.deleteUser(id);
        await this.socket.emit('SEND_USERS_ADMINS', usersAdmins.value);
    }
  
    render() {
        let {person} = this.props;
        let {allCompany} = this.props.company;
        let companyOptions = allCompany.map(company => {
            return <option key={company.id} value={company.id}>{company.company_name}</option>
        })
        return !this.state.edit ? (
            <ul className='user-list'>
                <li onClick={() => this.setState({edit: !this.state.edit})}>{person.user_name}</li>
                <li onClick={() => this.setState({edit: !this.state.edit})}>{person.user_email}</li>
                <li onClick={() => this.setState({edit: !this.state.edit})}>{person.company_name}</li>
                <li>
                    <button id='delete'
                            className='user-edit-button'
                            onClick={() => this.deleteUser(person.id)}>
                            <FontAwesomeIcon icon='user-minus' /></button>
                </li>
            </ul>
        ) : (
            <ul className='user-list'>
                <li><input  className='user-edit-input'
                            value={this.state.user_name}
                            onChange={e => this.watchName(e.target.value)}/></li>
                <li><input  className='user-edit-input'
                            value={this.state.user_email}
                            onChange={e => this.watchEmail(e.target.value)}/></li>
                <select             className='user-edit-input'
                                    name='user-select-company'
                                    placeholder='select company'
                                    value={this.state.company}
                                    onChange={e => this.watchCompany(e.target.value)}>
                    {companyOptions}
                </select>                
                <li id='user-edit'>
                    <button className='user-edit-button'
                            onClick={() => this.submitEdit(person)}><FontAwesomeIcon icon='check' /></button>
                    <button className='user-edit-button'
                            onClick={() => this.setState({edit: !this.state.edit, user_name: this.props.person.user_name, user_email: this.props.person.user_email, company: this.props.person.company_id})}><FontAwesomeIcon icon='undo' /></button>
                    <button id='delete'
                            className='user-edit-button'
                            onClick={() => this.deleteUser(person.id)}>
                            <FontAwesomeIcon icon='user-minus' /></button>
                </li>
            </ul>
        )
    }
}

const mapState = (reduxState) => {
    return {
        company: reduxState.company,
        user: reduxState.user
    }
}

export default connect(mapState, {updateUser, deleteUser, forgotPassword})(User);