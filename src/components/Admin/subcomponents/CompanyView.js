import React, {Component} from 'react';
import Company from './Company';
import '../admin.css';
import {connect} from 'react-redux';
import {getAllCompany, addNewCompany, setActiveCompany} from './../../../ducks/companyReducer';
import {updateAdminUser, getAllUsers, getAllAdmins} from './../../../ducks/userReducer';
import {getSurvey, getDimensions, getSuggested} from './../../../ducks/surveyReducer';
import {getDiscussion} from './../../../ducks/discussionReducer';


class CompanyView extends Component {
    constructor() {
        super();

        this.state = {
            company_name: '',
            company_logo: '',
            searchInput: '',
        };

        this.addCompany = this.addCompany.bind(this);
        this.selectActiveCompany = this.selectActiveCompany.bind(this);
    }

    componentDidMount() {
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

    render() {
        let {company_name, company_logo} = this.state;
        let {allCompany} = this.props.company;
        let companies = allCompany.map((company) => {
            if (company.company_name.toLowerCase().includes(this.state.searchInput)) {
                return <Company key={company.id} comp={company} setActive={this.selectActiveCompany}/>
            }
        })
        
        return (
            <div>
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
                            onClick={() => this.addCompany({company_name, company_logo})}>Add Company</button>
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

export default connect(mapState, {getAllUsers, getAllAdmins, getDiscussion, getSurvey, getDimensions, getSuggested, updateAdminUser, getAllCompany, addNewCompany, setActiveCompany})(CompanyView);
