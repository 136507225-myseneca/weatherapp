import React from 'react'
import {
  SearchInput,
  SearchBar,
  SearchIcon,
  LocationIcon,
  LocationButton,
} from './Styled'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const SearchCity = ({ submit, value, change, showResult, click }) => {
  return (
    <>
      <SearchBar showResult={showResult} onSubmit={submit}>
        <SearchInput
          type='text'
          value={value}
          placeholder='Enter city'
          onChange={change}
        />
        <SearchIcon>
          <FontAwesomeIcon icon={faSearch} />
        </SearchIcon>
        <LocationButton onClick={click}>
          <LocationIcon />
        </LocationButton>
      </SearchBar>
    </>
  )
}

SearchCity.propTypes = {
  submit: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  click: PropTypes.func.isRequired,
  showResult: PropTypes.bool.isRequired,
}

export default SearchCity
