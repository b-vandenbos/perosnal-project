import React, {Component} from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CompanyView from './subcomponents/CompanyView';
import UserView from './subcomponents/UserView';
import './admin.css';

export default class Admin extends Component {

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