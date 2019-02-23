/* global google*/
import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <div id="map-canvas">
      <GoogleMap defaultZoom={20} zoom={props.zoom} center={props.center}>
        {props.markers &&
          props.markers
            .filter(marker => marker.isVisible)
            .map((marker, index, arr) => {
              const venueInfo = props.venues.find(
                venue => venue.id === marker.id
              );
              return (
                <Marker
                  key={index}
                  position={{
                    lat: Number(marker.lat),
                    lng: Number(marker.lng)
                  }}
                  onClick={() => props.handleMarkerClick(marker)}
                  animation={
                    arr.length === 1
                      ? google.maps.Animation.BOUNCE
                      : google.maps.Animation.DROP
                  }
                >
                  {marker.isOpen && venueInfo.bestPhoto && (
                    <InfoWindow onCloseClick={() => props.handleWindowClose()}>
                      <React.Fragment>
                        <h3 className="infoWindowTitle">Dentist Office</h3>
                        <h4 className="infoWindowFS">Powered By FourSquare</h4>
                        <img
                          className="bestPhoto"
                          src={`${venueInfo.bestPhoto.prefix}250x200${
                            venueInfo.bestPhoto.suffix
                          }`}
                          alt={"Venue"}
                        />
                        <div
                          className="sideBarInfo"
                          aria-label="location information"
                        >
                          <p className="venueName">{venueInfo.name}</p>
                          <span className="venueInfo">
                            <p>{venueInfo.location.address}</p>
                            <p>{venueInfo.location.city}</p>
                            <p>{venueInfo.contact.formattedPhone}</p>
                            <p>Rating: {venueInfo.rating} out of 10</p>
                          </span>
                        </div>
                      </React.Fragment>
                    </InfoWindow>
                  )}
                </Marker>
              );
            })}
      </GoogleMap>
    </div>
  ))
);

export default class Map extends React.Component {
  render() {
    return (
      <MyMapComponent
        {...this.props}
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAAK2RtwOt45mXjQvGA3iC8dXJjUCHnyAY"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={
          <div style={{ height: ` 900px`, width: `100%`, float: "right" }} />
        }
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}
