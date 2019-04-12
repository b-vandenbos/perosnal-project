import React, {Component} from 'react';
import './footer.css';
import dw_accent_logo from './dw_accent_logo.svg';


export default class Footer extends Component {
  
    render() {
        return (
            <div className='footer'>
                <img className='footer-logo' src={dw_accent_logo} alt='' />
            </div>
        )
    }
}