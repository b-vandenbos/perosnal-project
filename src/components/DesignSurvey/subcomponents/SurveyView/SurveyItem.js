import React, {Component} from 'react';
import io from 'socket.io-client';
import './surveyitem.css';
import {connect} from 'react-redux';
import {updateSurveyItem, deleteSurveyItem, reorderItems} from './../../../../ducks/surveyReducer';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

library.add(faCheck);
library.add(faMinusCircle);
library.add(faChevronUp);
library.add(faChevronDown);

class SurveyItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            q_text: this.props.item.q_text,
            q_category: this.props.item.q_category,
            q_dimension_id: this.props.item.q_dimension_id,
            q_id: this.props.item.q_id,
            dimensions: this.props.survey.dimensions
        };

        this.socket = io('/', {transports: ['websocket']});
        this.socket.on('RECEIVE_DIMENSIONS', function(data) {
            updateDimensions(data);
        });
        this.socket.on('RECEIVE_UPDATED_DIMENSIONS', function(data) {
            updateDimensions(data.dimensions);
        })
        this.socket.on('RECEIVE_DIM_SURVEY_SUGGESTED', function(data) {
            updateDimensions(data.dimensions);
        });
    
        const updateDimensions = data => {
            this.setState({dimensions: data});
            };

        this.editMode = this.editMode.bind(this);
        this.submitEdit = this.submitEdit.bind(this);
        this.changeOrder = this.changeOrder.bind(this);
        this.deleteSurveyItem = this.deleteSurveyItem.bind(this);
    }

    editMode() {
        this.setState({edit: !this.state.edit})
    }

    watchId(val) {
        this.setState({q_id: val});
    }

    watchText(val) {
        this.setState({q_text: val});
    }

    watchCategory(val) {
        this.setState({q_category: val});
    }

    watchDimension(val) {
        this.setState({q_dimension_id: val})
    }

    async submitEdit(item) {
        let {q_id, q_dimension_id, q_text, q_category} = this.state;
        let {id, company_id} = item;
        let updatedSurveyItem = {id, q_id, q_dimension_id, q_text, q_category, company_id}
        let survey = await this.props.updateSurveyItem(updatedSurveyItem);
        await this.socket.emit('SEND_SURVEY', survey.value);
        this.setState({edit: false});
    }

    async changeOrder(item, change) {
        let surveyItem = {...item, change};
        let survey = await this.props.reorderItems(surveyItem);
        await this.socket.emit('SEND_SURVEY', survey.value);
    }

    async deleteSurveyItem(item) {
        let surveyItems = await this.props.deleteSurveyItem(item);
        await this.socket.emit('SEND_SURVEY', surveyItems.value);
    }
    

    render() {
        let dimensions = this.state.dimensions.map((dimension, index) => {
            return <option  key={index} value={dimension.id}>{dimension.q_dimension}</option>
        })
        const {item} = this.props;
        
        return this.state.edit ? (
            <div className='survey-item'>
                <input className='survey-item-id edit'
                        value={this.state.q_id}
                        onChange={e => this.watchId(e.target.value)}/>
                <input className='survey-item-text edit'
                        value={this.state.q_text}
                        onChange={e => this.watchText(e.target.value)}/>
                <select className='survey-item-dimension edit'
                        name='survey-item-dimension-edit'
                        value={this.state.q_dimension_id}
                        onChange={e => this.watchDimension(e.target.value)}>
                    <option value='' selected disabled hidden>Select Dimension</option>
                    {dimensions}
                </select>
                <input  className='survey-item-category edit'
                        placeholder='category'
                        value={this.state.q_category}
                        onChange={e => this.watchCategory(e.target.value)}/>
                <button className='survey-item-edit' onClick={() => this.submitEdit(item)}><FontAwesomeIcon icon='check' /></button>
            </div>
            ) : (
            <div className='survey-item'>
                <div className='survey-item-left'>
                    <div className='change-order'>
                        {(item.index !== 1) ? <button className='change-order-button' onClick={() => this.changeOrder(item, -1)}><FontAwesomeIcon icon='chevron-up' /></button> : null}
                        {(item.index !== this.props.survey.survey.length) ? <button className='change-order-button' onClick={() => this.changeOrder(item, 1)}><FontAwesomeIcon icon='chevron-down' /></button> : null}
                    </div>
                    <div className='survey-item-text' onClick={this.editMode}>{item.q_text}</div>
                    {item.q_category ? <div className='survey-item-category'>{item.q_category}</div> : null}
                </div>
                <button className='survey-item-delete'
                        onClick={() => this.deleteSurveyItem(item)}><FontAwesomeIcon icon='minus-circle' /></button>
            </div>
        )
    }
}

const mapState = (reduxState) => {
    return {
        survey: reduxState.survey
    }
}

export default connect(mapState, {updateSurveyItem, deleteSurveyItem, reorderItems})(SurveyItem);