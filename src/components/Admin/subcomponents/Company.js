import React, {Component} from 'react';
import './company.css';
import {v4 as randomString} from 'uuid';
import Dropzone from 'react-dropzone';
import logo from './mask-star.svg';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateCompany, getAllCompany} from './../../../ducks/companyReducer';
import {getAllUsers, getAllAdmins, getUser} from './../../../ducks/userReducer';

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

    getSignedRequest = ([file]) => {
        this.setState({isUploading: true});
        const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`;

        axios.get('/sign-s3', {
            params: {
                'file-name': fileName,
                'file-type': file.type
            }
        })
            .then(response => {
                const {signedRequest, url} = response.data;
                this.uploadFile(file, signedRequest, url);
            })
            .catch(err => console.log(err));
    }

    uploadFile = (file, signedRequest, url) => {
        const options = {
            headers: {
                'Content-Type': file.type
            }
        };

        axios.put(signedRequest, file, options)
            .then(response => {
                this.setState({company_logo: url})
                let {id} = this.props.comp;
                let {company_name, company_logo} = this.state;
                let updatedComp = {id, company_name, company_logo};
                this.props.updateCompany(updatedComp);
                this.props.getAllUsers();
                this.props.getAllAdmins();
                this.props.setActive(this.props.comp);
                this.setState({edit: !this.state.edit});
            })
            .catch(err => {
                this.setState({isUploading: false});
                console.log(err);
            })
    }
  
    render() {
        let {comp, setActive} = this.props;
        return (
            !this.state.edit ? (
            <div className='company' onClick={() => setActive(comp)}>
                <img className='company-image' src={comp.company_logo || logo} alt={comp.company_name}/>
                <div className='company-label-frame'>
                    <div    className='company-label'
                            onClick={() => this.setState({edit: !this.state.edit})}>{comp.company_name}</div>
                    {comp.company_name !== 'DecisionWise' ? <button className='delete-company-button'><FontAwesomeIcon icon='minus-circle' /></button> : null }
            </div>
                </div>
            ) : (
                <div className='company-edit'>
                    <div className='company-edit-row1'>
                        <button className='company-edit-undo'
                                onClick={() => this.setState({edit: !this.state.edit, company_name: this.props.comp.company_name, company_logo: this.props.comp.company_logo})}>
                                <FontAwesomeIcon icon='undo' />
                        </button>
                    </div>

                    <Dropzone   
                                onDropAccepted={this.getSignedRequest}
                                accept='image/*'
                                multiple={false}>
                        {({ getRootProps, getInputProps, isDragActive }) => {
                            return (
                                <div className='compImg' {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    {isDragActive ? (
                                        <img className='company-edit-image' src={logo} alt='logo'/>
                                    ) : (
                                        <img className='company-edit-image' src={comp.company_logo || logo} alt='logo'/>
                                    )}
                                </div>
                            );
                        }}
                    </Dropzone>
                    
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

export default connect(mapState, {updateCompany, getAllCompany, getUser, getAllUsers, getAllAdmins})(Company);

