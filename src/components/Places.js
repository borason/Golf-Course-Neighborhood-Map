import React, { Component } from "react";

export default class Places extends Component {
  render() {
    return (
      <li
        className="listItem"
        onClick={() => this.props.handleListItemClick(this.props)}
      >
        <img
          src={
            this.props.categories[0].icon.prefix +
            32 +
            this.props.categories[0].icon.suffix
          }
          alt={this.props.categories[0].name}
        />
        <p className="placeName">{this.props.name}</p>
      </li>
    );
  }
}
