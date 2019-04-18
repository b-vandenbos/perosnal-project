import React, {Component} from 'react';
import './suggesteditem.css';
import {connect} from 'react-redux';
import {deleteSuggestedItem, transferSurveyItem} from './../../../../ducks/surveyReducer';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

library.add(faCheck);


class SuggestedItem extends Component {

render() {
    const {item} = this.props;
    return (
        <div>
            <div className='suggested-item'>
            <div className='suggested-item-category'>{item.q_dimension}</div>
                <div className='suggested-item-text'>{item.q_text}</div>
                {item.q_category ? <div className='suggested-item-category'>{item.q_category}</div> : null}
                <button className='suggested-item-delete'
                        onClick={() => this.props.transferSurveyItem(item)}><FontAwesomeIcon icon="check" /></button>
                <button className='suggested-item-delete'
                        onClick={() => this.props.deleteSuggestedItem(item)}>X</button>
            </div>
        </div>
    )
}

}

const mapState = (reduxState) => {
    return {
        survey: reduxState.survey
    }
}

export default connect(mapState, {deleteSuggestedItem, transferSurveyItem})(SuggestedItem);