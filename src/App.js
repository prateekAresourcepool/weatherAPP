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
      rooms: [
        { room_type: "Queen", vacant_rooms: 5, price: 100 },
        { room_type: "Double", vacant_rooms: 3, price: 75 },
        { room_type: "Twin", vacant_rooms: 8, price: 60 },
      ],
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

  answer1 = (rooms) => {
    return (
      <ol>
        {rooms.map((item, index) => {
          return (
            <li>
              {item.room_type},{item.vacant_rooms}, ${item.price}{" "}
            </li>
          );
        })}
      </ol>
    );
  };

  answer2 = (num) => {
    if (num % 2 == 0 && num % 7 == 0) {
      console.log("foobar");
      return "foobar";
    } else if (num % 7 == 0) {
      console.log("bar");
      return "bar";
    } else if (num % 2 == 0) {
      console.log("foo");
      return "foo";
    } else {
      console.log(num);
      return num;
    }
  };

  answer4 = (province) => {
    const ONTARIO_RATE = 100,
      QUEBEC_RATE = 200,
      ALBERTA_RATE = 300;
    let rate = 0,
      points = 0,
      amt = 0,
      base = 10,
      calc = 0;
    const basis = (amt) => {
      return amt;
    };
    const extra = (amt) => {
      return amt;
    };
    switch (province) {
      case "ONTARIO":
        rate = ONTARIO_RATE;
        break;
      case "QUEBEC":
        rate = QUEBEC_RATE;
        points = 2;
        break;
      case "ALBERTA":
        rate = ALBERTA_RATE;
        break;
      default:
        rate = 1;
    }
    amt = base * rate;
    calc = 2 * basis(amt) + extra(amt) * 1.05;
  };

  render() {
    return (
      <div>        
        <div>
        <h3>Ans-5.</h3>
        <p>APIs have CORS issue, so please disable cors in chrome...</p>
        <p>Type san or lon in the textbox and click on search, this will get the data with search param from API and list it in below the textbox.. from where you can select one of them to get the whole weather report</p>
        <div className="main-container">
          <input
            type="text"
            value={this.state.city}
            onChange={(e) => this.setState({ city: e.target.value })}
            className="search-input"
            placeholder="Search here..."
          />
          <button onClick={this.search}>Search</button>
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
          </div>         
        {!this.state.isLoading &&
          this.state.cities.length <= 0 &&
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
        <div>
          <h3>Ans-1.</h3>
          {this.answer1(this.state.rooms)}
          <h3>Ans-2.</h3>
          <p>When Number is 2 - Output:{this.answer2(2)}</p>
          <p>When Number is 7 - Output:{this.answer2(7)}</p>
          <p>When Number is 14 - Output:{this.answer2(14)}</p>
          <p>When Number is 5 - Output:{this.answer2(5)}</p>
          <h3>Ans-3.</h3>
          <p>
            For Ans 3, please run answer3.js file from the same directory.
            <br />
            Run command:node answer3 from src folder
          </p>
          <h3>Ans-4.</h3>
          <p>See fucntion answer4() in code</p>
          {this.answer4("ONTARIO")}
        </div>
      </div>
    );
  }
}
