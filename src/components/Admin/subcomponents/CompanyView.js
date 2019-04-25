import React, {Component} from 'react';
import Company from './Company';
import '../admin.css';
import {connect} from 'react-redux';
import {getAllCompany, addNewCompany, setActiveCompany} from './../../../ducks/companyReducer';
import {updateAdminUser, getAllUsers, getAllAdmins, deleteCompanyInfo} from './../../../ducks/userReducer';
import {getSurvey, getDimensions, getSuggested} from './../../../ducks/surveyReducer';
import {getDiscussion} from './../../../ducks/discussionReducer';


class CompanyView extends Component {
    constructor() {
        super();

        this.state = {
            company_name: '',
            searchInput: ''
        };

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
        await this.props.addNewCompany({company_name, company_logo});
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
        await this.props.deleteCompanyInfo(id);
        await this.props.getAllCompany();
    }

    render() {
        let {company_name, company_logo} = this.state;
        let {allCompany} = this.props.company;
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
