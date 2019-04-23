import React, {Component} from 'react';
import axios from 'axios';
import './userdashboard.css';
import {v4 as randomString} from 'uuid';
import Dropzone from 'react-dropzone';
import icon from './single-neutral-circle.svg';
import upload from './single-neutral-expand.svg';
import {connect} from 'react-redux';
import {addUserImage, getUser} from './../../ducks/userReducer';



class UserImage extends Component {
    constructor() {
        super();

        this.state = {
            isUploading: false,
            user_image: ''
        };
    };

    getSignedRequest = ([file]) => {
        this.setState({isUploading: true});
        const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`;

        axios.get('/sign-s3', {
            params: {
                'file-name': fileName,
                'file-type': file.type
            }
        })
            .then(response => {
                const {signedRequest, url} = response.data;
                this.uploadFile(file, signedRequest, url);
            })
            .catch(err => console.log(err));
    }

    uploadFile = (file, signedRequest, url) => {
        const options = {
            headers: {
                'Content-Type': file.type
            }
        };

        axios.put(signedRequest, file, options)
            .then(response => {
                this.setState({isUploading: false, user_image: url})
                const {id} = this.props.user.user;
                let userImage = {user_image: url, id};
                console.log()
                this.props.addUserImage(userImage);
            })
            .catch(err => {
                this.setState({isUploading: false});
                console.log(err);
            })
    }

    render() {
        const {user_image} = this.props.user.user;
        return (
            <Dropzone   onDropAccepted={this.getSignedRequest}
                        accept='image/*'
                        multiple={false}>
                    {({ getRootProps, getInputProps, isDragActive }) => {
                        return (
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                {isDragActive ? (
                                    <div    className='user-image'
                                            name='user-image'
                                            style={{backgroundImage: `url(${upload})`, backgroundSize: 'auto'}}></div>
                                    ) : (
                                    <div    className='user-image'
                                            name='user-image'
                                            style={{backgroundImage: `url(${user_image || icon})`}}></div>
                                )}
                            </div>
                        );
                    }}
                </Dropzone>
        );
    }
}

const mapState = (reduxState) => {
    return {
        user: reduxState.user
    }
}

export default connect(mapState, {addUserImage, getUser})(UserImage);