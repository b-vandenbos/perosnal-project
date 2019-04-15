import React, {Component} from 'react';
import './company.css';
import logo from './mask-star.svg';


export default class Company extends Component {
  
    render() {
        let {company} = this.props;
        return (
            <div className='company'>
                <img className='company-image' src={company.company_logo || logo} alt={company.company_name}/>
                <div className='company-label'>{company.id}: {company.company_name}</div>
            </div>
        )
    }
}