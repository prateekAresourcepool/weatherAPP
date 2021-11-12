import "./App.css";
import React, { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      cities: [],
      weatherData: {},
      isLoading: false,
    };
  }

  search = () => {
    this.setState({ cities: [] });
    fetch(
      `https://www.metaweather.com/api/location/search/?query=${this.state.city}`
    )
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({ cities: responseJson });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getWeather = (item) => {
    this.setState({ isLoading: true, cities: [] });
    fetch(`https://www.metaweather.com/api/location/${item.woeid}`)
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({ weatherData: responseJson, isLoading: false });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <div>
          <input
            type="text"
            value={this.state.city}
            onChange={(e) => this.setState({ city: e.target.value })}
            className="search-input"
            placeholder="Search here..."
          />
          <button onClick={this.search}>Search</button>
        </div>
        {this.state.cities.length > 0 && (
          <div className="suggestion-list">
            {this.state.cities.map((item, index) => {
              return (
                <div
                  key={index}
                  className="row"
                  onClick={() => this.getWeather(item)}
                >
                  <p>{item.title}</p>
                </div>
              );
            })}
            {this.state.isLoading && <h3>Loading data...</h3>}
          </div>
        )}
        {!this.state.isLoading &&
          this.state.cities.length <=0 && 
          this.state.weatherData.consolidated_weather &&
          this.state.weatherData.consolidated_weather.length > 0 && (
            <div className="report-section">
              <table border="1">
                <tr>
                  <th>applicable_date</th>
                  <th>weather_state_name</th>
                  <th>air_pressure</th>
                  <th>humidity</th>
                  <th>max_temp</th>
                  <th>min_temp</th>
                  <th>predictability</th>
                  <th>the_temp</th>
                  <th>visibility</th>
                  <th>wind_direction</th>
                  <th>wind_speed</th>
                </tr>
                {this.state.weatherData.consolidated_weather.map(
                  (item, index) => {
                    return (
                      <tr key={index}>
                        <th>{item.applicable_date}</th>
                        <th>{item.weather_state_name}</th>
                        <th>{item.air_pressure}</th>
                        <th>{item.humidity}</th>
                        <th>{item.max_temp}</th>
                        <th>{item.min_temp}</th>
                        <th>{item.predictability}</th>
                        <th>{item.the_temp}</th>
                        <th>{item.visibility}</th>
                        <th>{item.wind_direction}</th>
                        <th>{item.wind_speed}</th>
                      </tr>
                    );
                  }
                )}
              </table>
            </div>
          )}
        {this.state.isLoading && (
          <div>
            <h2>Loading Data...</h2>
          </div>
        )}
      </div>
    );
  }
}
