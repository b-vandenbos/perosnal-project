import React, {Component} from 'react';
import io from 'socket.io-client';
import User from './User';
import '../admin.css';
import {connect} from 'react-redux';
import {addUser, getAllUsers, getAllAdmins} from './../../../ducks/userReducer';
import {getAllCompany} from './../../../ducks/companyReducer';

class Admin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userSearchInput: '',
            companySearchInput: '',
            user_name: '',
            user_email: '',
            user_company: '',
            checked: false,
            adminView: false,
            allUsers: this.props.user.allUsers,
            allAdmins: this.props.user.allAdmins,
            allCompany: this.props.company.allCompany
        };

        this.socket = io('localhost:4000');
        this.socket.on('RECEIVE_USERS_ADMINS', function(data) {
            receiveUser(data);
        });
        this.socket.on('RECEIVE_COMPANY_USERS_ADMINS', function(data) {
            receiveUpdates(data);
        });
        this.socket.on('RECEIVE_COMPANY_IMAGE', function(data) {
            receiveUser(data);
        });
        this.socket.on('RECEIVE_DELETED_COMPANY_INFO', function(data) {
            receiveDeletedUpdates(data);
        })

        const receiveUser = data => {
            this.setState({allUsers: data.allUsers, allAdmins: data.allAdmins})
        };

        const receiveUpdates = data => {
            this.setState({allCompany: data.allCompany.action.payload, allUsers: data.allUsers.action.payload, allAdmins: data.allAdmins.action.payload})
        };

        const receiveDeletedUpdates = data => {
            this.setState({allCompany: data.allCompany, allUsers: data.allUsers, allAdmins: data.allAdmins});
        };

        this.adminToggle = this.adminToggle.bind(this);

    }

    componentDidMount() {
        this.props.getAllUsers();
        this.props.getAllAdmins();
    }

    watchUserInput(val) {
        this.setState({userSearchInput: val});
    }

    watchCompanyInput(val) {
        this.setState({companySearchInput: val});
    }

    watchUserName(val) {
        this.setState({user_name: val});
    }

    watchUserEmail(val) {
        this.setState({user_email: val});
    }

    watchCompanyId(val) {
        this.setState({user_company: val});
    }

    watchAdmin() {
        this.setState({checked: !this.state.checked});
    }

    async addUser() {
        let {user_name, user_email, user_company, checked} = this.state;
        let isadmin = checked;
        let newUser = {company_id: user_company, user_name, user_email, isadmin};
        let usersAdmins = await this.props.addUser(newUser);
        await this.socket.emit('SEND_USERS_ADMINS', usersAdmins.value);
        this.setState({user_name: '', user_email: '', user_company: '', checked: false});
    }

    adminToggle() {
        this.setState({adminView: !this.state.adminView})
    }

    render() {
        let {allUsers, allAdmins, allCompany} = this.state;
        let users = allUsers.map(user => {
            if (user.user_name.toLowerCase().includes(this.state.userSearchInput) && user.company_name.toLowerCase().includes(this.state.companySearchInput)) {
                return <User key={user.id} person={user} />
            }
        })
        let admins = allAdmins.map(user => {
            if (user.user_name.toLowerCase().includes(this.state.userSearchInput) && user.company_name.toLowerCase().includes(this.state.companySearchInput)) {
                return <User key={user.id} person={user} />
            }
        })
        let companyOptions = allCompany.map(company => {
            return <option key={company.id} value={company.id}>{company.company_name}</option>
        })
        return (
            <div>
                <div className='active-company-title'>
                {this.state.adminView ? 'ADMIN LIST' : `USER LIST`}
                <button className='user-list-toggle-button'
                        onClick={() => this.adminToggle()}>{this.state.adminView ? 'USER' : 'ADMIN'} LIST</button>
               
               
                </div>
                <div className='user-container'>
                    <div className='user-display'>
                        <ul className='user-display-titles'>
                            <li>User Name</li>
                            <li>Email Address</li>
                            <li>{this.state.adminView ? 'Last Viewed' : 'Company'}</li>
                            <li>Delete User</li>
                        </ul>
                        {this.state.adminView ? admins : users}
                    </div>
                    <div className='user-add-container'>
                        <div className='user-search'>
                            <input  className='user-input' 
                                    name='user-searchbar'
                                    value={this.state.userSearchInput}
                                    placeholder='search by name'
                                    onChange={e => this.watchUserInput(e.target.value)} />
                            {this.state.adminView ? null : <input  className='user-input' 
                                    name='company-searchbar'
                                    value={this.state.companySearchInput}
                                    placeholder='search by company'
                                    onChange={e => this.watchCompanyInput(e.target.value)} />}
                        </div>
                        <div className='user-add'>
                            <input  className='user-input'
                                    name='user-name'
                                    value={this.state.user_name}
                                    placeholder='user name'
                                    onChange={e => this.watchUserName(e.target.value)}/>
                            <input  className='user-input'
                                    name='user-email'
                                    value={this.state.user_email}
                                    placeholder='user email'
                                    onChange={e => this.watchUserEmail(e.target.value)}/>
                            <div className='user-input-row3'>
                                <select className='user-select-company'
                                    name='user-select-company'
                                    placeholder='select company'
                                    value={this.state.user_company}
                                    onChange={e => this.watchCompanyId(e.target.value)}>
                                    <option value=''>select company</option>
                                    {companyOptions}
                                </select>
                                <label className='user-input-checkbox'>Admin
                                    <input  type="checkbox"
                                            name='isadmin'
                                            checked={this.state.checked}
                                            onChange={e => this.watchAdmin(e.target.value)}/>
                                    <span className='checkmark'></span>
                                </label>
                                <button className='add-user-button'
                                        onClick={() => this.addUser()}>Add User</button>
                            </div>
                        </div>
                    </div>
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

export default connect(mapState, {addUser, getAllUsers, getAllAdmins, getAllCompany})(Admin);
