import React, {Component} from 'react';
import io from 'socket.io-client';
import Company from './Company';
import '../admin.css';
import {connect} from 'react-redux';
import {getAllCompany, addNewCompany, setActiveCompany} from './../../../ducks/companyReducer';
import {updateAdminUser, getAllUsers, getAllAdmins, deleteCompanyInfo} from './../../../ducks/userReducer';
import {getSurvey, getDimensions, getSuggested} from './../../../ducks/surveyReducer';
import {getDiscussion} from './../../../ducks/discussionReducer';


class CompanyView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            company_name: '',
            searchInput: '',
            allCompany: this.props.company.allCompany
        };

        this.socket = io('localhost:4000');
        this.socket.on('RECEIVE_COMPANY', function(data) {
            getAllCompany(data);
        });
        this.socket.on('RECEIVE_COMPANY_USERS_ADMINS', function(data) {
            getAllCompany(data.allCompany.action.payload);
        });
        this.socket.on('RECEIVE_COMPANY_IMAGE', function(data) {
            getAllCompany(data.allCompany);
        })
        this.socket.on('RECEIVE_DELETED_COMPANY_INFO', function(data) {
            getAllCompany(data.allCompany);
        });

        const getAllCompany = data => {
            this.setState({allCompany: data});
        }

        this.addCompany = this.addCompany.bind(this);
        this.selectActiveCompany = this.selectActiveCompany.bind(this);
        this.deleteCompany = this.deleteCompany.bind(this);
    }

    componentDidMount() {
        this.props.getAllCompany();
    }

    watchName(val) {
        this.setState({company_name: val});
    }

    watchInput(val) {
        this.setState({searchInput: val});
    }


    async addCompany() {
        let {company_name, company_logo} = this.state;
        let allCompany = await this.props.addNewCompany({company_name, company_logo});
        await this.socket.emit('SEND_COMPANY', allCompany.value);
        
        this.setState({company_name: '', company_logo: ''});
    }

    async selectActiveCompany(company) {
        let user_id = this.props.user.user.id;
        let userInfo = {id: user_id, company_id: company.id}
        await this.props.updateAdminUser(userInfo);
        this.props.getSurvey();
        this.props.getDimensions();
        this.props.getDiscussion();
        this.props.getSuggested();
        this.props.getAllAdmins();
    }

    async deleteCompany(id) {
        let userData = await this.props.deleteCompanyInfo(id);
        let compData = await this.props.getAllCompany();
        let allAdmins = userData.value.allAdmins;
        let allUsers = userData.value.allUsers;
        let allCompany = compData.value;
        let allData = {allAdmins, allUsers, allCompany};
        await this.socket.emit('DELETE_COMPANY', allData);
    }

    render() {
        let {company_name, company_logo, allCompany} = this.state;
        let companies = allCompany.map((company) => {
            if (company.company_name.toLowerCase().includes(this.state.searchInput)) {
                return <Company key={company.id} comp={company} setActive={this.selectActiveCompany} deleteCompany={this.deleteCompany}/>
            }
        })
        
        return (
            <div>
            <div className='company-container'>
                <div className='company-display'>
                    {companies}
                </div>
                <div className='company-add-container'>
                    <div className='company-add-container-frame'>
                        <input  className='company-input' 
                                name='company-searchbar'
                                value={this.state.searchInput}
                                placeholder='search for a company'
                                onChange={e => this.watchInput(e.target.value)} />
                    </div>
                    <div className='company-add-container-frame'>
                        <input  className='company-input'
                                name='company-name'
                                value={this.state.company_name}
                                placeholder='company name'
                                onChange={e => this.watchName(e.target.value)}/>
                        <button className='add-company-button'
                            onClick={() => this.addCompany({company_name, company_logo})}>Add Company</button>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

const mapState = (reduxState) => {
    return {
        company: reduxState.company,
        user: reduxState.user
    };
};

export default connect(mapState, {deleteCompanyInfo, getAllUsers, getAllAdmins, getDiscussion, getSurvey, getDimensions, getSuggested, updateAdminUser, getAllCompany, addNewCompany, setActiveCompany})(CompanyView);
