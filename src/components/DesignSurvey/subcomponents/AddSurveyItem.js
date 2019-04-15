import React, {Component} from 'react';
import './addsurveyitem.css';
import {connect} from 'react-redux';
import {getDimensions, addSurveyItem} from './../../../ducks/surveyReducer';

class AddSurveyItem extends Component {
    constructor() {
        super();
        
        this.state = {
            q_id: '',
            q_dimension_id: '',
            q_category: '',
            q_text: ''
        }

        this.addSurveyItem = this.addSurveyItem.bind(this);
    }

    addSurveyItem() {
        let {q_id, q_dimension_id, q_category, q_text} = this.state;
        let newItem = {q_id, q_dimension_id, q_category, q_text};
        this.props.addSurveyItem(newItem);
        this.setState({q_id: '', q_dimension_id: '', q_category: '', q_text: ''});
    }

    watchId(val) {
        this.setState({q_id: val});
    }

    watchDimension(val) {
        this.setState({q_dimension_id: val});
    }

    watchCategory(val) {
        this.setState({q_category: val});
    }

    watchText(val) {
        this.setState({q_text: val});
    }
    
    render() {
        let dimensionOptions = this.props.survey.dimensions.map((dimension, index) => {
            return <option key={index} value={dimension.id}>{dimension.q_dimension}</option>
        })
        return (
            <div className='add-item-frame'>
                <div className='add-item'>
                    <button className='cancel-add-item'>X</button>
                    <input  className='add-item-input'
                            value={this.state.q_id}
                            placeholder='qid'
                            onChange={e => this.watchId(e.target.value)}/>
                    <select className='add-item-select'
                            value={this.state.q_dimension_id}
                            onChange={e => this.watchDimension(e.target.value)}>
                        <option value=''>Select Dimension</option>
                        {dimensionOptions}
                    </select>
                    <input  className='add-item-input'
                            value={this.state.q_category}
                            placeholder='category'
                            onChange={e => this.watchCategory(e.target.value)}/>
                    <input  className='add-item-input'
                            value={this.state.q_text}
                            placeholder='text'
                            onChange={e => this.watchText(e.target.value)}/>
                    <button className='add-item-button' onClick={() => this.addSurveyItem()}>Add Survey Item</button>
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

export default connect(mapState, {getDimensions, addSurveyItem})(AddSurveyItem);