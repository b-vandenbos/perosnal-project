import React, {Component} from 'react';
import User from './User';
import '../admin.css';
import {connect} from 'react-redux';
import {addUser, getUser, getAllUsers} from './../../../ducks/userReducer';
import {getAllCompany, getCompany} from './../../../ducks/companyReducer';

class Admin extends Component {
    constructor() {
        super();

        this.state = {
            userSearchInput: '',
            user_name: '',
            user_email: '',
            user_password: '',
            user_company: '',
            checked: false,
            adminView: false
        };

        this.getUserList = this.getUserList.bind(this);
        this.adminToggle = this.adminToggle.bind(this);

    }

    componentDidMount() {
        this.props.getUser();
        this.props.getAllUsers();
    }

    watchUserInput(val) {
        this.setState({userSearchInput: val});
    }

    watchUserName(val) {
        this.setState({user_name: val});
    }

    watchUserEmail(val) {
        this.setState({user_email: val});
    }

    watchPassword(val) {
        this.setState({user_password: val});
    }

    watchCompanyId(val) {
        this.setState({user_company: val});
    }

    watchAdmin() {
        this.setState({checked: !this.state.checked});
    }

    async addUser() {
        let {user_name, user_email, user_password, user_company, checked} = this.state;
        let isadmin = checked;
        let newUser = {company_id: user_company, user_name, user_email, password: user_password, isadmin};
        await this.props.addUser(newUser);
        this.props.getAllUsers();
        this.setState({user_name: '', user_email: '', user_password: '', user_company: '', checked: false});
    }

    async getUserList() {
        let {company_id} = this.props.company.activeCompany;
        await this.props.getAllUsers(company_id);

    }

    adminToggle() {
        this.setState({adminView: !this.state.adminView})
    }

    render() {
        let {allUsers} = this.props.user;
        let {allCompany} = this.props.company;
        let users = allUsers.map((user, index) => {
            if (user.user_name.toLowerCase().includes(this.state.userSearchInput)) {
                return <User key={index} user={user}/>
            }
        })
        
        let companyOptions = allCompany.map((company, index) => {
            return <option key={index} value={company.id}>{company.company_name}</option>
        })
        return (
            <div>
                <div className='active-company-title'>
                {this.state.adminView ? 'ADMIN LIST' : `${this.props.company.activeCompany.company_name || ''} USER LIST`}
                <button className='user-list-toggle-button'
                        onClick={() => this.adminToggle()}>ADMIN LIST</button>
                </div>
                <div className='user-container'>
                    <div className='user-display'>
                        <ul className='user-display-titles'>
                            <li>User Name</li>
                            <li>Email Address</li>
                            <li>Company</li>
                            <li>Password Reset</li>
                            <li>Send Login Info</li>
                        </ul>
                        {this.state.adminView ? null : users}
                    </div>
                    <div className='user-add-container'>
                        <input  className='user-input' 
                                name='user-searchbar'
                                value={this.state.userSearchInput}
                                placeholder='search for a user'
                                onChange={e => this.watchUserInput(e.target.value)} />
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
                            <input  className='user-input row3-password'
                                    name='user-password'
                                    value={this.state.user_password}
                                    placeholder='temporary password'
                                    onChange={e => this.watchPassword(e.target.value)}/>
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
                        </div>
                        <button className='add-user-button'
                                onClick={() => this.addUser()}>Add User</button>
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

export default connect(mapState, {addUser, getUser, getAllUsers, getAllCompany, getCompany})(Admin);
