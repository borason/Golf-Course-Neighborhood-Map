import React, { Component } from "react";
import Places from "./Places";

export default class PlacesList extends Component {
  render() {
    return (
      <ul className="placesList">
        {this.props.venues &&
          this.props.venues.map((venue, index) => (
            <Places
              key={index}
              {...venue}
              handleListItemClick={this.props.handleListItemClick}
            />
          ))}
      </ul>
    );
  }
}
