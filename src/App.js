import React, { Component } from 'react';

import { connect } from 'react-redux';

import PlaceHolder from './PlaceHolder'
import icon from './icon.png'
import icon2 from './icon2.png'
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      bots: [],
      emptyList: [...Array(21).keys()].slice(1),
      loaded: false,
      errored: false
    }

    this.loadBots = this.loadBots.bind(this);
    this.filterBots = this.filterBots.bind(this);
    this.clearFilter = this.clearFilter.bind(this);

    this.loadBots();
  }

  millisToDate (millis) {
    const date = new Date(millis);

    return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
  }

  loadBots () {
    this.props.loadBots()
      .then(bots => this.setState({ ...this.state, bots, loaded: true }))
      .catch(err => this.setState({ ...this.state, errored: true }))
  }

  filterBots (event) {
    event.preventDefault();

    const filterText = event.target.value;

    this.props.filterByName(filterText)
      .then(bots => this.setState({ ...this.state, bots, filterText }))
      .catch(err => console.error(err.message))
  }

  onFocus (event) {
    event.preventDefault()

    document.getElementById('filter-field').classList.add('focused')
    document.getElementById('filter-text').focus()
  }

  onBlur (event) {
    event.preventDefault()

    document.getElementById('filter-field').classList.remove('focused')
    document.getElementById('filter-text').blur()
  }

  clearFilter (event) {
    event.preventDefault()

    const filterField = document.getElementById('filter-field')
    const filterTextElem = document.getElementById('filter-text')

    filterTextElem.value = ''

    this.props.filterByName(filterTextElem.value)
      .then(bots => {
        this.setState({ ...this.state, bots, filterText: filterTextElem.value })

        filterField.classList.remove('focused')
        filterTextElem.blur()
      })
      .catch(err => console.error(err.message))
  }

  render () {
    return (
      <div className="App">
        <header>
          List of Bots
        </header>

        <div className="filter-field" id="filter-field">
          <div className="icon filter-icon" onClick={this.onFocus}></div>
          <input onChange={this.filterBots} onFocus={this.onFocus} onBlur={this.onBlur} id="filter-text" type="text" placeholder="Filter bots..."/>
          <div className="icon clear-icon" onClick={this.clearFilter}></div>
        </div>

        <div className="table-holder">
          <table>

            <thead>

              <tr>
                <th width="75px">ID</th>
                <th width="260px">Nickname</th>
                <th width="130px">Registration</th>
                <th width="75px">Level</th>
              </tr>

            </thead>

            <tbody>
            {
              !this.state.errored
              ?
              (
                this.state.loaded
                ?
                (
                  this.state.bots.length > 0
                  ?
                  this.state.bots.map(bot =>
                    <tr key={bot.id}>
                      <td>{bot.id}</td>
                      <td className="botName">{bot.name}</td>
                      <td>{this.millisToDate(bot.reg)}</td>
                      <td>{bot.level}</td>
                    </tr>
                  )
                  :
                  <tr className="nothing-found">
                    <td colSpan="4">
                      <img src={icon} alt="nothing-found" width="40px" />
                      <div className="nothing-found-text">
                        <b>Nothing found</b>
                      </div>
                      <div className="nothing-found-info">
                        Currently available {this.props.bots.length} bots
                      </div>
                      <div className="noting-found-showall">
                        <span className="btn" onClick={this.clearFilter}>SHOW ALL</span>
                      </div>
                    </td>
                  </tr>
                )
                :
                this.state.emptyList.map(index =>
                  <tr key={index}>
                    <td><PlaceHolder></PlaceHolder></td>
                    <td><PlaceHolder></PlaceHolder></td>
                    <td><PlaceHolder></PlaceHolder></td>
                    <td><PlaceHolder></PlaceHolder></td>
                  </tr>
                )
              )
              :
              <tr className="error">
                <td colSpan="4">
                  <img src={icon2} alt="error" width="40px" />
                  <div className="error-text">
                    <b>Loading error</b>
                  </div>
                  <div className="error-info">
                    Something went wrong, try again later
                  </div>
                  <div className="error-reload">
                    <span className="btn" onClick={this.loadBots}>RELOAD</span>
                  </div>
                </td>
              </tr>
            }
            </tbody>

          </table>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  bots: state.bots,
});

const mapDispatch = ({ bots: { loadBots, filterByName }}) => ({
  loadBots: () => loadBots(),
  filterByName: filterText => filterByName(filterText)
});


export default connect(mapState, mapDispatch)(App);
