import React, {Component} from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Company from './subcomponents/Company';
import User from './subcomponents/User';
import './admin.css';
import {connect} from 'react-redux';
import {getAllCompany, addNewCompany} from './../../ducks/companyReducer';
import {addUser, getUser, getAllUsers} from './../../ducks/userReducer';

class Admin extends Component {
    constructor() {
        super();

        this.state = {
            company_name: '',
            company_logo: '',
            searchInput: '',
            userSearchInput: '',
            user_name: '',
            user_email: '',
            user_password: '',
            user_company: '',
            checked: false
        };

        this.addCompany = this.addCompany.bind(this);
    }

    componentDidMount() {
        this.props.getUser();
        this.props.getAllUsers();
        this.props.getAllCompany();
    }

    watchName(val) {
        this.setState({company_name: val});
    }

    watchLogo(val) {
        this.setState({company_logo: val});
    }

    watchInput(val) {
        this.setState({searchInput: val});
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

    async addCompany() {
        let {company_name, company_logo} = this.state;
        let newCompany = {company_name, company_logo};
        await this.props.addNewCompany(newCompany);
        this.props.getAllCompany();
        this.setState({company_name: '', company_logo: ''});
    }

    async addUser() {
        let {user_name, user_email, user_password, user_company, checked} = this.state;
        let isadmin = checked;
        let newUser = {company_id: user_company, user_name, user_email, password: user_password, isadmin};
        await this.props.addUser(newUser);
        this.props.getAllUsers();
        this.setState({user_name: '', user_email: '', user_password: '', user_company: '', checked: false});
    }
  
    render() {
        let {allCompany} = this.props.company;
        let {allUsers} = this.props.user;
        let companies = allCompany.map((company, index) => {
            if (company.company_name.toLowerCase().includes(this.state.searchInput)) {
                return <Company key={index} company={company} />
            }
        })
        let users = allUsers.map((user ,index) => {
            if (user.user_name.toLowerCase().includes(this.state.userSearchInput)) {
                return <User key={index} user={user} />
            }
        })
        return (
            <div className='admin'>
                <Header />
                <div className='admin-container'>
                    <div className='company-container'>
                        <div className='company-display'>
                            {companies}
                        </div>
                         <div className='company-add-container'>
                            <input  className='company-input' 
                                name='company-searchbar'
                                value={this.state.searchInput}
                                placeholder='search for a company'
                                onChange={e => this.watchInput(e.target.value)} />
                            <p>OR</p>
                            <input  className='company-input'
                                name='company-name'
                                value={this.state.company_name}
                                placeholder='company name'
                                onChange={e => this.watchName(e.target.value)}/>
                            <input  className='company-input'
                                name='company-logo'
                                value={this.state.company_logo}
                                placeholder='company logo'
                                onChange={e => this.watchLogo(e.target.value)}/>
                            <button className='add-company-button'
                                    onClick={() => this.addCompany()}>Add Company</button>
                        </div>
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
                            {users}
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
                                <input  className='user-input row3-companyid'
                                        name='user-company'
                                        value={this.state.user_company}
                                        placeholder='company id'
                                        onChange={e => this.watchCompanyId(e.target.value)}/>
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
                <Footer />
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

export default connect(mapState, {addUser, getUser, getAllUsers, getAllCompany, addNewCompany})(Admin);
