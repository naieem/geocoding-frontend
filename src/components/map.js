import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import Config from "../config";
class map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialCenter: Config.initialCenter
        }
    }
    displayMarkers = () => {
        const { markers } = this.props;
        debugger;
        return markers.map((marker, index) => {
            return <Marker key={index} id={index} title={marker.address} position={{
                lat: marker.latitude,
                lng: marker.longitude
            }} />
        })
    }

    render() {
        const { initialCenter } = this.state;
        return (
            <Map
                google={this.props.google}
                zoom={8}
                style={style}
                initialCenter={initialCenter}
            >
                {this.displayMarkers()}
            </Map>
        );
    }
}

const style = {
    height: '500px',
    position: 'relative'
}

export default GoogleApiWrapper({
    apiKey: Config.apiKey
})(map);
