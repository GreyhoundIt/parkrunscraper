import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import ParkrunButton from './components/ParkrunButton';
import Results from './components/Results';
class App extends Component {
  state = {
    html: null,
    titlesArray: null,
    tablesArray: null,
    output: null,
    loading: false
  };

  getData = () => {
    this.setState({loading: true})
    fetch(
      "https://cors-anywhere.herokuapp.com/http://www.parkrun.com/results/consolidatedclub/?clubNum=2117"
    )
    .then(res => res.text())
    .then(async res =>
      this.setState({
        html: res
      })
    )
    .then(this.getAllH2s)
    .then(this.getAllTables)
  };

  getAllH2s = () => {
    const htmlData = document.getElementById("html-data");
    const h2s = htmlData.querySelectorAll("h2");
    const titlesArray = Array.from(h2s).map(title => title.textContent);
    this.setState({
      titlesArray
    })
  };

  getAllTables = () => {
    const htmlData = document.getElementById("html-data");
    const tables = htmlData.querySelectorAll("table");
    let tablesArray = Array.from(tables)
    .map((parkrun) => (  parkrun.outerHTML )
    )
    this.setState({
      html: "",
      tablesArray,
      loading: false
    })
  }


  componentDidMount = () => {
    this.getData()
  }

  render() {
    const { html, titlesArray, tablesArray } = this.state;
    return (
      <div className="App">
        <h1> CROOK AC </h1>
        {html && (
          <div id="html-data" dangerouslySetInnerHTML={{ __html: html }} />
        )}
        {titlesArray && tablesArray && titlesArray.map((title, i) => {
          return (
            <Fragment>
              <h3>{title}</h3>
              <div className="table-container" dangerouslySetInnerHTML={{ __html: tablesArray[i] }}></div>
            </Fragment>
          )
        })}
      </div>
    );
  }
}

export default App;