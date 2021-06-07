import React from 'react'
import './Result.sass'

import {
  Results,
  LocationWrapper,
  CurrentWeatherWrapper,
  WeatherIcon,
  Temperature,
  WeatherDetail,
  ForecastWrapper,
  Forecast,
  TemperatureWrapper,
  WeatherDetailsWrapper,
} from './Styled'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCloud,
  faBolt,
  faCloudRain,
  faCloudShowersHeavy,
  faSnowflake,
  faSun,
  faSmog,
} from '@fortawesome/free-solid-svg-icons'
import ForecastHour from '../ForecastHour'
import BigLabel from '../BigLabel'
import MediumLabel from '../MediumLabel'
import SmallLabel from '../SmallLabel'
import Text from '../Text'

const Result = ({ weather }) => {
  const {
    city,
    country,
    date,
    description,
    main,
    temp,
    sunset,
    sunrise,
    humidity,
    wind,
    highestTemp,
    lowestTemp,
    forecast,
  } = weather

  const forecasts = forecast.map((item) => (
    <ForecastHour
      key={item.dt}
      temp={Math.floor(item.main.temp * 1) / 1}
      icon={item.weather[0].icon}
      month={item.dt_txt.slice(5, 7)}
      day={item.dt_txt.slice(8, 10)}
      hour={item.dt_txt.slice(11, 13) * 1}
    />
  ))

  let weatherIcon = null

  if (main === 'Thunderstorm') {
    weatherIcon = <FontAwesomeIcon icon={faBolt} />
  } else if (main === 'Drizzle') {
    weatherIcon = <FontAwesomeIcon icon={faCloudRain} />
  } else if (main === 'Rain') {
    weatherIcon = <FontAwesomeIcon icon={faCloudShowersHeavy} />
  } else if (main === 'Snow') {
    weatherIcon = <FontAwesomeIcon icon={faSnowflake} />
  } else if (main === 'Clear') {
    weatherIcon = <FontAwesomeIcon icon={faSun} />
  } else if (main === 'Clouds') {
    weatherIcon = <FontAwesomeIcon icon={faCloud} />
  } else {
    weatherIcon = <FontAwesomeIcon icon={faSmog} />
  }

  return (
    <Results>
      <LocationWrapper>
        <BigLabel>
          {city}, {country}
        </BigLabel>
        <SmallLabel weight='400'>{date}</SmallLabel>
      </LocationWrapper>
      <CurrentWeatherWrapper>
        <WeatherIcon>{weatherIcon}</WeatherIcon>
        <TemperatureWrapper>
          <Temperature>{Math.floor(temp)}&#176;</Temperature>
          <SmallLabel weight='400' firstToUpperCase>
            {description}
          </SmallLabel>
        </TemperatureWrapper>
      </CurrentWeatherWrapper>
      <WeatherDetailsWrapper>
        <WeatherDetail>
          <SmallLabel align='center' weight='400'>
            {Math.floor(highestTemp)}&#176;
          </SmallLabel>
          <Text align='center'>Hight</Text>
        </WeatherDetail>
        <WeatherDetail>
          <SmallLabel align='center' weight='400'>
            {wind}mph
          </SmallLabel>
          <Text align='center'>Wind</Text>
        </WeatherDetail>
        <WeatherDetail>
          <SmallLabel align='center' weight='400'>
            {sunrise}
          </SmallLabel>
          <Text align='center'>Sunrise</Text>
        </WeatherDetail>
        <WeatherDetail>
          <SmallLabel align='center' weight='400'>
            {Math.floor(lowestTemp)}&#176;
          </SmallLabel>
          <Text align='center'>Low</Text>
        </WeatherDetail>
        <WeatherDetail>
          <SmallLabel align='center' weight='400'>
            {humidity}%
          </SmallLabel>
          <Text align='center'>Rain</Text>
        </WeatherDetail>
        <WeatherDetail>
          <SmallLabel align='center' weight='400'>
            {sunset}
          </SmallLabel>
          <Text align='center'>Sunset</Text>
        </WeatherDetail>
      </WeatherDetailsWrapper>
      <ForecastWrapper>
        <MediumLabel weight='400'>Forecast</MediumLabel>
        <Forecast>{forecasts}</Forecast>
      </ForecastWrapper>
    </Results>
  )
}

Result.propTypes = {
  weather: PropTypes.shape({
    city: PropTypes.string,
    country: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
    main: PropTypes.string,
    temp: PropTypes.number,
    sunrise: PropTypes.string,
    sunset: PropTypes.string,
    humidity: PropTypes.number,
    wind: PropTypes.number,
    highestTemp: PropTypes.number,
    lowestTemp: PropTypes.number,
    forecast: PropTypes.array,
  }).isRequired,
}

export default Result
