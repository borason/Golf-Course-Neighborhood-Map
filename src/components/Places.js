import React, { Component } from "react";

export default class Places extends Component {
  render() {
    return (
      <li
        className="places"
        onClick={() => this.props.handleSidebarItemClick(this.props)}
      >
        <div className="initial">{this.props.name.charAt(0)}</div>
        <p className="placeName">{this.props.name}</p>
      </li>
    );
  }
}
