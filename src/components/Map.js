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
    <GoogleMap
      defaultZoom={8}
      zoom={props.zoom}
      defaultCenter={{ lat: 40.7608, lng: -111.891 }}
      center={props.center}
    >
      {props.markers &&
        props.markers
          .filter(marker => marker.isVisible)
          .map((marker, index) => {
            const venueInfo = props.venues.find(
              venue => venue.id === marker.id
            );
            return (
              <Marker
                key={index}
                position={{ lat: Number(marker.lat), lng: Number(marker.lng) }}
                onClick={() => props.handleMarkerClick(marker)}
              >
                {marker.isOpen && venueInfo.bestPhoto && (
                  <InfoWindow>
                    <React.Fragment>
                      <img
                        src={`${venueInfo.bestPhoto.prefix}200x200${
                          venueInfo.bestPhoto.suffix
                        }`}
                        alt={"Venue"}
                      />
                      <div
                        className="sideBarInfo"
                        aria-label="location information"
                      >
                        <p>{venueInfo.name}</p>
                        <p>{venueInfo.location.address}</p>
                        <p>{venueInfo.location.city}</p>
                        <p>{venueInfo.contact.formattedPhone}</p>
                        <p>Rating: {venueInfo.rating} out of 10</p>
                      </div>
                    </React.Fragment>
                  </InfoWindow>
                )}
              </Marker>
            );
          })}
    </GoogleMap>
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
        containerElement={<div style={{ height: `100%`, width: `75%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}
