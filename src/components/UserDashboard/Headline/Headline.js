import React, {Component} from 'react';
import './headline.css';
import {connect} from 'react-redux';
import {getHeadlines} from './../../../ducks/headlineReducer';

class Headline extends Component {

    
    render() {
    
        return (
            <div className='headline'>
            
            </div>
        )
    }
}

const mapState = (reduxState) => {
    return {
        headlines: reduxState.headlines
    }
}

export default connect(mapState, {getHeadlines})(Headline);