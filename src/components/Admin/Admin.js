import React, {Component} from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CompanyView from './subcomponents/CompanyView';
import UserView from './subcomponents/UserView';
import './admin.css';
import {connect} from 'react-redux';

class Admin extends Component {

    componentDidMount() {
    if (!this.props.user.user.loggedIn) {
        this.props.history.push('/');
    } else if (!this.props.user.user.isadmin) {
         this.props.history.push('/dashboard');
     }   
    }

    render() {
        return (
            <div className='admin'>
                <Header />
                <div className='admin-container'>
                    <CompanyView />
                    <UserView />
                </div>
                <Footer />
            </div>
        )
    }
}

const mapState = (reduxState) => {
    return {
        user: reduxState.user
    }
}

export default connect(mapState, {})(Admin);