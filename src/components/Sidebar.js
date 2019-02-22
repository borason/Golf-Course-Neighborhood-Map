import React, { Component } from "react";
import PlacesList from "./PlacesList";

export default class SideBar extends Component {
  constructor() {
    super();
    this.state = {
      query: ""
    };
  }

  handleFilterVenues = () => {
    if (this.state.query.trim() !== "") {
      const venues = this.props.venues.filter(venue =>
        venue.name.toLowerCase().includes(this.state.query.toLocaleLowerCase())
      );
      return venues;
    }
    return this.props.venues;
  };

  handleChange = e => {
    this.setState({ query: e.target.value });
    const markers = this.props.venues.map(venue => {
      const isMatched = venue.name
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
      const marker = this.props.markers.find(marker => marker.id === venue.id);
      if (isMatched) {
        marker.isVisible = true;
      } else {
        marker.isVisible = false;
      }
      return marker;
    });
    this.props.updateSuperState({ markers });
  };
  render() {
    return (
      <div className="sideBar">
        <input
          type={"search"}
          id={"search"}
          placeholder={"Filter Venues"}
          onChange={this.handleChange}
        />
        <PlacesList
          {...this.props}
          venues={this.handleFilterVenues()}
          handleListItemClick={this.props.handleListItemClick}
        />
      </div>
    );
  }
}
