import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFrown } from '@fortawesome/free-solid-svg-icons'
import { NotFoundWrapper, NotfoundIcon, NotFoundText } from './Styled'

const NotFound = () => {
  return (
    <NotFoundWrapper>
      <NotfoundIcon>
        <FontAwesomeIcon icon={faFrown} />
      </NotfoundIcon>
      <NotFoundText>Sorry, the specified city was not found..</NotFoundText>
    </NotFoundWrapper>
  )
}

export default NotFound
