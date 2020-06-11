import React, { Component } from 'react';

import './PlaceHolder.css';

export default class PlaceHolder extends Component {

  getElemStyle () {
    return {
      width: `${Math.random() * (90 - 10) + 10}%`
    }
  }

  render () {
    return (
      <div className="place-holder" style={this.getElemStyle()}>
      </div>
    )
  }

}
