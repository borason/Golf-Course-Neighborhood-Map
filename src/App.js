import React, { Component } from "react";
import Map from "./components/Map";
import "./App.css";
import SquareAPI from "./API";
import SideBar from "./components/Sidebar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venues: [],
      markers: [],
      zoom: 12,
      updateSuperState: obj => {
        this.setState(obj);
      }
    };
  }

  handleMarkerClick = marker => {
    this.closeAllMarkers();
    marker.isOpen = true;
    this.setState({ marker: (this.state.markers, marker) });
    const venue = this.state.venues.find(venue => venue.id === marker.id);
    SquareAPI.getVenueDetails(marker.id).then(res => {
      const newVenue = Object.assign(venue, res.response.venue);
      this.setState({ venues: Object.assign(this.state.venues, newVenue) });
    });
  };

  handleListItemClick = venue => {
    const marker = this.state.markers.find(marker => marker.id === venue.id);
    this.handleMarkerClick(marker);
    console.log(venue);
  };

  closeAllMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    });
    this.setState({ markers: Object.assign(this.state.markers, markers) });
  };

  componentDidMount() {
    SquareAPI.search({
      near: "Salt Lake City, UT",
      query: "coffee",
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

  render() {
    return (
      <div className="App" role="main">
        <SideBar
          {...this.state}
          handleListItemClick={this.handleListItemClick}
        />

        <Map
          aria-label="Map"
          {...this.state}
          handleMarkerClick={this.handleMarkerClick}
        />
      </div>
    );
  }
}

export default App;
