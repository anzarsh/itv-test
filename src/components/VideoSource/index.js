import React, {Component} from 'react';
import './style.css';
import VideoFrame from '../VideoFrame';
import trottle from '../trottle';
import { getNormalizedScrollLeft, setNormalizedScrollLeft } from 'normalize-scroll-left';

class VideoSource extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startTime: -5,
            endTime: 0,
            currentTime: new Date()
        }
    }
    render() {
        let videoFrames = [];
        let from = this.state.endTime;
        let to = this.state.startTime;
        let time = new Date(this.state.currentTime);

        for(let i = from; i >= to; i--, time.setMinutes(time.getMinutes() - 1)) {

            let timestamp = time.getTime()
            videoFrames.push(
                <li className="video-source__li" key={timestamp}>
                    <VideoFrame 
                        videoSourseId = {this.props.videoSourseId}
                        timestamp = {timestamp}
                    />
                </li>
            );

        }

        return (
            <ul className="video-source"
                onScroll={(evt) => this.handleScroll(evt)}
                onMouseDown={(evt) => this.handleMouseDown(evt)}
                onMouseMove={(evt) => this.handleMouseMove(evt)}
                onMouseUp={(evt) => this.handleMouseUp(evt)}
                onMouseLeave={(evt) => this.stopMouseMove(evt)}
                onDragStart={(evt) => evt.preventDefault()}
                onWheel={(evt) => this.handleWheel(evt)}
            >
                {videoFrames}
            </ul>
        );
    }
    /*
        функция может выполниться только один раз каждые пол секунды
    */
    setStateTrottle = trottle(function(options) {
        this.setState(options);
    }, 500)
    handleScroll(evt) {
        let scrollLeft = getNormalizedScrollLeft(evt.target, 'rtl')
        if (scrollLeft === 0) {
            this.stopMouseMove();
            
            this.setStateTrottle({
                startTime: this.state.startTime - 5,
            });
        } 
    }
    handleMouseDown(evt) {
        evt.preventDefault();

        let videoFrameLeft = evt.currentTarget.getBoundingClientRect().left;
        this.shiftX = evt.clientX - videoFrameLeft;
        this.startScrollLeft = getNormalizedScrollLeft(evt.currentTarget, 'rtl');
    }
    handleMouseMove(evt) {
        if(!this.shiftX) return;

        let scrollLeft = this.startScrollLeft + (this.shiftX - evt.clientX);
        
        this.scrollLeft(evt.currentTarget, scrollLeft);        
    }
    handleMouseUp(evt) {
        this.stopMouseMove();
    }
    handleWheel(evt) {
        evt.preventDefault();

        let delta = evt.deltaY > 0 ? -100 : 100;
        let scrollLeft = getNormalizedScrollLeft(evt.currentTarget, 'rtl') + delta;
        this.scrollLeft(evt.currentTarget, scrollLeft);
    }
    scrollLeft(target, left) {
        let scrollRight = target.scrollWidth - target.clientWidth;
        if(left < 0) left = 0;
        if(left > scrollRight) left = scrollRight;

        setNormalizedScrollLeft(target, left, 'rtl');
    }
    stopMouseMove() {
        delete this.shiftX;
        delete this.startScrollLeft;
    }
}

export default VideoSource;