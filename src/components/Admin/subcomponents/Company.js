import React, {Component} from 'react';
import './company.css';
import logo from './mask-star.svg';
import {connect} from 'react-redux';
import {updateCompany, getAllCompany} from './../../../ducks/companyReducer';
import {getAllUsers, getAllAdmins, getUser, deleteCompany} from './../../../ducks/userReducer';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';

library.add(faUndo);
library.add(faEdit);
library.add(faMinusCircle);

class Company extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            company_name: this.props.comp.company_name,
            company_logo: this.props.comp.company_logo
        };

        this.updateCompany = this.updateCompany.bind(this);
        // this.deleteCompany = this.deleteCompany.bind(this);
    };

   async updateCompany(event) {
        if (event.key === 'Enter') {
            let {id} = this.props.comp;
            let {company_name, company_logo} = this.state;
            let updatedComp = {id, company_name, company_logo};
            await this.props.updateCompany(updatedComp);
            await this.props.getAllUsers();
            await this.props.getAllAdmins();
            this.props.setActive(this.props.comp);
            this.setState({edit: !this.state.edit});
        }
    };

    // async deleteCompany(id) {
    //     await this.props.deleteCompany(id);
    //     // await this.props.getUser();
    //     // await this.props.getAllUsers();
    //     // await this.props.getAllAdmins();
    //     await this.props.getAllCompany();
    // }
  
    render() {
        let {comp, setActive} = this.props;
        return (
            !this.state.edit ? (
            <div className='company' onClick={() => setActive(comp)}>
                <img className='company-image' src={comp.company_logo || logo} alt={comp.company_name}/>
                <div className='company-label-frame'>
                    <div    className='company-label'
                            onClick={() => this.setState({edit: !this.state.edit})}>{comp.company_name}</div>
                    <button className='delete-company-button'><FontAwesomeIcon icon='minus-circle' /></button>
            </div>
                </div>
            ) : (
                <div className='company-edit'>
                    <div className='company-edit-row1'>
                        <input  className='company-edit-input row1'
                                value={this.state.company_logo}
                                onChange={e => this.setState({company_logo: e.target.value})}
                                onKeyPress={this.updateCompany}/>
                        <button className='company-edit-undo'
                                onClick={() => this.setState({edit: !this.state.edit, company_name: this.props.comp.company_name, company_logo: this.props.comp.company_logo})}>
                                <FontAwesomeIcon icon='undo' />
                        </button>
                    </div>
                    <img    className='company-edit-image'
                            src={this.state.company_logo || logo}
                            alt='logo' />
                    <input  className='company-edit-input'
                            value={this.state.company_name}
                            onChange={e => this.setState({company_name: e.target.value})}
                            onKeyPress={this.updateCompany}/>
                
                
                </div>
            )
        )
    }
}

const mapState = (reduxState) => {
    return {
        company: reduxState.company,
        user: reduxState.user
    };
};

export default connect(mapState, {updateCompany, getAllCompany, deleteCompany, getUser, getAllUsers, getAllAdmins})(Company);

