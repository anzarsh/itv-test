import React, {PureComponent} from 'react';
import './style.css';
import request from '../request';

class VideoFrame extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            imgExists: null
        };
    }
    render() {
        let template;
        if(this.state.imgExists == null) {
            template = 
                <div className="video-frame video-frame_load">
                    <time className="video-frame__time">{this.getMinSec(this.props.timestamp)}</time>
                    <div className="video-frame__info video-frame__info_load">
                        <img src="img/loader.svg"/>
                    </div>
                </div>
        } else if(this.state.imgExists) {
            template = 
                <div className="video-frame">
                    <time className="video-frame__time">{this.getMinSec(this.props.timestamp)}</time>
                    <div className="video-frame__info video-frame__info_img">
                        <img src=
                            {
                                `/asip-api/archive/media/${this.props.videoSourseId}/${this.formatDate(this.props.timestamp)}`
                            }
                            onDragStart={() => false}
                        />
                    </div>
                </div>
        } else {
            template = 
                <div className="video-frame video-frame_empty">
                    <time className="video-frame__time">{this.getMinSec(this.props.timestamp)}</time>
                    <p className="video-frame__info video-frame__info_text">
                        Нет картинки
                    </p>
                </div>
        }
        return template;
    }
    componentDidMount() {
        this.isImgExists((result) => {
            this.setState({
                imgExists: result
            });
        });
    }
    formatDate(timestamp) {
        let date = new Date(timestamp);

        let year = date.getUTCFullYear();
        let month = date.getUTCMonth();
        let day = date.getUTCDate();
        let hour = date.getUTCHours();
        let min = date.getUTCMinutes();

        if(month < 10) month = '0' + month;
        if(day < 10) day = '0' + day;
        if(hour < 10) hour = '0' + hour;
        if(min < 10) min = '0' + min;

        return '' + year + month + day + 'T' + hour + min + '00.000';
    }
    getMinSec(timestamp) {
        let date = new Date(timestamp);

        let hour = date.getHours();
        let min = date.getMinutes();

        if(hour < 10) hour = '0' + hour;
        if(min < 10) min = '0' + min;

        return hour + ':' + min;
    }
    isImgExists(callback) {
        request.head(`/asip-api/archive/media/${this.props.videoSourseId}/${this.formatDate(this.props.timestamp)}`,
            res => {
                if(res.status === 200) {
                    callback(true);
                } else {
                    callback(false);
                }
            },
            err => callback(false)
        );
    }
}

export default VideoFrame;