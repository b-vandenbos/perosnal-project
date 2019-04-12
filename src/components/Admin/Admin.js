import React, {Component} from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Company from './subcomponents/Company';
import User from './subcomponents/User';
import './admin.css';
import {connect} from 'react-redux';
import {getAllCompany} from './../../ducks/companyReducer';
import {getUser, getAllUsers} from './../../ducks/userReducer';

class Admin extends Component {
    constructor() {
        super();

        this.state = {
            activeCompany: ''
        };
    }

    componentDidMount() {
        this.props.getAllCompany();
        // this.props.getUser();
        // this.props.getAllUsers();
    }
  
    render() {
        let {allCompany} = this.props.company;
        // let {allUsers} = this.props.user;
        let companies = allCompany.map((company, index) => {
            return <Company key={index} company={company} />
        })
        // let users = allUsers.map((user, index) => {
        //     return <User key={index} user={user} />
        // })
        return (
            <div className='admin'>
                <Header />
                <div className='admin-container'>
                    <div className='company-container'>
                        {companies}
                    </div>
                    <div className='user-container'>
                        {/* {users} */}
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

const mapState = (reduxState) => {
    return {
        company: reduxState.company,
        user: reduxState.user

    }
}

export default connect(mapState, {getAllCompany, getAllUsers, getUser})(Admin);
