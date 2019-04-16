import React, {Component} from 'react';
import './suggesteditem.css';
import {connect} from 'react-redux';
import {getSuggested, deleteSuggestedItem} from './../../../../ducks/surveyReducer';

class SuggestedItem extends Component {
    constructor() {
        super();

        this.deleteSuggestedItem = this.deleteSuggestedItem.bind(this);
    }

async deleteSuggestedItem(id) {
    this.props.deleteSuggestedItem(id);
    this.props.getSuggested();
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
                        onClick={() => this.deleteSuggestedItem(item.id)}>X</button>
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

export default connect(mapState, {getSuggested, deleteSuggestedItem})(SuggestedItem);