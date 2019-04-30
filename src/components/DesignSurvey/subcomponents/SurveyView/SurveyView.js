import React, {Component} from 'react';
import io from 'socket.io-client';
import '../../designsurvey.css';
import Dimension from './Dimension';
import {connect} from 'react-redux';
import {getDimensions, addDimension} from './../../../../ducks/surveyReducer';


class SurveyView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addDimension: false,
            newDimension: '',
            dimensions: this.props.survey.dimensions
        };
        
        this.socket = io('/');
        this.socket.on('RECEIVE_DIMENSIONS', function(data) {
            updateDimensions(data.dimensions);
        });
        this.socket.on('RECEIVE_DIM_SURVEY_SUGGESTED', function(data) {
            updateDimensions(data.dimensions);
        });

        const updateDimensions = data => {
            this.setState({dimensions: data});
        }


        this.addToggle = this.addToggle.bind(this);
        this.addDimension = this.addDimension.bind(this);
    };
  
    componentDidMount() {
        this.props.getDimensions();
    };

    watchDimension(val) {
        this.setState({newDimension: val})
    }

    addToggle() {
        this.setState({addDimension: !this.state.addDimension});
    };

    async addDimension(event) {
        if (event.key === 'Enter') {
            let {newDimension} = this.state;
            let {company_id} = this.props.user.user;
            let newDim = {company_id, newDimension};
            let dimensions = await this.props.addDimension(newDim);
            await this.socket.emit('SEND_DIMENSIONS', dimensions.value);
            this.setState({addDimension: false, newDimension: ''});
        };
    };
    
    render() {
        const {dimensions} = this.state;
        let dimensionsList = dimensions.map(dimension => {
                return <Dimension key={`dim${dimension.id}`} dimension={dimension}/>
        })
        
        return (
            <div className='survey-frame'>
                <div className='survey-frame-titlebar'>
                    {
                    this.state.addDimension ?
                    <div>
                        <input  className='add-dimension-input'
                                placeholder='FRAME OF REFERENCE'
                                value={this.state.newDimension}
                                onChange={e => this.watchDimension(e.target.value)}
                                onKeyPress={this.addDimension}/>
                        <button className='cancel-add-dimension'
                                onClick={() => this.addToggle()}>X</button>
                    </div>
                    : 
                         <button className='add-dimension-button'
                                onClick={() => this.addToggle()}
                                >Add Frame of Reference</button>
                    }
                </div>
                <div className='survey-body'>
                    {dimensionsList}
                </div>
            </div>
        )

    }
}       
    

const mapState = (reduxState) => {
    return {
        survey: reduxState.survey,
        user: reduxState.user,
        company: reduxState.company
    }
}

export default connect(mapState, {getDimensions, addDimension})(SurveyView);