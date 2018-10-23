import React, {Component} from 'react';
import VideoSource from './VideoSource';
import './App.css';
import request from './request';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            origins: {},
            sourceLoaded: false
        };
    }
    render() {
        if(!this.state.sourceLoaded) {
            return (
                <div className="app app_load">
                    <img src="img/loader.svg"/>
                </div>
            );
        }
        let origins = this.state.origins;

        let videoSourseElems = [];
        for(let videoSourseId in origins) {
            videoSourseElems.push(
                <li className="app__list" key={videoSourseId}>
                    <VideoSource 
                        videoSourseId = {videoSourseId}
                        origin = {origins[videoSourseId]}
                    />
                </li>
            )
            break;
        }
        console.log(videoSourseElems);
        return (
            <ul className="app">{videoSourseElems}</ul>
        );
    }
    componentDidMount() {
        request.get('/asip-api/video-origins/',
            res => {
                let origins = JSON.parse(res.response);
                this.setState(
                    {
                        origins: origins,
                        sourceLoaded: true
                    }
                )
            }
        );
    }
}

export default App;