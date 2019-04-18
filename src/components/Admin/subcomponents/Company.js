import React, {Component} from 'react';
import './company.css';
import logo from './mask-star.svg';


export default class Company extends Component {
  
    render() {
        let {company, setActive} = this.props;
        return (
            <div className='company' onClick={() => setActive(company)}>
                <img className='company-image' src={company.company_logo || logo} alt={company.company_name}/>
                <div className='company-label'>{company.company_name}</div>
            </div>
        )
    }
}

