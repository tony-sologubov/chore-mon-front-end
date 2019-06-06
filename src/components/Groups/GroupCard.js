import React from 'react'
import { Link } from 'react-router-dom'

import { ComplexButton } from '../Common'

const GroupCard = ({ groupName }) => {
  return (
    <div>
      <Link to={`groups/${groupName}`}>
        <ComplexButton groupName={groupName} />
      </Link>
    </div>
  )
}

export default GroupCard
