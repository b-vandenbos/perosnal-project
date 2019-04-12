import React, {Component} from 'react';
import '../admin.css';


export default class Company extends Component {
  
    render() {
        let {company} = this.props;
        return (
            <div className='company'>
                <p>{company.company_name}</p>
            </div>
        )
    }
}