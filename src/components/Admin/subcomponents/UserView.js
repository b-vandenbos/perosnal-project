import React, {Component} from 'react';
import User from './User';
import '../admin.css';
import {connect} from 'react-redux';
import {addUser, getAllUsers, getAllAdmins} from './../../../ducks/userReducer';
import {getAllCompany} from './../../../ducks/companyReducer';

class Admin extends Component {
    constructor() {
        super();

        this.state = {
            userSearchInput: '',
            companySearchInput: '',
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
        let {allUsers, allAdmins} = this.props.user;
        let {allCompany} = this.props.company;
        let users = allUsers.map(user => {
            if (user.user_name.toLowerCase().includes(this.state.userSearchInput) && user.company_name.toLowerCase().includes(this.state.companySearchInput)) {
                return <User key={user.id} user={user}/>
            }
        })
        let admins = allAdmins.map(user => {
            if (user.user_name.toLowerCase().includes(this.state.userSearchInput) && user.company_name.toLowerCase().includes(this.state.companySearchInput)) {
                return <User key={user.id} user={user}/>
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
                            <li>Password Reset</li>
                            <li>Send Login Info</li>
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
