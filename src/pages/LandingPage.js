import React from 'react'
import { AppTitle, WeatherWrapper } from './styled'
import SearchCity from '../componets/SearchCity.js/SearchCity'
import Result from '../componets/Result/Result'
import NotFound from '../componets/NotFound/NotFound'
import Container from '@material-ui/core/Container'
import isEmpty from '../util/isEmpty'

class App extends React.Component {
  state = {
    value: '',
    locVal: null,
    weatherInfo: null,
    error: false,
  }

  handleInputChange = (e) => {
    this.setState({
      value: e.target.value,
    })
  }

  setLoction = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          locVal: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        })
        this.getLocation()
      })
    } else {
      alert('Geolocation is not supported by this browser.')
    }
  }

  getLocation = () => {
    const { locVal } = this.state
    const APIkey = process.env.REACT_APP_API_KEY
    let weather
    let forecast
    if (!isEmpty(locVal)) {
      weather = `https://api.openweathermap.org/data/2.5/weather?lat=${locVal.lat}&lon=${locVal.lng}&appid=${APIkey}`
      forecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${locVal.lat}&lon=${locVal.lng}&appid=${APIkey}`
    }

    Promise.all([fetch(weather), fetch(forecast)])
      .then(([res1, res2]) => {
        if (res1.ok && res2.ok) {
          return Promise.all([res1.json(), res2.json()])
        }
        throw Error(res1.statusText, res2.statusText)
      })
      .then(([data1, data2]) => {
        const months = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'Nocvember',
          'December',
        ]
        const days = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ]
        const currentDate = new Date()
        const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
          months[currentDate.getMonth()]
        }`
        const sunset = new Date(data1.sys.sunset * 1000)
          .toLocaleTimeString()
          .slice(0, 5)
        const sunrise = new Date(data1.sys.sunrise * 1000)
          .toLocaleTimeString()
          .slice(0, 5)

        const weatherInfo = {
          city: data1.name,
          country: data1.sys.country,
          date,
          description: data1.weather[0].description,
          main: data1.weather[0].main,
          temp: data1.main.temp,
          highestTemp: data1.main.temp_max,
          lowestTemp: data1.main.temp_min,
          sunrise,
          sunset,
          clouds: data1.clouds.all,
          humidity: data1.main.humidity,
          wind: data1.wind.speed,
          forecast: data2.list,
        }
        this.setState({
          weatherInfo,
          error: false,
        })
      })
      .catch((error) => {
        console.log(error)

        this.setState({
          error: true,
          weatherInfo: null,
        })
      })
  }

  handleSearchCity = (e) => {
    e.preventDefault()
    const { value } = this.state
    const APIkey = process.env.REACT_APP_API_KEY

    console.log(value)

    const weather = `https://api.openweathermap.org/data/2.5/weather?q=${value}&APPID=${APIkey}&units=metric`
    const forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${value}&APPID=${APIkey}&units=metric`

    Promise.all([fetch(weather), fetch(forecast)])
      .then(([res1, res2]) => {
        if (res1.ok && res2.ok) {
          return Promise.all([res1.json(), res2.json()])
        }
        throw Error(res1.statusText, res2.statusText)
      })
      .then(([data1, data2]) => {
        const months = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'Nocvember',
          'December',
        ]
        const days = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ]
        const currentDate = new Date()
        const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
          months[currentDate.getMonth()]
        }`
        const sunset = new Date(data1.sys.sunset * 1000)
          .toLocaleTimeString()
          .slice(0, 5)
        const sunrise = new Date(data1.sys.sunrise * 1000)
          .toLocaleTimeString()
          .slice(0, 5)

        const weatherInfo = {
          city: data1.name,
          country: data1.sys.country,
          date,
          description: data1.weather[0].description,
          main: data1.weather[0].main,
          temp: data1.main.temp,
          highestTemp: data1.main.temp_max,
          lowestTemp: data1.main.temp_min,
          sunrise,
          sunset,
          clouds: data1.clouds.all,
          humidity: data1.main.humidity,
          wind: data1.wind.speed,
          forecast: data2.list,
        }
        this.setState({
          weatherInfo,
          error: false,
        })
      })
      .catch((error) => {
        console.log(error)

        this.setState({
          error: true,
          weatherInfo: null,
        })
      })
  }

  render() {
    const { value, weatherInfo, error } = this.state
    return (
      <>
        <Container maxWidth='md'>
          <AppTitle showLabel={(weatherInfo || error) && true}>
            Weather app
          </AppTitle>
          <WeatherWrapper>
            <AppTitle secondary showResult={(weatherInfo || error) && true}>
              Weather app
            </AppTitle>
            <SearchCity
              value={value}
              showResult={(weatherInfo || error) && true}
              change={this.handleInputChange}
              submit={this.handleSearchCity}
              click={this.setLoction}
            />
            {weatherInfo && <Result weather={weatherInfo} />}
            {error && <NotFound error={error} />}
          </WeatherWrapper>
        </Container>
      </>
    )
  }
}
export default App
