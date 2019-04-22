import React, {Component} from 'react';
import './headline.css';
import tv from './vintage-tv-1.svg';
import article from './read-glasses-1.svg';

export default class Headline extends Component {

    
    render() {
        
        return (
            <div className='headline'>
            <div className='headline-title-bar'>
                <h1 className='headline-title'>{this.props.headline.name}</h1>
                <div className='headline-descrip'>{this.props.headline.descrip}</div>
                <div className='headline-middle-section'>
                <div className='think-frame'>
                    <div className='headline-section-title'>Think</div>
                    <div className='headline-section-content'>
                        {this.props.headline.think.map((think, index) => {
                            return <div key={index} className='headline-item'>{think.text}</div>
                        })}
                    </div>
                </div>
                    <div className='act-frame'>
                        <div className='headline-section-title'>Act</div>
                        <div className='headline-section-content'>
                            {this.props.headline.act.map((act, index) => {
                                return <div key={index} className='headline-item'>{act.text}</div>
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className='media-section'>
                <div className='media-item-frame'>
                    {this.props.headline.media.map((media, index) => {
                        return (
                            <a href={media.link} key={index} target='_blank' className='media-item'>
                                <img className='media-icon' src={(media.media_type === 'video' ? tv : article)} alt='media type' />
                                <div className='media-title'>{media.text}</div>
                            </a>
                            
                    )})}
                </div>
            </div>
            
            </div>
        )
    }
}
