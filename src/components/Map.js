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
                  position={{
                    lat: Number(marker.lat),
                    lng: Number(marker.lng)
                  }}
                  onClick={() => props.handleMarkerClick(marker)}
                >
                  {marker.isOpen && venueInfo.bestPhoto && (
                    <InfoWindow>
                      <React.Fragment>
                        <h3 className="infoWindowTitle">Coffeeshop Details</h3>
                        <img
                          className="bestPhoto"
                          src={`${venueInfo.bestPhoto.prefix}300x200${
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
        loadingElement={
          <div id={"loadingElement"} style={{ height: `100%` }} />
        }
        containerElement={
          <div
            id={"containerElement"}
            style={{ height: `100%`, width: `75%` }}
          />
        }
        mapElement={<div id={"mapElement"} style={{ height: `100%` }} />}
      />
    );
  }
}
