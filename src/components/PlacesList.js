import React, { Component } from "react";
import Places from "./Places";

export default class PlacesList extends Component {
  render() {
    return (
      <div id="listView">
        <ul className="placesList">
          {this.props.venues &&
            this.props.venues.map((venue, index) => (
              <Places
                key={index}
                {...venue}
                handleListItemClick={this.props.handleListItemClick}
              />
            ))}
          <h3>Information Provided by FourSquare</h3>
        </ul>
      </div>
    );
  }
}
