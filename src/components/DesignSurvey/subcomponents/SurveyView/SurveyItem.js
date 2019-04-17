import React, {Component} from 'react';
import './surveyitem.css';
import {connect} from 'react-redux';
import {updateSurveyItem, deleteSurveyItem} from './../../../../ducks/surveyReducer';

class SurveyItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            q_text: this.props.item.q_text,
            q_category: this.props.item.q_category,
            q_dimension_id: this.props.item.q_dimension_id,
            q_id: this.props.item.q_id
        };

        this.editMode = this.editMode.bind(this);
        this.submitEdit = this.submitEdit.bind(this);
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
        await this.props.updateSurveyItem(updatedSurveyItem);
        this.setState({edit: false});
    }

    render() {
        let dimensions = this.props.survey.dimensions.map((dimension, index) => {
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
                        value={this.state.q_dimension}
                        onChange={e => this.watchDimension(e.target.value)}>
                    <option value='' selected disabled hidden>Select Dimension</option>
                    {dimensions}
                </select>
                <input  className='survey-item-category edit'
                        placeholder='category'
                        value={this.state.q_category}
                        onChange={e => this.watchCategory(e.target.value)}/>
                <button className='survey-item-edit' onClick={() => this.submitEdit(item)}>G</button>
            </div>
            ) : (
            <div className='survey-item'>
                <div className='survey-item-text' onClick={this.editMode}>{item.q_text}</div>
                {item.q_category ? <div className='survey-item-category'>{item.q_category}</div> : null}
                <button className='survey-item-delete'
                        onClick={() => this.props.deleteSurveyItem(item)}>X</button>
            </div>
        )
    }
}

const mapState = (reduxState) => {
    return {
        survey: reduxState.survey
    }
}

export default connect(mapState, {updateSurveyItem, deleteSurveyItem})(SurveyItem);