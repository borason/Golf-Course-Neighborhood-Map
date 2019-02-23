/* global google*/
import React, { Component } from "react";
import Map from "./components/Map";
import "./App.css";
import API from "./API/API";
import SideBar from "./components/Sidebar";
import { slide as Menu } from "react-burger-menu";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venues: [],
      markers: [],
      zoom: 10,
      defaultCenter: { lat: 40.7629, lng: -111.8968 },
      updateSuperState: obj => {
        this.setState(obj);
      }
    };
  }

  componentDidMount() {
    API.search({
      near: "84101",
      categoryId: "4bf58dd8d48988d178941735",
      limit: 10
    }).then(results => {
      const { venues } = results.response;
      const { center } = results.response.geocode.feature.geometry;
      const markers = results.response.venues.map(venue => {
        return {
          lat: parseFloat(venue.location.lat),
          lng: parseFloat(venue.location.lng),
          isOpen: false,
          isVisible: true,
          id: venue.id
        };
      });
      this.setState({
        venues,
        center,
        markers
      });
      console.log(results);
    });
  }

  handleWindowClose = () => {
    this.setState({
      // zoom: 13,
      center: { lat: 40.7629, lng: -111.8968 }
    });
  };

  handleMarkerClick = marker => {
    this.closeAllMarkers();
    marker.isOpen = true;
    google.maps.Animation = "bounce";
    this.setState({ marker: (this.state.markers, marker) });
    const venue = this.state.venues.find(venue => venue.id === marker.id);
    API.getVenueDetails(marker.id).then(res => {
      const newVenue = Object.assign(venue, res.response.venue);
      this.setState({
        venues: Object.assign(this.state.venues, newVenue)
        // zoom: 10
      });
    });
  };

  handleListItemClick = venue => {
    const marker = this.state.markers.find(marker => marker.id === venue.id);
    this.handleMarkerClick(marker);
    console.log(venue);
    this.setState({ zoom: 12 });
  };

  closeAllMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    });
    this.setState({
      markers: Object.assign(this.state.markers, markers)
    });
  };

  render() {
    return (
      <div className="App" role="main">
        <Menu noOverlay width={"150"} isOpen={true}>
          <SideBar
            {...this.state}
            handleListItemClick={this.handleListItemClick}
          />
        </Menu>
        <Map
          aria-label="Map"
          {...this.state}
          handleMarkerClick={this.handleMarkerClick}
          handleWindowClose={this.handleWindowClose}
          phone={this.venuePhone}
        />
      </div>
    );
  }
}

export default App;
