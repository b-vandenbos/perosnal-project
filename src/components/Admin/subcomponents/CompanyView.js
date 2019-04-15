import React, {Component} from 'react';
import Company from './Company';
import '../admin.css';
import {connect} from 'react-redux';
import {getAllCompany, addNewCompany} from './../../../ducks/companyReducer';

class CompanyView extends Component {
    constructor() {
        super();

        this.state = {
            company_name: '',
            company_logo: '',
            searchInput: '',
        };

        this.addCompany = this.addCompany.bind(this);
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
        let newCompany = {company_name, company_logo};
        await this.props.addNewCompany(newCompany);
        this.props.getAllCompany();
        this.setState({company_name: '', company_logo: ''});
    }

    render() {
        console.log(this.props);
        let {allCompany} = this.props.company;
        let companies = allCompany.map((company, index) => {
            if (company.company_name.toLowerCase().includes(this.state.searchInput)) {
                return <Company key={index} company={company} />
            }
        })
        
        return (
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
        )
    }
}

const mapState = (reduxState) => {
    return {
        company: reduxState.company
    }
}

export default connect(mapState, {getAllCompany, addNewCompany})(CompanyView);
