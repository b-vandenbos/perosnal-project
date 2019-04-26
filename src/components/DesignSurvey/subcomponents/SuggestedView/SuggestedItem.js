import React, {Component} from 'react';
import io from 'socket.io-client';
import './suggesteditem.css';
import {connect} from 'react-redux';
import {deleteSuggestedItem, transferSurveyItem} from './../../../../ducks/surveyReducer';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';

library.add(faCheck);
library.add(faMinusCircle);


class SuggestedItem extends Component {
    constructor() {
        super();

        this.socket = io('localhost:4000');

        this.deleteSuggestedItem = this.deleteSuggestedItem.bind(this);
        this.transferSuggestedItem = this.transferSuggestedItem.bind(this);
    }

    async deleteSuggestedItem(item) {
        let suggestedItems = await this.props.deleteSuggestedItem(item);
        await this.socket.emit('SEND_SUGGESTED', suggestedItems.value);
    }

    async transferSuggestedItem(item) {
        let suggestedItems = await this.props.transferSurveyItem(item);
        await this.socket.emit('SEND_SUGGESTED_AND_SURVEY', suggestedItems.value);
    }

render() {
    const {item} = this.props;
    return (
        <div>
            <div className='suggested-item'>
            <div className='suggested-item-category'>{item.q_dimension}</div>
                <div className='suggested-item-text'>{item.q_text}</div>
                {item.q_category ? <div className='suggested-item-category'>{item.q_category}</div> : null}
                <button className='suggested-item-delete'
                        onClick={() => this.transferSuggestedItem(item)}><FontAwesomeIcon icon="check" /></button>
                <button className='suggested-item-delete'
                        onClick={() => this.deleteSuggestedItem(item)}><FontAwesomeIcon icon='minus-circle' /></button>
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