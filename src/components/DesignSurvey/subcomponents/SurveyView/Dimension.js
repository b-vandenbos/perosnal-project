import React, {Component} from 'react';
import SurveyItem from './SurveyItem';
import {connect} from 'react-redux';
import {getSurvey, updateDimension, deleteDimension} from './../../../..//ducks/surveyReducer';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { faUndo } from '@fortawesome/free-solid-svg-icons';

library.add(faMinusCircle);
library.add(faUndo);

class Dimension extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            updatedDimension: this.props.dimension.q_dimension
        };

        this.updateDimension = this.updateDimension.bind(this);
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
            await this.props.updateDimension(updateInfo);
            this.setState({edit: !this.state.edit});
        }
    }

    render() {
        const {dimension, survey} = this.props;
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
                                                onKeyPress={this.updateDimension}
                                                />
                                    </div>
                    : 
                                    <div className='design-survey-section-title dimension' onClick={() => this.setState({edit: !this.state.edit})}>{dimension.q_dimension}</div>
                } 
                <button className='delete-dimension-button' onClick={() => this.props.deleteDimension(dimension)}><FontAwesomeIcon icon='minus-circle' /></button>                   
            </div>
                {
                    survey.survey.map(item => {
                        if (item.q_dimension_id === dimension.id) {
                            return <SurveyItem key={item.id} item={item} dimensionId={dimension.id}/>
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

export default connect(mapState, {getSurvey, updateDimension, deleteDimension})(Dimension);