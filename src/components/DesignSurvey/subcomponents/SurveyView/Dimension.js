import React, {Component} from 'react';
import io from 'socket.io-client';
import SurveyItem from './SurveyItem';
import {connect} from 'react-redux';
import {getSurvey, updateDimension, deleteDimension, reorderDimensions} from './../../../..//ducks/surveyReducer';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { faUndo } from '@fortawesome/free-solid-svg-icons';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

library.add(faMinusCircle);
library.add(faUndo);
library.add(faChevronUp);
library.add(faChevronDown);

class Dimension extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            updatedDimension: this.props.dimension.q_dimension,
            dimensions: this.props.survey.dimensions,
            survey: this.props.survey.survey
        };

        this.socket = io('/', {transports: ['websocket']});
        this.socket.on('RECEIVE_SURVEY', function(data) {
            receiveSurvey(data);
        });
        this.socket.on('RECEIVE_SUGGESTED_AND_SURVEY', function(data) {
            receiveSurvey(data.survey);
        });
        this.socket.on('RECEIVE_DIM_SURVEY_SUGGESTED', function(data) {
            receiveSurvey(data.survey);
            receiveDimensions(data.dimensions);
        })

        const receiveSurvey = data => {
            this.setState({survey: data});
        }
        const receiveDimensions = data => {
            this.setState({dimensions: data});
        }

        this.updateDimension = this.updateDimension.bind(this);
        this.changeDimensionOrder = this.changeDimensionOrder.bind(this);
        this.deleteDimension = this.deleteDimension.bind(this);
    };

    componentDidMount() {
        this.props.getSurvey();
    };

    watchDimension(val) {
        this.setState({updatedDimension: val})
    };

    async updateDimension(event) {
        if (event.key === 'Enter') {
            let {id, company_id} = this.props.dimension;
            let {updatedDimension} = this.state;
            const updateInfo = {id, company_id, updatedDimension}
            let dimensions = await this.props.updateDimension(updateInfo);
            await this.socket.emit('SEND_DIMENSIONS', dimensions.value);
            this.setState({edit: !this.state.edit});
        }
    };

    async changeDimensionOrder(dimension, change) {
        let newDim = {...dimension, change};
        let allUpdated = await this.props.reorderDimensions(newDim);
        await this.socket.emit('SEND_DIM_SURVEY_SUGGESTED', allUpdated.value);
    };

    async deleteDimension(dimension) {
        let allUpdated = await this.props.deleteDimension(dimension);
        await this.socket.emit('SEND_DIM_SURVEY_SUGGESTED', allUpdated.value);
    };

    render() {
        const {dimension} = this.props;
        const {dimensions, survey} = this.state;
        return (
            <div className='dimension'>
            <div className='dimension-title-bar'>
                {this.state.edit ? 
                    <div className='dimension-edit'>
                        <button className='dimension-button'
                                onClick={() => this.setState({edit: !this.state.edit})}><FontAwesomeIcon icon='undo' /></button>
                        <input className='dimension-title'
                                value={this.state.updatedDimension}
                                onChange={e => this.watchDimension(e.target.value)}
                                onKeyPress={this.updateDimension}/>
                    </div>
                    : 
                    <div className='design-survey-section-title dimension' onClick={() => this.setState({edit: !this.state.edit})}>{dimension.q_dimension}</div>
                } 
                {(dimension.index !==1 && !this.state.edit) ? <button id='change-order' className='delete-dimension-button' onClick={() => this.changeDimensionOrder(dimension, -1)}><FontAwesomeIcon icon='chevron-up' /></button> : null}
                {(dimension.index !==dimensions.length && !this.state.edit) ? <button id='change-order' className='delete-dimension-button' onClick={() => this.changeDimensionOrder(dimension, 1)}><FontAwesomeIcon icon='chevron-down' /></button> : null}
                {!this.state.edit ? <button id='delete' className='delete-dimension-button' onClick={() => this.deleteDimension(dimension)}><FontAwesomeIcon icon='minus-circle' /></button> : null}                   
            </div>
                {
                    survey.map(item => {
                        if (item.q_dimension_id === dimension.id) {
                            return <SurveyItem key={`item${item.id}`} item={item} />
                        }
                    })
                }
                
            </div>
        )
    }
}

const mapState = (reduxState) => {
    return {
        survey: reduxState.survey,
        user: reduxState.user
    }
}

export default connect(mapState, {getSurvey, updateDimension, deleteDimension, reorderDimensions})(Dimension);